import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Tooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../styles/pages.style.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import btnCap from "../assets/icons/capBtn.png";
import moment from "moment";
import TimePicker from "react-time-picker";
import postPic from "../assets/icons/post.png";
import upload from "../assets/images/upload.png";
import postImage from "../assets/images/postPic.png";
import logo from "../assets/icons/poster.png";
import post_icon from "../assets/icons/post_icon.png";
import schedule from "../assets/icons/schedule.png";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { PiShareFat, PiVideo, PiPlusLight } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegComment, FaWhatsapp } from "react-icons/fa";
import { BsEmojiSmile, BsFilterLeft, BsThreeDots } from "react-icons/bs";
import { TiCameraOutline } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import sch_btn from "../assets/icons/sch_btn.png"
import post_btn from "../assets/icons/post_btn.png"
import ok_icon from "../assets/icons/ok.png"
import {
  createPost,
  deletePost,
  generateCaption,
  getPosts,
} from "../apis/post";
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import { useNavigate } from "react-router-dom";
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import { Stack, Chip, TextField, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Close, CloudCircleOutlined, CloudUpload, Create, Tag, Upload } from "@mui/icons-material";
import { BackDrop } from "../components/BackDrop";

const localizer = momentLocalizer(moment);

const populateHashTags = (hashtags) => {
  if (!hashtags) return "";
  if (!hashtags?.length) return "";
  return hashtags
    .map((hashtag) => {
      if (hashtag[0] !== "#") return `#${hashtag}`;
      return hashtag;
    })
    .join(",");
};

const initiatePost = (data) => ({
  title: data?.title || "",
  desc: data?.desc || "",
  hashtags: populateHashTags(data?.hashtags) || "#ABC, #XYZ",
});

const saveButtonCanBeEnabled = (post) => {
  return ["desc", "title", "hashtags"].every((key) => post[key]);
};

const Compose = ({ direction, ...args }) => {
  const dispatch = useDispatch();
  const { currentPost, loading, posts } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.authorization);
  const [modal, setModal] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [post, setPost] = useState(initiatePost(currentPost));
  const [error, setError] = useState({});
  const [imageSrc, setImageSrc] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [switchBtn, setSwitchBtn] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [draftedPosts, setDraftedPosts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalFlag, setDeleteModelFlag] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState(0);
  const [activeStatusToggle, setActiveStatusToggle] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const fetchDraftedPosts = async () => {
    const { payload } = await dispatch(getPosts({ status: "draft" }));
    if (payload.success && payload.data?.length) {
      setDraftedPosts(payload.data);
    }
  };

  useEffect(() => {
    setPost(initiatePost(currentPost));
  }, [currentPost]);

  useEffect(() => {
    fetchDraftedPosts();
  }, []);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    const files = Array.from(event.target.files);
    const newImageSrcs = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageSrcs.push({ src: e.target.result, type: file.type });
        if (newImageSrcs.length === files.length) {
          setImageSrc((prevMediaSrcs) => [...prevMediaSrcs, ...newImageSrcs]);
        }
      };
      reader.readAsDataURL(file);
    });

    toggleMedia(); // Toggle the modal after file upload
    // console.log("uploaded data", imageSrc);
  };

  const handleImageClick = (mediaUrl) => {
    setImageSrc((prevMediaSrcs) => [...prevMediaSrcs, { src: mediaUrl, type: 'image/*' }]);
    toggleImportMedia();
  };

  const removeFile = (index) => {
    setImageSrc((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const setValue = (key, value) => {
    setPost({ ...post, [key]: value });
  };

  const onChange = ({ target: { name, value } }) => setValue(name, value);

  const getAiCaption = async () => {
    if (!post.title) {
      return setError({ title: "Title is required" });
    }
    const params = { topic: post.title };
    if (post.title) params.title = post.title;
    if (post.desc) params.desc = post.desc;
    const response = await dispatch(generateCaption(params));
    setPost(initiatePost(response.payload?.data));
  };

  const toggle = () => setModal(!modal);

  const [modalOpen, setModalOpen] = useState(false);
  const [importMediaModal, setImportMediaModal] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleMedia = () => setMediaModal(!mediaModal);

  const toggleImportMedia = () => {
    toggleMedia()
    setImportMediaModal(!importMediaModal);
  }

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const handleTime = () => {
    console.log("Selected Date:", selectedDay, "Time:", selectedTime);
    let [Hours, minutes] = selectedTime.split(":").map((x) => parseInt(x));

    selectedDay.setHours(Hours);
    selectedDay.setMinutes(minutes);
    selectedDay.setSeconds(0);

    postUpload({
      title: post.title,
      desc: post.desc,
      hashtags: post.hashtags,
      platforms: ["facebook"],
      status: "scheduled",
      files: files,
      scheduled_at: selectedDay,
    });

  };

  const activetoggleModal = () => setActiveStatusToggle(!activeStatusToggle);

  const handleTimeChange = (type, value) => {
    if (type === "start") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  };

  const postUpload = async (postObject) => {
    const hashtags = postObject.hashtags.split(",").map((x) => x.trim());
    const formData = new FormData();
    formData.append("title", postObject.title);
    formData.append("desc", postObject.desc);
    formData.append("hashtags", JSON.stringify(hashtags));
    formData.append("user_id", currentUser?.id);
    formData.append("status", postObject.status);
    formData.append("platforms", JSON.stringify(postObject.platforms));
    if (postObject.scheduled_at) {
      formData.append("scheduled_at", postObject.scheduled_at);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("media", postObject.files[i]);
    }

    const resp = await dispatch(createPost(formData));
    if (resp.payload.success) {
      if (postObject.status === "draft") {
        setPost({ desc: "", title: "", hashtags: "" });
        setFiles([]);
        setImageSrc([]);
        fetchDraftedPosts();
      }

      if (postObject.status === "scheduled") {
        setStatusMessage("Scheduled");
      } else {
        setStatusMessage("Posted");
      }
      setActiveStatusToggle(true)


    }
  };

  const handleSwitch = () => {
    setSwitchBtn(!switchBtn);
  };

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleImportMedia = () => { };

  const toggleDeletePostModal = () => {
    setDeleteModelFlag(!deleteModalFlag);
  };

  const removeTags = (tagToRemove) => {
    const updatedHashtags = post.hashtags
      .split(",")
      .filter((_, index) => index !== tagToRemove)
      .join(",");
    setPost((prevPost) => ({ ...prevPost, hashtags: updatedHashtags }));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getFilteredMedia = (media) => {
    if (selectedType === 'All') return media;
    if (selectedType === 'Pictures') return media.filter(m => m.media_type === 'image');
    if (selectedType === 'Videos') return media.filter(m => m.media_type === 'video');
    return media;
  };

  const filteredMediaPosts = filteredPosts.map(post => ({
    ...post,
    media: getFilteredMedia(post.media),
  })).filter(post => post?.media?.length > 0);


  return (
    <>
      <Modal
        isOpen={deleteModalFlag}
        toggle={toggleDeletePostModal}
        centered={true}
        size="md"
        className="border-0"
      >
        <ModalHeader toggle={toggleDeletePostModal}>
          Delete Drafted Post
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this post? It will be removed from
          your drafts
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={async () => {
              if (currentDraftId <= 0) return;
              const {
                payload: { success, data },
              } = await dispatch(deletePost(currentDraftId));
              if (success) {
                setDraftedPosts(draftedPosts?.filter?.((x) => x?.id !== data));
                setCurrentDraftId(0);
                setDeleteModelFlag(false);
              }
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeletePostModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div className="overflow-x-hidden">
        <Row>
          <Col md={9} className="p-5">
            <Card className="border-0 shadow d-none">
              <div style={{ height: "100%" }}>
                <Calendar
                  localizer={localizer}
                  events={[]}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSelectSlot}
                  style={{ height: "400px" }}
                />
                {selectedDate && (
                  <div>
                    <h3>
                      Selected Date:{" "}
                      {moment(selectedDate).format("MMMM Do YYYY")}
                    </h3>
                    <div>
                      <label>Start Time: </label>
                      <TimePicker
                        onChange={(value) => handleTimeChange("start", value)}
                        value={startTime}
                      />
                    </div>
                    <div>
                      <label>End Time: </label>
                      <TimePicker
                        onChange={(value) => handleTimeChange("end", value)}
                        value={endTime}
                      />
                    </div>
                    <div>
                      <p>
                        Selected Time Slot: {startTime} - {endTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            {/* <div className="mt-4 mb-4">
              <BsFilterLeft className="fs-2" />
            </div> */}
            {/* {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : ( */}
            <Card className="shadow border-0 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex" style={{ marginBottom: '10px', alignItems: 'center' }}>
                  <div className="bg_icon_wrapper">
                    <Create />
                  </div>

                  <div style={{ marginLeft: '15px', }}>
                    <Typography fontWeight={600}>
                      Post Content
                    </Typography>
                    <Typography style={{ color: 'grey' }}>
                      Create a high performing post
                    </Typography>
                  </div>
                </div>


                <div className="d-flex flex-column justify-content-end">
                  <div className="d-flex justify-content-end">
                    <div className="d-flex" id="Heading">
                      <img src={btnCap} alt="" className="cap_icon" />
                      <p className="fs-4 fw-bold cap_btn">AI</p>
                    </div>

                    <Tooltip
                      {...args}
                      isOpen={tooltipOpen}
                      target="Heading"
                      toggle={toggleTooltip}
                      placement="top"
                    >
                      Click on generate to let the AI write it for you
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div class="text-area-container">
                <div onClick={toggleMedia} style={styles.uploadButton}>
                <CloudUpload style={{ fontSize: '50px', textAlign: 'center' }} />
                  <Typography>Upload your media here</Typography>
                </div>

                <div className="mb-3">
                  <div className="mt-2 d-flex flex-wrap">
                    {imageSrc.map((media, index) => (
                      <div
                        key={index}
                        className="position-relative uploaded-media-container"
                      >
                        {media.type.startsWith("image/") ? (
                          <img
                            src={media.src}
                            alt={`Uploaded ${index}`}
                            className="uploaded-img"
                          />
                        ) : (
                          <video controls className="uploaded-img">
                            <source src={media.src} type={media.type} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <button
                          className="remove-btn"
                          onClick={() => removeFile(index)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="text"
                    name="title"
                    onChange={onChange}
                    value={post.title}
                    placeholder="Title"
                    className="post_fields"
                    style={{ border: '1px solid #D9D9D9', borderRadius: '10px' }}
                  />
                  {/* {titleError && <p className="error mt-1">{titleError}</p>} */}
                </div>


                <>
                  <textarea
                    id="postContent"
                    placeholder="AI generated description for you"
                    name="desc"
                    onChange={onChange}
                    value={post.desc}
                    className="post_fields"
                    style={{ border: '1px solid #D9D9D9', borderRadius: '10px' }}
                  ></textarea>

                  <div className="mb-3" >
                    <div className="mt-3 d-flex" style={{ alignItems: 'center' }}>
                      <div className="bg_icon_wrapper">
                        <Tag />
                      </div>

                      <div style={{ marginLeft: '15px', }}>
                        <Typography fontWeight={600}>
                          Hashtags
                        </Typography>
                        <Typography style={{ color: 'grey' }}>
                          Select from the hashtags you want to include in description
                        </Typography>
                      </div>
                    </div>

                    <div className="hashtags_bg mt-3 p-2">
                      {post.hashtags ? (
                        <>
                          {post.hashtags.split(",").map((hashtag, index) => {
                            return (
                              <>
                                <div
                                  className="hashtags_pin me-2 p-2"
                                  key={index}
                                  style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <Typography style={{ paddingLeft: 10, fontSize: '14px' }}>{hashtag}</Typography>
                                  <IconButton onClick={() => removeTags(index)}>
                                    <IoCloseCircleOutline />
                                  </IconButton>
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <Input
                      type="text"
                      name="hashtags"
                      onChange={onChange}
                      value={post.hashtags}
                      placeholder="Tags"
                      className="post_fields mt-2"
                    /> */}
                  </div>
                </>



              </div>

              {/* MEDIA IMPORT MODAL */}

              <Modal
                isOpen={importMediaModal}
                toggle={toggleImportMedia}
                {...args}
                centered={true}
                size="xl"
                className="border-0"
              >
                <div className='p-4'>
                  <Row>
                    <Col md={7}>
                      <div className='d-flex justify-content-between'>
                        <p className='fs-4 fw-bold'>Media Library</p>
                        <div className='search-container'>
                          <Input
                            type="text"
                            placeholder="search"
                            className="media_search"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                          />
                          <span className="search-icon-right"></span>
                        </div>
                      </div>
                    </Col>
                    <Col md={5}>
                      <div className='d-flex justify-content-end'>
                        <form>
                          <select name="fields" id="opts" onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="All" className='sel_opts'>All</option>
                            <option value="Videos" className='sel_opts'>Videos</option>
                            <option value="Pictures" className='sel_opts'>Pictures</option>
                          </select>
                        </form>
                      </div>
                    </Col>
                  </Row>

                  {/* <div>
          <Row className="p-4">
            {filteredMedia.length === 0 ? (
              <p>No media items of the selected type are available.</p>
            ) : (
              filteredPosts.map((post, postIdx) =>
                post.media
                  .filter(media => selectedType === 'All' || media.media_type === selectedType.toLowerCase())
                  .map((media, mediaIdx) => (
                    <Col md={4} key={`col-${postIdx}-${mediaIdx}`}>
                      <div className='card card_wrap mt-2'>
                        <img
                          src={media?.media_url || upload}
                          alt=""
                          className="media_data "
                        />
                        <hr />
                        <h5 className="card_title">{post.title}</h5>
                      </div>
                    </Col>
                  ))
              )
            )}
          </Row>
        </div> */}

                  <div>
                    {filteredMediaPosts.length === 0 ? (
                      <p>No {selectedType.toLowerCase()}'s found.</p>
                    ) : (
                      <Row className="p-4">
                        {filteredMediaPosts.map((post, postIdx) =>
                          post.media.map((media, mediaIdx) => (
                            <Col md={4} key={`col-${postIdx}-${mediaIdx}`}>
                              <div className='card card_wrap mt-2'>
                                <img
                                  src={media?.media_url || upload}
                                  alt=""
                                  className="media_data "
                                />
                                <hr />
                                <h5 className="card_title">{post.title}</h5>
                              </div>
                            </Col>
                          ))
                        )}
                      </Row>
                    )}
                  </div>
                </div>
              </Modal>

              {/* UPLOAD FILES MODAL */}

              <Modal
                isOpen={mediaModal}
                toggle={toggleMedia}
                {...args}
                centered={true}
              >
                <div>
                  <Row className="p-4">
                    <Typography style={{ color: 'black', textAlign: 'center', marginBottom: 20, fontSize: '20px', fontWeight: '600' }}>
                      Add Media to post
                    </Typography>
                    <Col md={6} className="d-flex justify-content-center">
                      <div
                        className="upload_btns_bg"
                        onClick={() => {
                          toggleImportMedia();
                          dispatch(getPosts());
                        }}
                      >
                        <PiVideo style={{ color: 'black' }} className="fs-4 mb-2" />
                        <Typography style={{ color: 'black', textAlign: 'center' }}>
                          Import from <br /> media library
                        </Typography>
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-center">
                      <div
                        className="upload_btns_bg"
                        onClick={handleIconClick}
                      >
                        <PiPlusLight style={{ color: 'black' }} className="fs-4 mb-2" />
                        <div>
                          <Typography style={{ color: 'black', textAlign: 'center' }}>
                            Upload media <br /> from device
                          </Typography>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Modal>


              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button className="post_btn" onClick={getAiCaption}>
                  Generate
                </Button>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                  {post.title && post?.status !== "draft" && (
                    <Button className="post_btn"

                      onClick={() =>
                        postUpload({
                          title: post.title,
                          desc: post.desc,
                          hashtags: post.hashtags,
                          platforms: ["facebook"],
                          status: "draft",
                          files: files,
                        })
                      }

                    >
                      Save as Draft
                    </Button>
                  )}
                  <Button className="publish_btn"

                    onClick={saveButtonCanBeEnabled(post) ? toggle : () => null}
                    disabled={!saveButtonCanBeEnabled(post)}
                  >
                    Publish
                  </Button>
                </div>
              </div>

              {/* post modal */}
              <Modal
                isOpen={modal}
                toggle={toggle}
                {...args}
                centered={true}
                size="lg"
              >
                <Row className="p-3">
                  <Col md={4}>
                    <div className="post_wrapper">
                      <img
                        src={imageSrc[0]?.src || postImage}
                        alt=""
                        className="upload_post"
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="content_div p-3">
                      <div>
                        <h3 className="titles">{post.title}</h3>
                      </div>

                      <div className="desc_container">
                        <p>{post.desc}</p>
                      </div>
                      <div>
                        <p className="mt-5 hashss">{(post.hashtags).replace(/,/g, ' ')}</p>
                      </div>
                    </div>
                  </Col>
                </Row>


                <Row className="mb-3">
                  <Col md={6} className="d-flex justify-content-center">
                    <Button className="Schedule_btn" onClick={toggleModal}>
                      <img src={sch_btn} alt="" className="me-3" /> Schedule
                    </Button>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <Button
                      className="post_btn_modal "
                      onClick={() =>
                        postUpload({
                          title: post.title,
                          desc: post.desc,
                          hashtags: post.hashtags,
                          platforms: ["facebook"],
                          status: "active",
                          files: files,
                        })
                      }
                    >
                      <img src={post_btn} alt="" className="me-3" /> Post
                    </Button>
                  </Col>
                </Row>
              </Modal>

              <div>

                <Modal isOpen={activeStatusToggle} toggle={activetoggleModal} centered={true}>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column text-center p-3">
                      <img src={ok_icon} alt="" />
                      <p className="fs-3 mt-3 mb-3">{statusMessage}</p>
                    </div>
                  </div>
                </Modal>

              </div>
            </Card>

          </Col>
          <Col md={3}>
            <div className="left_sidebar">
              <div className="heading_card">
                <p className="preview_heading">Preview</p>
              </div>

              <div className="p-2 list_view">
                {/* {draftedPosts.length &&
                  draftedPosts.map((post, index) => {
                    const imageUrl = post?.media?.[0]?.media_url;
                    return (
                      <Card
                        key={`__drafted_posts_${index}__`}
                        className="p-2 border-0 shadow mb-3"
                      >
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <div className="post_logo">
                              <img src={logo} alt="" />
                            </div>

                            <div>
                              <p className="post_title">
                                {post?.title} <br />{" "}
                                <span className="post_time">1h</span>
                              </p>
                            </div>
                          </div>
                          <IconButton
                            onClick={() => {
                              setCurrentDraftId(post.id);
                              setDeleteModelFlag(true);
                            }}
                          >
                            <IoClose className="fs-3" />
                          </IconButton>
                        </div>
                        <div>
                          <p className="post_desc">{post.desc}</p>
                        </div>
                        {imageUrl && (
                          <div>
                            <img src={imageUrl} alt="" />
                            <hr />
                          </div>
                        )}
                        <div className="d-flex justify-content-between">
                          <Button
                            className="continue_btn"
                            onClick={() => {
                              setPost(post);
                              setImageSrc(
                                post.media.map((x) => ({
                                  src: x.media_url,
                                  type: x.media_type + "/jpeg",
                                }))
                              );
                            }}
                          >
                            Continue
                          </Button>
                        </div>
                      </Card>
                    );
                  })} */}
                {draftedPosts.length ? (
                  draftedPosts.map((post, index) => {
                    const imageUrl = post?.media?.[0]?.media_url;
                    return (
                      <Card
                        key={`__drafted_posts_${index}__`}
                        className="p-2 border-0 shadow mb-3"
                      >
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <div className="post_logo">
                              <img src={logo} alt="" />
                            </div>

                            <div>
                              <p className="post_title">
                                {post?.title} <br />{" "}
                                <span className="post_time">1h</span>
                              </p>
                            </div>
                          </div>
                          <IconButton
                            onClick={() => {
                              setCurrentDraftId(post.id);
                              setDeleteModelFlag(true);
                            }}
                          >
                            <IoClose className="fs-3" />
                          </IconButton>
                        </div>
                        <div>
                          <p className="post_desc">{post.desc}</p>
                        </div>
                        {imageUrl && (
                          <div>
                            <img src={imageUrl} alt="" />
                            <hr />
                          </div>
                        )}
                        <div className="d-flex justify-content-between">
                          <Button
                            className="continue_btn"
                            onClick={() => {
                              setPost(post);
                              setImageSrc(
                                post.media.map((x) => ({
                                  src: x.media_url,
                                  type: x.media_type + "/jpeg",
                                }))
                              );
                            }}
                          >
                            Continue
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <p className="text-center">No drafted post here</p>
                )}

              </div>

              <div>
                {/* DAte picker */}

                <Modal
                  isOpen={modalOpen}
                  toggle={toggleModal}
                  className="custom-modal"
                  size="sm"
                >
                  <div className="date-picker-container d-flex justify-content-center flex-column mt-3 mb-3">
                    <DatePicker
                      selected={selectedDay}
                      dateFormat="MMMM d, yyyy"
                      onChange={(date) => setSelectedDay(date)}
                      inline
                    />
                    <div className="time-picker">
                      <TimePicker
                        onChange={setSelectedTime}
                        value={selectedTime}
                        disableClock
                        clearIcon={null}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="date_btn me-2" onClick={handleTime}>
                        Set Time
                      </button>
                      <button className="date_btn_cancel" onClick={toggleModal}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <BackDrop open={loading} />
    </>
  );
};

export default Compose;

const styles = {
  uploadButton:
  {
    gap: 10,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    border: '1px dashed #D9D9D9',
    height: '120px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: 10,
  }
}