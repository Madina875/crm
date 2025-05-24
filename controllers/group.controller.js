const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lessons_quantity,
    } = req.body;

    const newGroup = await pool.query(
      `
      INSERT INTO "group"(
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lessons_quantity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
      `,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lessons_quantity,
      ]
    );
    console.log(newGroup);

    res.status(201).send(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const group = await pool.query(`select * from "group" `);
    console.log(group);
    res.status(200).send(group.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await pool.query(
      `select FROM "group" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(group);
    res.status(200).send(group.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const group = await pool.query(`DELETE FROM "group" WHERE id = $1`, [id]);

    if (group.rowCount === 0) {
      return res.status(404).json({ message: "group not found" });
    }

    res.status(200).json(group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lessons_quantity,
    } = req.body;
    const { id } = req.params;

    const updateGroup = await pool.query(
      `UPDATE "group"
        SET name = $1
        SET lesson_start_time = $2
        SET lesson_end_time = $3
        SET lesson_week_day = $4
        SET stage_id = $5
        SET branch_id = $6
        SET room_floor = $7
        SET room = $8
        SET lessons_quantity = $9
        WHERE id = $10
        RETURNING *
      `,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lessons_quantity,
        id,
      ]
    );

    if (updateGroup.rowCount === 0) {
      return res.status(404).json({ message: "group not found" });
    }

    res.status(200).json(updateGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
