const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const newLesson = await pool.query(
      `
      INSERT INTO "lesson"(
     lesson_theme, lesson_number, group_id, lesson_date)
      VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );
    console.log(newLesson);

    res.status(201).send(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const lesson = await pool.query(`select * from "lesson" `);
    console.log(lesson);
    res.status(200).send(lesson.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const lesson = await pool.query(
      `select FROM "lesson" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(lesson);
    res.status(200).send(lesson.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const lesson = await pool.query(`DELETE FROM "lesson" WHERE id = $1`, [id]);

    if (lesson.rowCount === 0) {
      return res.status(404).json({ message: "lesson not found" });
    }

    res.status(200).json(lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;
    const { id } = req.params;

    const updateLesson = await pool.query(
      `UPDATE "lesson"
        SET lesson_theme = $1
        SET lesson_number = $2
        SET group_id = $3
        SET lesson_date = $4
        WHERE id = $5
        RETURNING *
      `,
      [lesson_theme, lesson_number, group_id, lesson_date, id]
    );

    if (updateLesson.rowCount === 0) {
      return res.status(404).json({ message: "lesson not found" });
    }

    res.status(200).json(updateLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
