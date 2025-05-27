const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const newStuff = await pool.query(
      `
        INSERT INTO stuff (first_name, last_name, phone_number, login, parol, is_active)
        values ($1,$2,$3,$4,$5,$6) RETURNING *
        `,
      [first_name, last_name, phone_number, login, parol, is_active]
    );
    console.log(newStuff);

    res.status(201).send(newStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const stuff = await pool.query(`select * from stuff `);
    console.log(stuff);
    res.status(200).send(stuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stuff = await pool.query(
      "select FROM stuff WHERE id = $1 RETURNING *",
      [id]
    );
    console.log(stuff);
    res.status(200).send(stuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const stuff = await pool.query("DELETE FROM stuff WHERE id = $1", [id]);

    if (stuff.rowCount === 0) {
      return res.status(404).json({ message: "stuff not found" });
    }

    res.status(200).json(stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const { id } = req.params;

    const updateStuff = await pool.query(
      `UPDATE stuff
        SET first_name = $1
        SET last_name = $2
        SET phone_number = $3
        SET login = $4
        SET parol = $5
        SET is_active = $6
        WHERE id = $7
        RETURNING *
      `,
      [first_name, last_name, phone_number, login, parol, is_active, id]
    );

    if (updateStuff.rowCount === 0) {
      return res.status(404).json({ message: "stuff not found" });
    }

    res.status(200).json(updateStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
