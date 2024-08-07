import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Button, Row, Col } from 'react-bootstrap';

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/student/")
      .then((res) => setStudents(res.data))
      .catch((err) => alert(err.message));
  }, []);

  // Calculate statistics
  const totalStudents = students.length;
  const maleCount = students.filter(student => student.gender.toLowerCase() === 'male').length;
  const femaleCount = students.filter(student => student.gender.toLowerCase() === 'female').length;
  const under18Count = students.filter(student => student.age < 18).length;

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/student/delete/${id}`)
      .then(() => {
        setStudents(students.filter(student => student._id !== id));
        alert('Student Deleted');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Student Dashboard</h1>

      <Row className="mb-4">
        <Col md={3}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="warning" text="dark">
            <Card.Body>
              <Card.Title>Male Students</Card.Title>
              <Card.Text>{maleCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Female Students</Card.Title>
              <Card.Text>{femaleCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Under 18</Card.Title>
              <Card.Text>{under18Count}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-4">All Students</h2>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <ListGroup>
          {students.map((student) => (
            <ListGroup.Item key={student._id} className="d-flex justify-content-between align-items-center">
              {student.name} - {student.age} - {student.gender}
              <Button variant="danger" onClick={() => handleDelete(student._id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
