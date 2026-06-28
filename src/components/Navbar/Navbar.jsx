// Navbar.jsx
import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import bellIcon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { firebaseService } from '../../firebase'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

/**
 * Navbar component - main navigation bar with profile dropdown, search, and notifications
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const navRef = useRef();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "New Release Available",
      message: "Check out the latest action movies",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Your List Updated",
      message: "You have new recommendations based on your viewing",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Trending Now",
      message: "The new fantasy series is taking the world by storm",
      time: "1 day ago"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('navbar_dark');
        } else {
          navRef.current.classList.remove('navbar_dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // cleanup
  }, []);

  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        firebaseService.logout();
        toast.success("Signed out successfully");
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to sign out");
      }
    }
  };

  const handleLogoutKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogout();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchActive(false);
      setShowNotifications(false);
    }
  };

  const activateSearch = () => {
    setSearchActive(true);
  };

  const submitSearchFromIcon = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchActive(false);
      setShowNotifications(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchActive(false);
      setSearchQuery('');
    }
  };

  const dismissNotification = () => {
    setUnreadCount(Math.max(0, unreadCount - 1));
    toast.success("Notification dismissed");
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar_left'>
        <Link to="/home">
          <img src={logo} alt='Netflix logo' className='navbar-logo' />
        </Link>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/tvshows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new-popular">New & Popular</Link></li>
          <li><Link to="/mylist">My List</Link></li>
          <li><Link to="/browse-languages">Browse by Languages</Link></li>
        </ul>
      </div>
      <div className='navbar_right'>
        {/* Search Box */}
        <div className='search-container'>
          <form onSubmit={handleSearch} className='search-form'>
            {searchActive && (
              <input
                type="text"
                placeholder="Titles, people, genres"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className={`search-input ${searchActive ? 'active' : ''}`}
                aria-label="Search movies and shows"
              />
            )}
            <button
              type="button"
              className="search-icon-button"
              onClick={searchActive ? submitSearchFromIcon : activateSearch}
              aria-label="Search"
            >
              <img
                src={searchIcon}
                alt=""
                title="Search"
                className='search-icon'
              />
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className='notifications-container'>
          <div className='notification-bell' onClick={() => setShowNotifications(!showNotifications)}>
            <img src={bellIcon} alt="notifications" title="Notifications" />
            {unreadCount > 0 && <span className='notification-badge'>{unreadCount}</span>}
          </div>
          {showNotifications && (
            <div className='notifications-dropdown'>
              <h3>Notifications</h3>
              {notifications.length > 0 ? (
                <div className='notifications-list'>
                  {notifications.map((notif) => (
                    <div key={notif.id} className='notification-item'>
                      <div className='notification-content'>
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className='notification-time'>{notif.time}</span>
                      </div>
                      <button
                        className='dismiss-btn'
                        onClick={() => dismissNotification()}
                        aria-label="Dismiss notification"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='no-notifications'>No new notifications</p>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className='navbar_profile'>
          <img src={profile_img} alt="profile" className='profile' />
          <img src={caret_icon} alt="menu" className='caret-icon' />
          <div className='dropdown'>
            <button
              onClick={handleLogout}
              onKeyDown={handleLogoutKeyDown}
              className='logout-btn'
              aria-label="Sign out of Netflix"
            >
              Sign Out of Netflix
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
