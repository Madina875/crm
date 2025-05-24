const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const newLid = await pool.query(
      `
      INSERT INTO "lid"(
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
      `,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reason_id,
      ]
    );
    console.log(newLid);

    res.status(201).send(newLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const lid = await pool.query(`select * from "lid" `);
    console.log(lid);
    res.status(200).send(lid.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const lid = await pool.query(
      `select FROM "lid" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(lid);
    res.status(200).send(lid.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const lid = await pool.query(`DELETE FROM "lid" WHERE id = $1`, [id]);

    if (lid.rowCount === 0) {
      return res.status(404).json({ message: "lid not found" });
    }

    res.status(200).json(lid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;
    const { id } = req.params;

    const updateLid = await pool.query(
      `UPDATE "lid"
        SET first_name = $1
        SET last_name = $2
        SET phone_number = $3
        SET target_id = $4
        SET lid_stage_id = $5
        SET test_date = $6
        SET trial_lesson_date = $7
        SET trial_lesson_time = $8
        SET trial_lesson_group_id = $9
        SET lid_status_id = $10
        SET cancel_reason_id = $11
        WHERE id = $12
        RETURNING *
      `,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reason_id,
        id,
      ]
    );

    if (updateLid.rowCount === 0) {
      return res.status(404).json({ message: "lid not found" });
    }

    res.status(200).json(updateLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
