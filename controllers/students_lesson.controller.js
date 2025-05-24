const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const newGroup = await pool.query(
      `
      INSERT INTO "student_lesson"( lesson_id, student_id, is_there, reason, be_paid)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [lesson_id, student_id, is_there, reason, be_paid]
    );
    console.log(newGroup);

    res.status(201).send(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const student_lesson = await pool.query(`select * from "student_lesson" `);
    console.log(student_lesson);
    res.status(200).send(student_lesson.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const student_lesson = await pool.query(
      `select FROM "student_lesson" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(student_lesson);
    res.status(200).send(student_lesson.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const student_lesson = await pool.query(
      `DELETE FROM "student_lesson" WHERE id = $1`,
      [id]
    );

    if (student_lesson.rowCount === 0) {
      return res.status(404).json({ message: "student_lesson not found" });
    }

    res.status(200).json(student_lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const { id } = req.params;

    const updateGroup = await pool.query(
      `UPDATE "student_lesson"
        SET lesson_id = $1
        SET student_id = $2
        SET is_there = $3
        SET reason = $4
        SET be_paid = $5
        WHERE id = $6
        RETURNING *
      `,
      [lesson_id, student_id, is_there, reason, be_paid, id]
    );

    if (updateGroup.rowCount === 0) {
      return res.status(404).json({ message: "student_lesson not found" });
    }

    res.status(200).json(updateGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
