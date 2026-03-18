const { run } = require('./index')

async function initDb() {
  await run(`
    CREATE TABLE IF NOT EXISTS dentists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      photoUrl TEXT,
      qualification TEXT NOT NULL,
      experienceYears INTEGER NOT NULL,
      clinicName TEXT NOT NULL,
      address TEXT NOT NULL,
      location TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  await run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dentistId INTEGER NOT NULL,
      patientName TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      appointmentDate TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  await run(
    'CREATE INDEX IF NOT EXISTS idx_appointments_dentistId ON appointments(dentistId)'
  )
  await run(
    'CREATE INDEX IF NOT EXISTS idx_appointments_appointmentDate ON appointments(appointmentDate)'
  )
}

module.exports = { initDb }

