import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewCards from "./components/OverviewCards";
import TaskList from "./components/TaskList";
import Reminders from "./components/Reminders";
import CalendarSection from "./components/CalendarSection";
import Goals from "./components/Goals";
import Meetings from "./components/Meetings";
import TaskAnalytics from "./components/TaskAnalytics";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css"; // make sure CSS is loaded

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="main-content flex-grow-1">
        <Topbar toggleSidebar={toggleSidebar} />

        <Container fluid className="mt-3 px-3 px-lg-4">
          {/* Row 1: Overview + Analytics */}
          <Row className="align-items-stretch mb-3 mb-lg-4 g-3">
            <Col xs={12} lg={6} className="d-flex">
              <div className="flex-fill section-card">
                <OverviewCards />
              </div>
            </Col>
            <Col xs={12} lg={6} className="d-flex">
              <div className="flex-fill section-card">
                <TaskAnalytics />
              </div>
            </Col>
          </Row>

          {/* Row 2: Tasks/Reminders vs Goals/Calendar/Meetings */}
          <Row className="align-items-stretch g-3">
            {/* Left side - Tasks and Reminders */}
            <Col xs={12} xl={8} className="d-flex flex-column gap-3">
              <div className="flex-fill section-card">
                <TaskList />
              </div>
              <div className="flex-fill section-card">
                <Reminders />
              </div>
            </Col>

            {/* Right side - Goals, Calendar, Meetings */}
            <Col xs={12} xl={4}>
              <Row className="g-3">
                <Col xs={12} md={6} xl={12}>
                  <div className="section-card h-100">
                    <Goals />
                  </div>
                </Col>
                <Col xs={12} md={6} xl={12}>
                  <div className="section-card h-100">
                    <CalendarSection />
                  </div>
                </Col>
                <Col xs={12} md={6} xl={12}>
                  <div className="section-card h-100">
                    <Meetings />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
