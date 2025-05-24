const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { status } = req.body;
    const newStatus = await pool.query(
      `
        INSERT INTO "status" (status)
        values ($1) RETURNING *
        `,
      [status]
    );
    console.log(newStatus);

    res.status(201).send(newStatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const status = await pool.query(`select * from "status" `);
    console.log(status);
    res.status(200).send(status.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await pool.query(
      `select FROM "status" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(status);
    res.status(200).send(status.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const status = await pool.query(
      `DELETE FROM "status" WHERE id = $1 RETURNING *`,
      [id]
    );

    if (status.rowCount === 0) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json(status.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updateStatus = await pool.query(
      `UPDATE "status"
        SET status = $1
        WHERE id = $2
        RETURNING *
      `,
      [status, id]
    );

    if (updateStatus.rowCount === 0) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json(updateStatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
