const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = await pool.query(
      `
        INSERT INTO "role" (name)
        values ($1) RETURNING *
        `,
      [name]
    );
    console.log(newRole);

    res.status(201).send(newRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const role = await pool.query(`select * from "role" `);
    console.log(role);
    res.status(200).send(role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await pool.query(
      `select FROM "role" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(role);
    res.status(200).send(role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const role = await pool.query(
      `DELETE FROM "role" WHERE id = $1 RETURNING *`,
      [id]
    );

    if (role.rowCount === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updateRole = await pool.query(
      `UPDATE "role"
        SET name = $1
        WHERE id = $2
        RETURNING *
      `,
      [name, id]
    );

    if (updateRole.rowCount === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(updateRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
