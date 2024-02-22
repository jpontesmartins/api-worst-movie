const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./movies.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE movie
  (
    id          INTEGER PRIMARY KEY,
    year        INT,
    title       VARCHAR(200),
    studios     VARCHAR(200),
    producers   VARCHAR(200),
    winner      VARCHAR(5)
  )
`);
}

module.exports = connectToDatabase();