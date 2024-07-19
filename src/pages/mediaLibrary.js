import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Col, Input, Row } from 'reactstrap'
import upload from "../assets/images/upload.png";

import "../styles/pages.style.css"

const MediaLibrary = ({ direction, ...args }) => {
  const { currentPost, loading, posts } = useSelector((state) => state.posts);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  let mediaData = posts.map((d) => d.media).flat(1).map((t) => t.post_id)
  let postTitles = posts
    .filter((post) => mediaData.includes(post.id))
    .map((post) => post.title);

  console.log('object post', posts);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // const filteredMedia = filteredPosts.flatMap(post =>
  //   post.media.filter(media =>
  //     selectedType === 'All' || media.media_type === selectedType.toLowerCase()
  //   )
  // );

  const getFilteredMedia = (media) => {
    if (selectedType === 'All') return media;
    if (selectedType === 'Pictures') return media.filter(m => m.media_type === 'image');
    if (selectedType === 'Videos') return media.filter(m => m.media_type === 'video');
    return media;
  };

  const filteredMediaPosts = filteredPosts.map(post => ({
    ...post,
    media: getFilteredMedia(post.media),
  })).filter(post => post.media.length > 0);

  return (
    <>
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
    </>
  )
}

export default MediaLibrary