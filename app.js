const express = require("express");
const config = require("config");
const PORT = config.get("port");
const indexRouter = require("./routes/index.routes");
const app = express();

app.use(express.json());
app.use("/api", indexRouter);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
