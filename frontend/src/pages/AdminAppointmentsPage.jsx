import { useEffect, useState } from 'react'
import { getAppointments } from '../lib/api'
import { Alert } from '../components/Alert'
import { Spinner } from '../components/Spinner'

export function AdminAppointmentsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getAppointments()
      setRows(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Admin · Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            All booked appointments across dentists.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          onClick={load}
        >
          Refresh
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-700">
            <Spinner />
            Loading appointments…
          </div>
        ) : error ? (
          <Alert variant="error" title="Couldn’t load appointments">
            {error}
          </Alert>
        ) : rows.length === 0 ? (
          <Alert title="No appointments yet">
            Book an appointment from the dentist list page.
          </Alert>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Patient Name</th>
                    <th className="px-4 py-3 font-semibold">Age</th>
                    <th className="px-4 py-3 font-semibold">Gender</th>
                    <th className="px-4 py-3 font-semibold">Appointment Date</th>
                    <th className="px-4 py-3 font-semibold">Dentist</th>
                    <th className="px-4 py-3 font-semibold">Clinic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r) => (
                    <tr key={r.id} className="text-slate-800">
                      <td className="px-4 py-3 font-medium">{r.patientName}</td>
                      <td className="px-4 py-3">{r.age}</td>
                      <td className="px-4 py-3">{r.gender}</td>
                      <td className="px-4 py-3">{r.appointmentDate}</td>
                      <td className="px-4 py-3">{r.dentistName}</td>
                      <td className="px-4 py-3">{r.clinicName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

