process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit();
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "backend/config.env" });

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connection create successfully."))
  .catch((err) => console.log("connection not created", err));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Application run on the server ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
