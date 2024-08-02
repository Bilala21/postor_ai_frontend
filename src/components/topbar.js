import React from 'react';
import { Input } from 'reactstrap';
import { TbInbox } from 'react-icons/tb';
import { IoMdNotificationsOutline } from 'react-icons/io';
import profile from '../assets/icons/profile.png';
import '../styles/component.style.css';

const Topbar = () => {
  return (
    <div className="topbar-container d-flex justify-content-between align-items-center px-3 py-2">
      <div className="search-container flex-grow-1 me-3">
        <Input type="text" placeholder="Search" className="bg_search form-control" />
      </div>
      <div className="icons-container d-flex align-items-center">
        <TbInbox className="icon fs-3 mx-2" />
        <IoMdNotificationsOutline className="icon fs-3 mx-2" />
        <div className="profile-container d-flex align-items-center mx-2">
          <img src={profile} alt="Profile" className="profile-image" />
          <select name="cars" id="cars" className="profile-select ms-2">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
