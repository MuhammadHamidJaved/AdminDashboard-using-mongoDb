import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaSpinner, FaTimesCircle, FaPlusSquare } from "react-icons/fa";
import { overviewAPI, taskAPI } from '../services/api';

const OverviewCards = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [overviewResponse, tasksResponse] = await Promise.all([
        overviewAPI.getAll(),
        taskAPI.getAll()
      ]);
      setOverviewData(overviewResponse.data);
      setTasks(tasksResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching overview data:', error);
      setLoading(false);
    }
  };

  const getTaskCounts = () => {
    const completed = tasks.filter(task => task.status === 'Complete').length;
    const inProgress = tasks.filter(task => task.status === 'In progress').length;
    const closed = tasks.filter(task => task.status === 'Closed').length;
    const total = tasks.length;

    return { completed, inProgress, closed, total };
  };

  const { completed, inProgress, closed, total } = getTaskCounts();

  // Responsive icon sizes based on screen size
  const getIconSize = () => {
    if (window.innerWidth < 576) return 24; // xs
    if (window.innerWidth < 768) return 28; // sm
    if (window.innerWidth < 992) return 32; // md
    if (window.innerWidth < 1200) return 36; // lg
    return 40; // xl
  };

  const cards = [
    { title: "Completed Task", value: completed, color: "#4caf50", icon: <FaCheckCircle size={getIconSize()} /> },
    { title: "In Progress Task", value: inProgress, color: "#ff9800", icon: <FaSpinner size={getIconSize()} /> },
    { title: "Closed Task", value: closed, color: "#2196f3", icon: <FaTimesCircle size={getIconSize()} /> },
    { title: "Total Tasks", value: total, color: "#9c27b0", icon: <FaPlusSquare size={getIconSize()} /> },
  ];

  if (loading) return <div>Loading overview...</div>;
  return (
    <Row className="g-2 g-md-3">
      {cards.map((c, idx) => (
        <Col xs={6} key={idx}>
          <Card
            className="text-white h-100 overview-card"
            style={{ background: c.color, borderRadius: "12px" }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center p-2 p-sm-3 p-lg-3">
              <div className="overview-content">
                <Card.Title className="overview-title mb-1 mb-sm-2">
                  {c.title}
                </Card.Title>
                <div className="overview-value mb-0">
                  {c.value}
                </div>
              </div>
              <div className="opacity-75 overview-icon">
                {c.icon}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OverviewCards;
