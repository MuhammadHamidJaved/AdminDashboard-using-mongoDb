import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Modal, Form, Button } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import { goalAPI } from '../services/api';
import "react-circular-progressbar/dist/styles.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    progress: 0,
    target: 100,
    deadline: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await goalAPI.getAll();
      setGoals(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    try {
      await goalAPI.create(newGoal);
      setShowModal(false);
      setNewGoal({
        title: '',
        progress: 0,
        target: 100,
        deadline: ''
      });
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await goalAPI.delete(id);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const getAverageProgress = () => {
    if (goals.length === 0) return 0;
    const total = goals.reduce((sum, goal) => sum + (goal.progress / goal.target) * 100, 0);
    return Math.round(total / goals.length);
  };

  if (loading) return <div>Loading goals...</div>;

  return (
    <div>
      <div className="card-head d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Your Goals</h6>
        <button className="btn-chip" onClick={() => setShowModal(true)}>
          <BsPlus /> Goals
        </button>
      </div>

      <div className="soft-card d-flex align-items-center gap-3">
        {/* left donut */}
        <div className="goal-ring-wrap">
          <CircularProgressbar
            value={getAverageProgress()}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: "#ff5aa5",
              trailColor: "#ffe5f0",
              textColor: "#333",
            })}
          />
        </div>

        {/* right goals list */}
        <div className="flex-grow-1 small">
          {goals.slice(0, 3).map((goal) => (
            <div key={goal._id} className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted">{goal.title}</span>
              <div className="w-50">
                <div className="tiny-bar">
                  <div className="tiny-bar-fill" style={{width: `${(goal.progress/goal.target)*100}%`}}></div>
                </div>
              </div>
              <span className="text-muted">{Math.round((goal.progress/goal.target)*100)}%</span>
              <button 
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => handleDeleteGoal(goal._id)}
              >
                <BsTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Goal Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Progress</Form.Label>
              <Form.Control
                type="number"
                value={newGoal.progress}
                onChange={(e) => setNewGoal({...newGoal, progress: parseInt(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateGoal}>
            Create Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Goals;
