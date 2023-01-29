const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  console.log(status);
  let result1 = `
  SELECT * FROM todo WHERE 
   status = '${status}';`;
  let subResult1 = await db.all(result1);
  response.send(subResult1);
});

app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  console.log(priority);
  response.send(priority);
});

module.exports = app;
