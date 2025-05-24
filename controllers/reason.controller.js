const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const newReason = await pool.query(
      `
        INSERT INTO "reason" (reason_lid)
        values ($1) RETURNING *
        `,
      [reason_lid]
    );
    console.log(newReason);

    res.status(201).send(newReason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const reason = await pool.query(`select * from "reason" `);
    console.log(reason);
    res.status(200).send(reason.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const reason = await pool.query(
      `select FROM "reason" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(reason);
    res.status(200).send(reason.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const reason = await pool.query(
      `DELETE FROM "reason" WHERE id = $1 RETURNING *`,
      [id]
    );

    if (reason.rowCount === 0) {
      return res.status(404).json({ message: "Reason not found" });
    }

    res.status(200).json(reason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const { id } = req.params;

    const updateReason = await pool.query(
      `UPDATE "reason"
        SET reason_lid = $1
        WHERE id = $2
        RETURNING *
      `,
      [reason_lid, id]
    );

    if (updateReason.rowCount === 0) {
      return res.status(404).json({ message: "Reason not found" });
    }

    res.status(200).json(updateReason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
