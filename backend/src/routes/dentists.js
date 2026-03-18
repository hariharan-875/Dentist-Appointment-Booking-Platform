const express = require('express')
const { z } = require('zod')
const { all, run } = require('../db')
const { ok, fail } = require('../lib/http')

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const dentists = await all(
      `SELECT id, name, photoUrl, qualification, experienceYears, clinicName, address, location
       FROM dentists
       ORDER BY id DESC`
    )
    return ok(res, dentists)
  } catch (err) {
    return fail(res, 500, 'Failed to fetch dentists')
  }
})

const createDentistSchema = z.object({
  name: z.string().trim().min(1),
  photoUrl: z.string().trim().url().optional().or(z.literal('')),
  qualification: z.string().trim().min(1),
  experienceYears: z.number().int().min(0).max(80),
  clinicName: z.string().trim().min(1),
  address: z.string().trim().min(1),
  location: z.string().trim().min(1),
})

router.post('/', async (req, res) => {
  const parsed = createDentistSchema.safeParse(req.body)
  if (!parsed.success) {
    return fail(res, 400, 'Invalid dentist payload', parsed.error.flatten())
  }

  const d = parsed.data
  const photoUrl = d.photoUrl || null

  try {
    const result = await run(
      `INSERT INTO dentists (name, photoUrl, qualification, experienceYears, clinicName, address, location)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        d.name,
        photoUrl,
        d.qualification,
        d.experienceYears,
        d.clinicName,
        d.address,
        d.location,
      ]
    )

    return ok(res, { id: result.lastID })
  } catch (err) {
    return fail(res, 500, 'Failed to create dentist')
  }
})

module.exports = router

