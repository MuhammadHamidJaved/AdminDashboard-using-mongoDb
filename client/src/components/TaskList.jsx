import React, { useState, useEffect } from "react";
import { Table, ProgressBar, Modal, Form, Button } from "react-bootstrap";
import { BsThreeDotsVertical, BsTrash, BsPlus } from "react-icons/bs";
import { taskAPI } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In progress',
    dueDate: '',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    try {
      await taskAPI.create(newTask);
      setShowModal(false);
      setNewTask({
        title: '',
        description: '',
        status: 'In progress',
        dueDate: '',
        priority: 'Medium'
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'Complete': return 100;
      case 'Closed': return 100;
      case 'In progress': return 66;
      default: return 0;
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  return (
    <div>
      <div className="card-head d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Task List</h5>
        <div className="d-flex align-items-center gap-3">
          <button className="btn-chip" onClick={() => setShowModal(true)}>
            <BsPlus /> Task
          </button>
          <button className="link-viewall">View All</button>
        </div>
      </div>

      <div className="soft-card">
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Task name</th>
                <th className="d-none d-md-table-cell">Description</th>
                <th>Status</th>
                <th className="d-none d-lg-table-cell">Due Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <div className="fw-semibold">{task.title}</div>
                    <div className="d-md-none small text-muted">{task.description}</div>
                  </td>
                  <td className="d-none d-md-table-cell">{task.description}</td>
                  <td style={{minWidth:150}}>
                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge-soft ${task.status === "Complete" ? "bg-g" : task.status === "Closed" ? "bg-b" : "bg-y"}`}>
                        {task.status}
                      </span>
                      <div className="flex-grow-1">
                        <ProgressBar now={getStatusProgress(task.status)} style={{height: '6px'}}/>
                      </div>
                    </div>
                    <div className="d-lg-none small text-muted mt-1">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newTask.status}
                onChange={(e) => setNewTask({...newTask, status: e.target.value})}
              >
                <option value="In progress">In progress</option>
                <option value="Complete">Complete</option>
                <option value="Closed">Closed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
