const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH =
    process.env.SQLITE_DB_PATH ||
    path.join(__dirname, "..", "..", "db", "app.db");

const db = new sqlite3.Database(DB_PATH);

// run query
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) return reject(err);
            resolve({
                lastID: this.lastID,
                changes: this.changes,
            });
        });
    });
}

// get single row
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

// get multiple rows
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = { db, DB_PATH, run, get, all };