const express = require("express");
const router = express.Router();
const {
  createIncident,
  getAllIncident,
  updateIncidentStatus,
} = require("../services/incident-service");

// Route to create a new incident
router.post("/create", async (req, res) => {
  const {
    reporterId,
    location,
    type,
    description,
    status,
    incidentDate,
    severity,
    category,
  } = req.body;

  try {
    const result = await createIncident(
      reporterId,
      location,
      type,
      description,
      status,
      incidentDate,
      severity,
      category
    );
    res.status(201).json({
      status: "success",
      data: result.insertId,
      message: "Incident created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", data: null, message: error.message });
  }
});

// Route to get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await getAllIncident();
    res.status(200).json({
      status: "success",
      data: incidents,
      message: "Incidents retrieved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", data: null, message: error.message });
  }
});

// Route to update incident status
router.patch("/update-status", async (req, res) => {
  const { status, incidentId } = req.body;

  try {
    const result = await updateIncidentStatus(status, incidentId);
    res.status(200).json({
      status: "success",
      data: result,
      message: "Incident status updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", data: null, message: error.message });
  }
});

module.exports = router;
