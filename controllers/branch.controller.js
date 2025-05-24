const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;
    const newBranch = await pool.query(
      `
        INSERT INTO branch (name,address,call_number)
        values ($1,$2,$3) RETURNING *
        `,
      [name, address, call_number]
    );
    console.log(newBranch);

    res.status(201).send(newBranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const branch = await pool.query(`select * from branch `);
    console.log(branch);
    res.status(200).send(branch.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const branch = await pool.query(
      "select FROM branch WHERE id = $1 RETURNING *",
      [id]
    );
    console.log(branch);
    res.status(200).send(branch.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const branch = await pool.query(
      "DELETE FROM branch WHERE id = $1",
      [id]
    );

    if (branch.rowCount === 0) {
      return res.status(404).json({ message: "branch not found" });
    }

    res.status(200).json(branch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updateBranch = await pool.query(
      `UPDATE branch
        SET name = $1
        WHERE id = $2
        RETURNING *
      `,
      [name, id]
    );

    if (updateBranch.rowCount === 0) {
      return res.status(404).json({ message: "branch not found" });
    }

    res.status(200).json(updateBranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
