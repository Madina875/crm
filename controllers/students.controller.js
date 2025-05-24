const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      req.body;

    const newStudents = await pool.query(
      `
      INSERT INTO "students"(
      lid_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      male)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `,
      [lid_id, first_name, last_name, phone_number, birthday, male]
    );
    console.log(newStudents);

    res.status(201).send(newStudents.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const students = await pool.query(`select * from "students" `);
    console.log(students);
    res.status(200).send(students.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const students = await pool.query(
      `select FROM "students" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(students);
    res.status(200).send(students.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const students = await pool.query(`DELETE FROM "students" WHERE id = $1`, [
      id,
    ]);

    if (students.rowCount === 0) {
      return res.status(404).json({ message: "students not found" });
    }

    res.status(200).json(students.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      req.body;
    const { id } = req.params;

    const updateStudents = await pool.query(
      `UPDATE "students"
        SET lid_id = $1
        SET first_name = $2
        SET last_name = $3
        SET phone_number = $4
        SET birthday = $5
        SET male = $6
        WHERE id = $7
        RETURNING *
      `,
      [lid_id, first_name, last_name, phone_number, birthday, male, id]
    );

    if (updateStudents.rowCount === 0) {
      return res.status(404).json({ message: "students not found" });
    }

    res.status(200).json(updateStudents.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
