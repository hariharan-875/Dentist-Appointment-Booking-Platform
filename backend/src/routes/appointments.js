const express = require('express')
const { z } = require('zod')
const { all, get, run } = require('../db')
const { ok, fail } = require('../lib/http')

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const rows = await all(
      `SELECT
         a.id,
         a.patientName,
         a.age,
         a.gender,
         a.appointmentDate,
         a.createdAt,
         d.id AS dentistId,
         d.name AS dentistName,
         d.clinicName AS clinicName
       FROM appointments a
       JOIN dentists d ON d.id = a.dentistId
       ORDER BY a.appointmentDate DESC, a.id DESC`
    )
    return ok(res, rows)
  } catch (err) {
    return fail(res, 500, 'Failed to fetch appointments')
  }
})

const createAppointmentSchema = z.object({
  dentistId: z.number().int().positive(),
  patientName: z.string().trim().min(1),
  age: z.number().int().min(0).max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((v) => {
      const today = new Date()
      const yyyy = today.getFullYear()
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')
      const todayStr = `${yyyy}-${mm}-${dd}`
      return v >= todayStr
    }, 'Appointment date must be today or in the future'),
})

router.post('/', async (req, res) => {
  const parsed = createAppointmentSchema.safeParse(req.body)
  if (!parsed.success) {
    return fail(res, 400, 'Invalid appointment payload', parsed.error.flatten())
  }

  const a = parsed.data

  try {
    const dentist = await get('SELECT id FROM dentists WHERE id = ?', [
      a.dentistId,
    ])
    if (!dentist) return fail(res, 404, 'Dentist not found')

    const result = await run(
      `INSERT INTO appointments (dentistId, patientName, age, gender, appointmentDate)
       VALUES (?, ?, ?, ?, ?)`,
      [a.dentistId, a.patientName, a.age, a.gender, a.appointmentDate]
    )

    return ok(res, { id: result.lastID })
  } catch (err) {
    return fail(res, 500, 'Failed to create appointment')
  }
})

module.exports = router

