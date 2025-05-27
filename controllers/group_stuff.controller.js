const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const newGroupStuff = await pool.query(
      `
        INSERT INTO group_stuff (group_id, stuff_id)
        values ($1,$2) RETURNING *
        `,
      [group_id, stuff_id]
    );
    console.log(newGroupStuff);

    res.status(201).send(newGroupStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const group_stuff = await pool.query(`select * from group_stuff `);
    console.log(group_stuff);
    res.status(200).send(group_stuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const group_stuff = await pool.query(
      "select FROM group_stuff WHERE id = $1 RETURNING *",
      [id]
    );
    console.log(group_stuff);
    res.status(200).send(group_stuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const group_stuff = await pool.query(
      "DELETE FROM group_stuff WHERE id = $1",
      [id]
    );

    if (group_stuff.rowCount === 0) {
      return res.status(404).json({ message: "group_stuff not found" });
    }

    res.status(200).json(group_stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const { id } = req.params;

    const updateGroupStuff = await pool.query(
      `UPDATE group_stuff
        SET group_id = $1
        SET stuff_id = $2
        WHERE id = $3
        RETURNING *
      `,
      [group_id, stuff_id, id]
    );

    if (updateGroupStuff.rowCount === 0) {
      return res.status(404).json({ message: "group_stuff not found" });
    }

    res.status(200).json(updateGroupStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
