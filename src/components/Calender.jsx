import React, { useEffect, useState } from 'react';
import '../styles/calender.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from 'react-bootstrap/Modal';
import Topbar from '../components/topbar';
import { useDispatch, useSelector } from 'react-redux';
import { getScheduledPosts } from '../apis/post';
import { monthNames } from '../utills/chart/constant';
import { useSearchParams } from 'react-router-dom';
import { getPostDayAndTime } from '../utills/date-time-format';

function Calender() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const selected_post = getPostDayAndTime(searchParams.get('date'), "YYYY-MM-DD HH:mm:ss");
  const [postPerDay, setPostPerDay] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { scheduledPosts } = useSelector((state) => state.posts);

  const [filter, setFilter] = useState({ month: selected_post.month ? selected_post.month : getPostDayAndTime(new Date()).month, year: selected_post.year ? selected_post.year : getPostDayAndTime(new Date()).year });

  useEffect(() => {
    dispatch(getScheduledPosts(filter));
  }, []);

  if (!scheduledPosts?.success || isLoading) {
    return (
      <>
        <Topbar />
        <div class="spinner-border m-5" role="status">
        </div>
      </>
    )
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const rowDataAM = Array.from({ length: 12 }, (_, index) => ({ [`row${index + 1}`]: [] })).reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const rowDataPM = Array.from({ length: 12 }, (_, index) => ({ [`row${index + 1}`]: [] })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const organizePostsByRow = () => {
    scheduledPosts?.data.forEach(item => {
      const { hour, meridian } = getPostDayAndTime(item.scheduled_at, "YYYY-MM-DD HH:mm:ss");
      const timeIndex = hour % 12 || 12;
      const rowKey = `row${timeIndex}`;
      if (meridian === 'AM') {
        rowDataAM[rowKey]?.push(item);
      } else {
        rowDataPM[rowKey]?.push(item);
      }
    });
  };

  const handlePostView = (posts) => {
    const postOfDay = scheduledPosts?.data.filter((item) => posts.includes(item.id));
    setPostPerDay(postOfDay);
  };

  const createPost = (item, count, posts) => {
    const { formattedTime } = getPostDayAndTime(item.scheduled_at, "YYYY-MM-DD HH:mm:ss")
    return <div className='post_cell position-relative overflow-hidden' key={item.scheduled_at}
      id={formattedTime == selected_post?.formattedTime ? "active-post" : ""}
    >
      <p className='m-0 fs-14 text-white'>{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</p>
      <div className='position-relative w-100 h-100'>
        <img src={item?.media[0]?.media_url} alt='' className='w-100' />
      </div>
      <p className='m-0 fs-14 text-white d-flex justify-content-between align-items-center'>
        <span>{formattedTime}</span>
        <div onClick={() => handlePostView(posts.map(({ id }) => id))} className='pointer d-flex justify-content-center align-items-center post-perday position-absolute start-0 end-0 bottom-0 py-2'>
          <span>{count > 1 ? "View posts" : "view post"}</span>
          <RemoveRedEyeIcon className='ms-2 fs-5' />
        </div>
      </p>
    </div>
  }

  const createEmptyCell = () => (
    Array.from({ length: 7 }).map((_, index) => <td key={index} className='text-center box-cell'></td>)
  );

  const createBox = (data) => (
    weekdays.map((day, dayIndex) => {
      const dayPosts = data.filter(item => getPostDayAndTime(item.scheduled_at, "YYYY-MM-DD HH:mm:ss").day === day);

      return (
        <td key={dayIndex} className='text-center box-cell'>
          {dayPosts.length > 0 && createPost(dayPosts[0], dayPosts.length, dayPosts)}
        </td>
      );
    })
  );

  const createTimeLine = (rowData, meridian) => (
    Array.from({ length: 12 }).map((_, index) => (
      <tr key={index}>
        <td className='text-center'>{`${index + 1}:00 ${meridian}`}</td>
        {rowData[`row${index + 1}`]?.length ? createBox(rowData[`row${index + 1}`]) : createEmptyCell()}
      </tr>
    ))
  );

  const generateYears = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ value: year });
    }
    return years;
  };

  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  organizePostsByRow();

  const handleFilter = () => {
    setLoading(true)
    dispatch(getScheduledPosts(filter));
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  if (!isNaN(selected_post?.year)) {
    setTimeout(() => {
      document.getElementById("active-post")?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }

  return (
    <>
      <Topbar />
      <div className="calender">
        <div className='d-flex justify-content-between align-items-center py-3 px-5 calender-header'>
          <h2>Scheduled Posts <span className='fs-12'>(Total Posts {scheduledPosts.data.length})</span></h2>
          <div className='d-flex gap-3 align-items-center'>
            <select name="month" onChange={handleChange}>
              <option value="" selected>{monthNames[filter.month - 1].name}</option>
              {monthNames.map((month) => (
                <option key={month.value} value={month.value}>{month.name}</option>
              ))}
            </select>
            <select name="year" onChange={handleChange}>
              <option value="" selected>{filter.year}</option>
              {generateYears(2020, 2040).map((year) => (
                <option key={year.value} value={year.value}>{year.value}</option>
              ))}
            </select>
            <button className='btn btn-primary' onClick={handleFilter}>Search</button>
          </div>
        </div>
        {scheduledPosts?.data.length ? <div className='calendar-table'>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className='text-center'>{monthNames[filter.month - 1].name}</th>
                {weekdays.map((day, index) => (
                  <th key={index} scope="col" className='text-center'>
                    <span>{day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {createTimeLine(rowDataAM, 'AM')}
              {createTimeLine(rowDataPM, 'PM')}
            </tbody>
          </table>
        </div> : null}
        <Modal
          show={postPerDay.length > 0}
          onHide={() => setPostPerDay([])}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Posts of the day
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row post-row'>
              {postPerDay.map((item) => (
                <div key={item.scheduled_at} className={postPerDay.length === 1 ? 'col-md-12 overflow-hidden p-2' : 'col-md-4 py-1 px-2'}>
                  <div className='post_cell position-relative overflow-hidden'>
                    <p className='m-0 fs-14 text-white'>{item.title}</p>
                    <div className='position-relative w-100 h-100'>
                      <img src={item.image} alt='' className='w-100' />
                    </div>
                    <p className='m-0 fs-14 text-white d-flex justify-content-between align-items-center'>
                      <span>{getPostDayAndTime(item.scheduled_at, "YYYY-MM-DD HH:mm:ss").formattedTime}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {!scheduledPosts?.data.length ? <div className='not-found fs-4 text-center'>No record found</div> : null}
    </>
  );
}

export default Calender;
