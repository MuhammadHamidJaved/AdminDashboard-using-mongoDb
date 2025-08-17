import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { BsPlus, BsTrash, BsCheck } from "react-icons/bs";
import { reminderAPI } from '../services/api';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    message: '',
    date: '',
    isDone: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await reminderAPI.getAll();
      setReminders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setLoading(false);
    }
  };

  const handleCreateReminder = async () => {
    try {
      await reminderAPI.create(newReminder);
      setShowModal(false);
      setNewReminder({
        message: '',
        date: '',
        isDone: false
      });
      fetchReminders();
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const handleToggleReminder = async (id, isDone) => {
    try {
      await reminderAPI.update(id, { isDone: !isDone });
      fetchReminders();
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await reminderAPI.delete(id);
      fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  if (loading) return <div>Loading reminders...</div>;
  return (
    <div>
      <div className="card-head d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Reminders</h5>
        <button className="btn-chip" onClick={() => setShowModal(true)}>
          <BsPlus /> Reminder
        </button>
      </div>

      <div className="soft-card">
        <div className="table-responsive">
          <Table className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Message</th>
                <th className="d-none d-md-table-cell">Date</th>
                <th className="d-none d-lg-table-cell">Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder._id}>
                  <td className={reminder.isDone ? 'text-decoration-line-through text-muted' : ''}>
                    <div>{reminder.message}</div>
                    <div className="d-md-none small text-muted">
                      {new Date(reminder.date).toLocaleDateString()}
                      <span className={`ms-2 badge ${reminder.isDone ? 'bg-success' : 'bg-warning'}`}>
                        {reminder.isDone ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">{new Date(reminder.date).toLocaleDateString()}</td>
                  <td className="d-none d-lg-table-cell">
                    <span className={`badge ${reminder.isDone ? 'bg-success' : 'bg-warning'}`}>
                      {reminder.isDone ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="text-end">
                    <button 
                      className={`btn btn-sm ${reminder.isDone ? 'btn-outline-secondary' : 'btn-outline-success'} me-2`}
                      onClick={() => handleToggleReminder(reminder._id, reminder.isDone)}
                    >
                      <BsCheck />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteReminder(reminder._id)}
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

      {/* Create Reminder Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={newReminder.message}
                onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newReminder.date}
                onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateReminder}>
            Create Reminder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reminders;
