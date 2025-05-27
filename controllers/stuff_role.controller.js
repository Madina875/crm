const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const newStuffRole = await pool.query(
      `
        INSERT INTO stuff_role (stuff_id, role_id)
        values ($1,$2) RETURNING *
        `,
      [stuff_id, role_id]
    );
    console.log(newStuffRole);

    res.status(201).send(newStuffRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const stuff_role = await pool.query(`select * from stuff_role `);
    console.log(stuff_role);
    res.status(200).send(stuff_role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stuff_role = await pool.query(
      "select FROM stuff_role WHERE id = $1 RETURNING *",
      [id]
    );
    console.log(stuff_role);
    res.status(200).send(stuff_role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const stuff_role = await pool.query(
      "DELETE FROM stuff_role WHERE id = $1",
      [id]
    );

    if (stuff_role.rowCount === 0) {
      return res.status(404).json({ message: "stuff_role not found" });
    }

    res.status(200).json(stuff_role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const { id } = req.params;

    const updateStuffRole = await pool.query(
      `UPDATE stuff_role
        SET stuff_id = $1
        SET role_id = $2
        WHERE id = $3
        RETURNING *
      `,
      [stuff_id, role_id, id]
    );

    if (updateStuffRole.rowCount === 0) {
      return res.status(404).json({ message: "stuff_role not found" });
    }

    res.status(200).json(updateStuffRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
