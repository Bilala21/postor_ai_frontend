import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Topbar from "../components/topbar";
import Chart from "react-apexcharts";
import chatbot from "../assets/images/chatbot.png";
import upgrade from "../assets/images/upgrade.png";
import robot from "../assets/images/robot.png";
import { Link } from "react-router-dom";
import { getPosts, getTopRatedPosts } from "../apis/post";
import { useDispatch, useSelector } from "react-redux";
import { chartSettings } from "../utills/chart/chartSetting";
import {
  faildPost,
  scheduledPost,
  successfulPost,
  uploadPost,
} from "../utills/chart/constant";
import {
  getFaildPost,
  getPostPerWeek,
  getScheduledPosts,
  getSuccessFullPost,
} from "../utills/getPostPerWeek";
import DonutChart from "../components/chart/donutChart";
import moment from "moment";
import { getPostDayAndTime } from "../utills/date-time-format";
import { AiOutlineLike } from "react-icons/ai";
import { FaFacebook, FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import btnCap from "../assets/icons/capBtn.png";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, topRatedPosts } = useSelector((state) => state.posts);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [chart, setChart] = useState({
    uploadPosts: chartSettings(uploadPost),
    scheduledPosts: chartSettings(scheduledPost),
    successfulPosts: chartSettings(successfulPost),
    faildPosts: chartSettings(faildPost),
  });

  useEffect(() => {
    dispatch(getPosts({ month: getPostDayAndTime(new Date()).month }));
    dispatch(getTopRatedPosts());
  }, [dispatch]);

  useEffect(() => {
    let postData = {
      uploads: [0, 0, 0, 0],
      scheduled: [0, 0, 0, 0],
      success: [0, 0, 0, 0],
      faild: [0, 0, 0, 0],
    };

    posts.forEach((post) => {
      getPostPerWeek(postData, "uploads", post.createdAt);
      getScheduledPosts(postData, "scheduled", post.scheduled_at);
      getSuccessFullPost(postData, "success", post.createdAt, post.status);
      getFaildPost(postData, "faild", post.updatedAt, post.status);
      if (post.scheduled_at !== null && selectedPosts.length < 4) {
        setSelectedPosts((prev) => [...prev, post]);
      }
    });

    setChart((prev) => ({
      ...prev,
      uploadPosts: {
        ...prev.uploadPosts,
        series: [{ data: postData.uploads }],
      },
      scheduledPosts: {
        ...prev.scheduledPosts,
        series: [{ data: postData.scheduled }],
      },
      successfulPosts: {
        ...prev.successfulPosts,
        series: [{ data: postData.success }],
      },
      faildPosts: {
        ...prev.faildPosts,
        series: [{ data: postData.faild }],
      },
    }));
    if (!posts.length) {
      setSelectedPosts([]);
    }
  }, [posts]);

  return (
    <>
      <div className="p-4">
        <Topbar />

        <div className="mt-5">
          <Row>
            <Col
              md={9}
              className="d-flex align-items-center justify-content-between mb-2"
            >
              <p className="home_title">Analytics</p>
              <div className="px-2 month-filter d-flex align-items-center justify-content-center">
                <select
                  name="month"
                  id=""
                  className="bg-transparent border-0 w-100"
                  onChange={(e) =>
                    dispatch(getPosts({ month: e.target.value }))
                  }
                >
                  {moment.monthsShort().map((month, index) => (
                    <option
                      value={index + 1}
                      selected={
                        getPostDayAndTime(new Date()).month == index + 1
                      }
                    >
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </Col>

            <Col md={9}>
              <Row>
                <Col md={3} sm={6} xs={12}>
                  <Card className="w-100 border-0 shadow mb-4">
                    <div className="bar-chart w-100">
                      <Chart
                        options={chart.uploadPosts.options}
                        series={chart.uploadPosts.series}
                        type="bar"
                        height={150}
                      />
                    </div>
                    <p className="text-center fs-6 fw-bold">Total Uploads</p>
                  </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Card className="w-100 border-0 shadow mb-4">
                    <div className="bar-chart w-100">
                      <Chart
                        options={chart.scheduledPosts.options}
                        series={chart.scheduledPosts.series}
                        type="bar"
                        height={150}
                      />
                    </div>
                    <p className="text-center fs-6 fw-bold">
                      Scheduled Uploads
                    </p>
                  </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Card className="w-100 border-0 shadow mb-4">
                    <div className="bar-chart w-100">
                      <Chart
                        options={chart.successfulPosts.options}
                        series={chart.successfulPosts.series}
                        type="bar"
                        height={150}
                      />
                    </div>
                    <p className="text-center fs-6 fw-bold">
                      Successful Uploads
                    </p>
                  </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Card className="w-100 border-0 shadow mb-4">
                    <div className="bar-chart w-100">
                      <Chart
                        options={chart.faildPosts.options}
                        series={chart.faildPosts.series}
                        type="bar"
                        height={150}
                      />
                    </div>
                    <p className="text-center fs-6 fw-bold">
                      Unsuccessful Uploads
                    </p>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={7}>
                  <Card className="shadow border-0 h-100 p-2">
                    <CardHeader className="border-0 bg-white">
                      <CardTitle className="fs-5 fw-bold">
                        Create post content
                        <img
                          src={btnCap}
                          alt=""
                          className="cap_icon"
                          style={{ marginLeft: 10 }}
                        />
                      </CardTitle>
                      <div className="ai-form">
                        <form>
                          <textarea
                            style={{
                              borderRadius: "10px",
                              resize: "vertical",
                              overflow: "auto",
                            }}
                            placeholder="Let AI craft the perfect words for you"
                            className="w-100 p-3 rounded-[10px] border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            rows="3"
                          ></textarea>{" "}
                        </form>
                      </div>
                    </CardHeader>
                    <CardBody className="d-flex justify-content-center mt-2">
                      <Link to={"/compose"}>
                        <Button className="post_create_btn">Generate</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="shadow border-0 p-1">
                    <div className="p-3 d-flex flex-wrap justify-content-center">
                      <CardTitle className="fs-5 fw-bold w-100 mb-4">
                        Audience
                      </CardTitle>
                      <DonutChart />
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={9}>
                  <Card className="border-0 shadow p-3">
                    <div className="d-flex justify-content-between mb-4 fs-20 fw-semibold">
                      <p className="m-0">Recent Content</p>
                      <p className="m-0">Rating</p>
                    </div>
                    <Row className="gap-3">
                      {topRatedPosts.map((post) => (
                        <div className="d-flex gap-4">
                          <div>
                            <img
                              src={post.media_url}
                              alt=""
                              style={{
                                minWidth: "90px",
                                width: "90px",
                                borderRadius: "8px",
                              }}
                              height={70}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between w-100 text-black-500">
                            <Col md={9}>
                              <p className="details_desc fs-12 text-dark">
                                {post.title}
                              </p>
                              <div className="d-flex align-items-center gap-4">
                                <FaFacebook
                                  className="text-primary"
                                  size={20}
                                />
                                <span className="d-flex align-items-center gap-1">
                                  <AiOutlineLike size={20} color="#161616" />
                                  <span className="text-black-500">
                                    {post.like_count}
                                  </span>
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                  <FaRegComment size={20} color="#161616" />
                                  <span className="text-black-500">
                                    {post.comments_count}
                                  </span>
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                  <PiShareFatLight size={22} color="#161616" />
                                  <span className="text-black-500">
                                    {post.share_count}
                                  </span>
                                </span>
                              </div>
                            </Col>
                            <div className="text-end fs-20 text-teal-500">
                              +{post.rating_percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <Card className="shadow border-0 bg-white p-3">
                <p className="fs-4 fw-semibold mb-2">Schedule</p>
                <Row className="row-gap-3">
                  {selectedPosts.slice(0, 4).map((post) => {
                    return (
                      <Col md={6} className="px-2">
                        <Link
                          to={`/schedule/?date=${post.scheduled_at}`}
                          className="recent-post post p-2 text-decoration-none d-block text-black-500"
                        >
                          <p className="m-0 fs-13">{post.title.slice(0, 15)}</p>
                          <img
                            src="https://posteraibucket.s3.amazonaws.com/1/1719856551999-Screenshot%20%2850%29.png"
                            alt="image-01"
                            className="my-2 mx-auto w-100"
                          />
                          <p className="m-0 fs-13">
                            {getPostDayAndTime(post.scheduled_at).formattedTime}
                          </p>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Card>
              <Card className="shadow border-0 bg-white px-3 py-4 mt-3 upgrade-to-pro">
                <img
                  src={upgrade}
                  alt="image-pro"
                  width={142}
                  className="mx-auto"
                />
                <div className="text-center text-dark-500">
                  <h5 className="fw-semibold fs-20 mt-3">Upgrade To Pro</h5>
                  <p className="mx-auto fs-14 mt-2 mb-0">
                    Upgrade to premium to get full access to all features
                  </p>
                </div>
              </Card>
              <Card className="shadow border-0 ps-3 py-2 mt-3 need-help-card flex-row">
                <img src={robot} alt="imag-help" width={80} height={80} />
                <div className="ps-2">
                  <p className="m-0 fs-20 fw-semibold text-white">
                    NEED HELP ?
                  </p>
                  <p className="m-0 fs-12 text-white pe-5 pt-2">
                    Feel free to get help form our customer care
                  </p>
                </div>
              </Card>
              <Card className="shadow border-0 p-2 bg-white px-3 py-4 mt-3 ">
                <img src={chatbot} alt="" className="m-auto" />
                <div className="text-center text-dark-500">
                  <h5 className="fw-semibold fs-20 mt-3">AI Chatbot</h5>
                  <p className="mx-auto fs-14 mt-2 mb-0">
                    Chat with Ai to get suggestions regarding content
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
