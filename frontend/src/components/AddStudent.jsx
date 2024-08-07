import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function sendData(e) {
    e.preventDefault();

    if (!name || !age || !gender) {
      setError("All fields are required");
      return;
    }

    const newStudent = { name, age, gender };

    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        setSuccess(true);
        setError("");
        setName("");
        setAge("");
        setGender("");
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      });
  }

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Student Added Successfully</Alert>}
      <Form onSubmit={sendData}>
        <Form.Group className="mb-3" controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentAge">
          <Form.Label>Student Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Student Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentGender">
          <Form.Label>Student Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

