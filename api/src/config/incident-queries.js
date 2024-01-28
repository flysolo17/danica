const incidentQueries = {
  CREATE_INCEDENT: `INSERT INTO incidents 
                        (reporter_id, location, type, description, status, incident_date, severity, category)
                    VALUES 
                        (?,?, ?,?, ?,?, ?, ?);`,
  GET_ALL_INCEDENT: `
    SELECT 
        u.name as reporter,
        i.location,
        i.type,
        i.description,
        s.status_name as status,
        i.incident_date,
        sev.severity_name as severity,
        i.category
    FROM
        incidents as i 
    JOIN 
        users as u ON u.id = i.reporter_id
    JOIN 
        incident_status as s ON s.id = i.status
    JOIN 
        incident_severity as sev ON sev.id = i.severity
    ORDER BY incident_date DESC;
    `,
  UPDATE_INCEDENT_STATUS: `
        UPDATE incidents SET status = ? WHERE id = ?;
    `,
};

module.exports = { incidentQueries };
