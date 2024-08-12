import React, {useState} from 'react'
import "./Navbar.css"
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/user_profile.png'
import voice_search from '../../assets/voice_search.png'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = ({ setSidebar, searchQuery, setSearchQuery }) => {
  
  const navigate = useNavigate();
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  
  const handleInputChange = (e) => {
    // Update the tempSearchQuery state on every input change
    setTempSearchQuery(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Update the searchQuery state and call the handleSearch function
      setSearchQuery(tempSearchQuery);
      navigate('/');
    }
  };


  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <div className="menu-container flex-div" onClick={() => setSidebar((prev) => !prev)}>
          <img className="menu-icon" src={menu_icon} alt="" />
        </div>
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={tempSearchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <img src={search_icon} alt="" />
        </div>
        <div className="voice-search flex-div">
          <img src={voice_search} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;