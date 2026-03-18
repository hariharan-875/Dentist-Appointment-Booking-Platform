import { useEffect, useMemo, useState } from 'react'
import { createAppointment } from '../lib/api'
import { Alert } from './Alert'
import { Spinner } from './Spinner'

function todayStr() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function AppointmentModal({ open, onClose, dentist, onBooked }) {
  const minDate = useMemo(() => todayStr(), [])
  const [patientName, setPatientName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [appointmentDate, setAppointmentDate] = useState(minDate)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) return
    setPatientName('')
    setAge('')
    setGender('Male')
    setAppointmentDate(minDate)
    setSubmitting(false)
    setError(null)
    setSuccess(false)
  }, [open, minDate])

  if (!open || !dentist) return null

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const payload = {
        dentistId: dentist.id,
        patientName,
        age: Number(age),
        gender,
        appointmentDate,
      }
      await createAppointment(payload)
      setSuccess(true)
      onBooked?.()
      setTimeout(() => onClose?.(), 700)
    } catch (err) {
      setError(err.message || 'Failed to book appointment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900">
              Book appointment
            </div>
            <div className="mt-1 truncate text-sm text-slate-600">
              {dentist.name} • {dentist.clinicName}
            </div>
          </div>
          <button
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-4">
          {error ? <Alert variant="error" title="Booking failed">{error}</Alert> : null}
          {success ? (
            <Alert variant="success" title="Booked">
              Appointment created successfully.
            </Alert>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">
                Patient Name
              </span>
              <input
                className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">Age</span>
              <input
                className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 28"
                type="number"
                min="0"
                max="120"
                required
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">Gender</span>
              <select
                className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">
                Appointment Date
              </span>
              <input
                className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                type="date"
                min={minDate}
                required
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? <Spinner className="h-4 w-4" /> : null}
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

