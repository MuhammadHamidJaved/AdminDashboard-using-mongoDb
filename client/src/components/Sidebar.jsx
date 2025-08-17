import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import {
  FaThLarge,
  FaTasks,
  FaCalendarAlt,
  FaBell,
  FaProjectDiagram,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-md-none" 
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`sidebar d-flex flex-column p-3 vh-100 ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Close button for mobile */}
        <div className="d-md-none d-flex justify-content-end mb-2">
          <Button variant="link" onClick={toggleSidebar} className="text-dark p-0">
            <FaTimes size={20} />
          </Button>
        </div>
        
        <h4 className="fw-bold mb-4 sidebar-title">Your Dash</h4>
        <Nav className="flex-column gap-2">
          <Nav.Link className="sidebar-link active">
            <FaThLarge className="me-2" /> 
            <span className="sidebar-text">Dashboard</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaTasks className="me-2" /> 
            <span className="sidebar-text">Task</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaCalendarAlt className="me-2" /> 
            <span className="sidebar-text">Calendar</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaBell className="me-2" /> 
            <span className="sidebar-text">Reminder</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaProjectDiagram className="me-2" /> 
            <span className="sidebar-text">Progress Project</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaEnvelope className="me-2" /> 
            <span className="sidebar-text">Messages</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaCog className="me-2" /> 
            <span className="sidebar-text">Settings</span>
          </Nav.Link>
          <Nav.Link className="sidebar-link">
            <FaSignOutAlt className="me-2" /> 
            <span className="sidebar-text">Sign Out</span>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
