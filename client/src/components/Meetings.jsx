import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import { meetingAPI } from '../services/api';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    participants: '',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await meetingAPI.getAll();
      setMeetings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setLoading(false);
    }
  };

  const handleCreateMeeting = async () => {
    try {
      const meetingData = {
        ...newMeeting,
        participants: newMeeting.participants.split(',').map(p => p.trim())
      };
      await meetingAPI.create(meetingData);
      setShowModal(false);
      setNewMeeting({
        title: '',
        date: '',
        time: '',
        participants: '',
        location: '',
        notes: ''
      });
      fetchMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await meetingAPI.delete(id);
      fetchMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  if (loading) return <div>Loading meetings...</div>;
  return (
    <div>
      <div className="card-head d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Today Meetings</h6>
        <button className="btn-chip" onClick={() => setShowModal(true)}>
          <BsPlus /> Meeting
        </button>
      </div>

      <div className="soft-card">
        {meetings.map((meeting) => (
          <div key={meeting._id} className="d-flex align-items-start justify-content-between py-2 border-bottom last:border-0">
            <div className="d-flex align-items-start gap-2 flex-grow-1">
              <div className="meeting-tick flex-shrink-0" />
              <div className="flex-grow-1 min-w-0">
                <div className="fw-semibold text-truncate">{meeting.title}</div>
                <div className="small text-muted text-truncate">
                  {meeting.notes || meeting.location}
                </div>
                <div className="small text-muted d-flex flex-wrap gap-2">
                  <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  <span className="d-sm-none">• {meeting.time}</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              <div className="small text-muted d-none d-sm-block">{meeting.time}</div>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteMeeting(meeting._id)}
                style={{padding: '0.25rem'}}
              >
                <BsTrash size={12} />
              </button>
            </div>
          </div>
        ))}
        {meetings.length === 0 && (
          <div className="text-center py-3 text-muted">
            <div>No meetings scheduled</div>
            <small>Click + Meeting to add one</small>
          </div>
        )}
      </div>

      {/* Create Meeting Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Participants (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={newMeeting.participants}
                onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
                placeholder="John Doe, Jane Smith"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newMeeting.location}
                onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMeeting.notes}
                onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateMeeting}>
            Create Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Meetings;
