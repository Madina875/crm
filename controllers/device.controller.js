const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
//
const DeviceDetector = require("node-device-detector");
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});
//

const add = async (req, res) => {
  try {
    const { user_id, token } = req.body;
    const userAgent = req.headers["user-agent"];
    const result = detector.detect(userAgent);
    const { device, os, client } = result;
    const newDevice = await pool.query(
      `
      INSERT INTO "device_tokens"(
      user_id,
      device,
      os,
      client,
      token)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [user_id, device, os, client, token]
    );
    console.log(newDevice);

    res.status(201).send(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const device_tokens = await pool.query(`select * from "device_tokens" `);
    console.log(device_tokens);
    res.status(200).send(device_tokens.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const device_tokens = await pool.query(
      `select FROM "device_tokens" WHERE id = $1 RETURNING *`,
      [id]
    );
    console.log(device_tokens);
    res.status(200).send(device_tokens.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const device_tokens = await pool.query(
      `DELETE FROM "device_tokens" WHERE id = $1`,
      [id]
    );

    if (device_tokens.rowCount === 0) {
      return res.status(404).json({ message: "device_tokens not found" });
    }

    res.status(200).json(device_tokens.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { name, user_id, device, os, client, token } = req.body;
    const { id } = req.params;

    const updateDevice = await pool.query(
      `UPDATE "device_tokens"
        SET name = $1
        SET user_id = $2
        SET device = $3
        SET os = $4
        SET token = $5
        WHERE id = $6
        RETURNING *
      `,
      [name, user_id, device, os, client, token, id]
    );

    if (updateDevice.rowCount === 0) {
      return res.status(404).json({ message: "device_tokens not found" });
    }

    res.status(200).json(updateDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
