const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH =
    process.env.SQLITE_DB_PATH ||
    path.join(__dirname, "..", "..", "db", "app.db");

const db = new Database(DB_PATH);

// run query
function run(sql, params = []) {
    const stmt = db.prepare(sql);
    const result = stmt.run(params);
    return Promise.resolve({
        lastID: result.lastInsertRowid,
        changes: result.changes,
    });
}

// get single row
function get(sql, params = []) {
    const stmt = db.prepare(sql);
    const row = stmt.get(params);
    return Promise.resolve(row);
}

// get multiple rows
function all(sql, params = []) {
    const stmt = db.prepare(sql);
    const rows = stmt.all(params);
    return Promise.resolve(rows);
}

module.exports = { db, DB_PATH, run, get, all };