import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup, Button, Dropdown, Badge, Card, ListGroup } from "react-bootstrap";
import { BsSearch, BsMoon, BsSun, BsBell, BsChevronDown, BsList, BsPerson, BsGear, BsBoxArrowRight, BsCheck2Circle, BsClock, BsCalendar, BsFlag } from "react-icons/bs";
import { taskAPI, meetingAPI, goalAPI, reminderAPI } from '../services/api';

const Topbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  // Search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const [tasks, meetings, goals, reminders] = await Promise.all([
        taskAPI.getAll(),
        meetingAPI.getAll(),
        goalAPI.getAll(),
        reminderAPI.getAll()
      ]);

      const allResults = [];
      
      // Search in tasks
      tasks.data.forEach(task => {
        if (task.title?.toLowerCase().includes(query.toLowerCase()) ||
            task.description?.toLowerCase().includes(query.toLowerCase())) {
          allResults.push({
            ...task,
            type: 'task',
            icon: BsCheck2Circle,
            color: 'primary'
          });
        }
      });

      // Search in meetings
      meetings.data.forEach(meeting => {
        if (meeting.title?.toLowerCase().includes(query.toLowerCase()) ||
            meeting.description?.toLowerCase().includes(query.toLowerCase())) {
          allResults.push({
            ...meeting,
            type: 'meeting',
            icon: BsCalendar,
            color: 'success'
          });
        }
      });

      // Search in goals
      goals.data.forEach(goal => {
        if (goal.title?.toLowerCase().includes(query.toLowerCase()) ||
            goal.description?.toLowerCase().includes(query.toLowerCase())) {
          allResults.push({
            ...goal,
            type: 'goal',
            icon: BsFlag,
            color: 'warning'
          });
        }
      });

      // Search in reminders
      reminders.data.forEach(reminder => {
        if (reminder.title?.toLowerCase().includes(query.toLowerCase()) ||
            reminder.description?.toLowerCase().includes(query.toLowerCase())) {
          allResults.push({
            ...reminder,
            type: 'reminder',
            icon: BsClock,
            color: 'info'
          });
        }
      });

      setSearchResults(allResults.slice(0, 8)); // Limit to 8 results
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
      document.body.classList.remove('dark-mode');
    }
  };

  // Generate sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        title: 'New Task Assigned',
        message: 'You have been assigned a new task: "Complete Dashboard"',
        time: '5 min ago',
        type: 'task',
        read: false
      },
      {
        id: 2,
        title: 'Meeting Reminder',
        message: 'Team standup meeting in 30 minutes',
        time: '25 min ago',
        type: 'meeting',
        read: false
      },
      {
        id: 3,
        title: 'Goal Deadline',
        message: 'Goal "Launch Project" deadline is tomorrow',
        time: '1 hour ago',
        type: 'goal',
        read: true
      },
      {
        id: 4,
        title: 'Task Completed',
        message: 'Task "Review Code" has been completed',
        time: '2 hours ago',
        type: 'task',
        read: true
      }
    ];
    
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Apply dark mode on component mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className={`topbar d-flex justify-content-between align-items-center px-4 py-3 border-bottom ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
      {/* Left side with mobile menu toggle */}
      <div className="d-flex align-items-center">
        {/* Mobile menu toggle */}
        <Button 
          variant="link" 
          className={`d-md-none me-3 p-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}
          onClick={toggleSidebar}
        >
          <BsList size={24} />
        </Button>
        
        {/* Search */}
        <div className="position-relative" ref={searchRef}>
          <InputGroup className="top-search rounded-4 overflow-hidden">
            <InputGroup.Text className="border-0 bg-transparent ps-3">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              className="border-0 bg-transparent"
              type="text"
              placeholder="Search tasks, meetings, goals..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
            />
          </InputGroup>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <Card className="position-absolute top-100 start-0 w-100 mt-2 shadow-lg" style={{ zIndex: 1050 }}>
              <Card.Header className="py-2">
                <small className="text-muted">Search Results ({searchResults.length})</small>
              </Card.Header>
              <ListGroup variant="flush">
                {searchResults.map((result, index) => {
                  const IconComponent = result.icon;
                  return (
                    <ListGroup.Item 
                      key={`${result.type}-${result._id || index}`}
                      className="py-2 border-0 cursor-pointer hover-bg-light"
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <IconComponent className={`text-${result.color} me-2`} size={16} />
                        <div className="flex-grow-1">
                          <div className="fw-semibold small">{result.title}</div>
                          <div className="text-muted small text-truncate">
                            {result.description || 'No description'}
                          </div>
                        </div>
                        <Badge bg={result.color} className="ms-2 small">
                          {result.type}
                        </Badge>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          )}
          
          {/* No Results Message */}
          {showSearchResults && searchResults.length === 0 && searchQuery.length >= 2 && (
            <Card className="position-absolute top-100 start-0 w-100 mt-2 shadow-lg" style={{ zIndex: 1050 }}>
              <Card.Body className="text-center py-3">
                <small className="text-muted">No results found for "{searchQuery}"</small>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="d-flex align-items-center gap-3">
        {/* Dark mode toggle */}
        <Button
          variant="link"
          className="icon-circle p-0 border-0"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </Button>

        {/* Notifications */}
        <div className="position-relative" ref={notificationRef}>
          <Button
            variant="link"
            className="icon-circle position-relative p-0 border-0"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BsBell size={18} />
            {unreadCount > 0 && (
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <Card className="position-absolute end-0 mt-2 shadow-lg" style={{ zIndex: 1050, width: '320px' }}>
              <Card.Header className="d-flex justify-content-between align-items-center py-2">
                <h6 className="mb-0">Notifications</h6>
                {notifications.length > 0 && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-decoration-none p-0"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </Button>
                )}
              </Card.Header>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                  <ListGroup variant="flush">
                    {notifications.map((notification) => (
                      <ListGroup.Item 
                        key={notification.id}
                        className={`py-3 border-0 ${!notification.read ? 'bg-light' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <div className="fw-semibold small mb-1">
                              {notification.title}
                              {!notification.read && (
                                <span className="ms-2 badge bg-primary rounded-pill" style={{ fontSize: '0.5rem' }}>
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-muted small mb-1">
                              {notification.message}
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Card.Body className="text-center py-4">
                    <BsBell size={24} className="text-muted mb-2" />
                    <div className="text-muted small">No notifications</div>
                  </Card.Body>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle 
            as="div" 
            className="d-flex align-items-center gap-2 cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            <div className="avatar-ring">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Ritika"
                className="avatar-img"
              />
            </div>
            <div className="d-none d-md-block lh-1">
              <div className="fw-bold">Ritika</div>
              <div className="text-muted small">ritika@gmail.com</div>
            </div>
            <BsChevronDown />
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-lg border-0">
            <Dropdown.Item className="py-2">
              <BsPerson className="me-2" />
              Profile Settings
            </Dropdown.Item>
            <Dropdown.Item className="py-2">
              <BsGear className="me-2" />
              Account Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="py-2 text-danger">
              <BsBoxArrowRight className="me-2" />
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
