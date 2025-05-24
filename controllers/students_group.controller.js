const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;

    const newGroup = await pool.query(
      `
      INSERT INTO "student_group"(student_id, group_id)
      VALUES ($1, $2) RETURNING *
      `,
      [student_id, group_id]
    );
    console.log(newGroup);

    res.status(201).send(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const group = await pool.query(`select * from "student_group" `);
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
      `select FROM "student_group" WHERE id = $1 RETURNING *`,
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

    const group = await pool.query(
      `DELETE FROM "student_group" WHERE id = $1`,
      [id]
    );

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
    const { student_id, group_id } = req.body;
    const { id } = req.params;

    const updateGroup = await pool.query(
      `UPDATE "student_group"
        SET  student_id= $1
        SET group_id = $2
        WHERE id = $3
        RETURNING *
      `,
      [student_id, group_id, id]
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
