const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_student,
    } = req.body;

    const newPayment = await pool.query(
      `
      INSERT INTO "payment"(
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_student)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_student,
      ]
    );
    console.log(newPayment);

    res.status(201).send(newPayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const payment = await pool.query(`select * from "payment" `);
    console.log(payment);
    res.status(200).send(payment.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await pool.query(
      `select FROM "payment" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(payment);
    res.status(200).send(payment.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const payment = await pool.query(`DELETE FROM "payment" WHERE id = $1`, [
      id,
    ]);

    if (payment.rowCount === 0) {
      return res.status(404).json({ message: "payment not found" });
    }

    res.status(200).json(payment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_student,
    } = req.body;
    const { id } = req.params;

    const updatePayment = await pool.query(
      `UPDATE "payment"
        SET student_id = $1
        SET payment_last_date = $2
        SET payment_date = $3
        SET price = $4
        SET is_paid = $5
        SET total_student = $6
        WHERE id = $7
        RETURNING *
      `,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_student,
        id,
      ]
    );

    if (updatePayment.rowCount === 0) {
      return res.status(404).json({ message: "payment not found" });
    }

    res.status(200).json(updatePayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
