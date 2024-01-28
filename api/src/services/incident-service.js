const connection = require("../config/connection");
const { incidentQueries } = require("../config/incident-queries");

async function createIncident(
  reporterId,
  location,
  type,
  description,
  status,
  incidentDate,
  severity,
  category
) {
  try {
    const result = await connection(incidentQueries.CREATE_INCEDENT, [
      reporterId,
      location,
      type,
      description,
      status,
      incidentDate,
      severity,
      category,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Error creating incident: ${error.message}`);
  }
}

async function getAllIncident() {
  try {
    const incidents = await connection(incidentQueries.GET_ALL_INCEDENT);
    return incidents;
  } catch (error) {
    throw new Error(`Error fetching incidents: ${error.message}`);
  }
}

async function updateIncidentStatus(status, incidentId) {
  try {
    const result = await connection(incidentQueries.UPDATE_INCEDENT_STATUS, [
      status,
      incidentId,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Error updating incident status: ${error.message}`);
  }
}

module.exports = { createIncident, getAllIncident, updateIncidentStatus };
