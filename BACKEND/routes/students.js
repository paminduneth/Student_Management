const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/add", (req, res) => {
    const { name, age, gender } = req.body;
    const newStudent = new Student({ name, age, gender });

    newStudent.save()
        .then(() => res.json("Student Added"))
        .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
    Student.find()
        .then((students) => res.json(students))
        .catch((err) => console.log(err));
});

router.put("/update/:id", async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = { name, age, gender };

    await Student.findByIdAndUpdate(userId, updateStudent)
        .then((update) => res.status(200).send({ status: "User updated", user: update }))
        .catch((err) => res.status(500).send({ status: "Error with updating data", error: err.message }));
});

router.delete("/delete/:id", async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
        .then(() => res.status(200).send({ status: "User deleted" }))
        .catch((err) => res.status(500).send({ status: "Error with delete user", error: err.message }));
});

router.get("/get/:id", async (req, res) => {
    let userId = req.params.id;

    await Student.findById(userId)
        .then((user) => res.status(200).send({ status: "User fetched", user: user }))
        .catch((err) => res.status(500).send({ status: "Error with get user", error: err.message }));
});

module.exports = router;
