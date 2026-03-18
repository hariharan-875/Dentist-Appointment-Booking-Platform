import { useEffect, useState } from 'react'
import { getDentists } from '../lib/api'
import { Alert } from '../components/Alert'
import { Spinner } from '../components/Spinner'
import { DentistCard } from '../components/DentistCard'
import { AppointmentModal } from '../components/AppointmentModal'

export function DentistListPage() {
  const [dentists, setDentists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getDentists()
      setDentists(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load dentists')
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
            Find a dentist
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Browse dentists and book an appointment in seconds.
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
            Loading dentists…
          </div>
        ) : error ? (
          <Alert variant="error" title="Couldn’t load dentists">
            {error}
          </Alert>
        ) : dentists.length === 0 ? (
          <Alert title="No dentists yet">
            Add dentists using the backend `POST /api/dentists` or run the seed
            script.
          </Alert>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dentists.map((d) => (
              <DentistCard
                key={d.id}
                dentist={d}
                onBook={(dentist) => {
                  setSelected(dentist)
                  setModalOpen(true)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AppointmentModal
        open={modalOpen}
        dentist={selected}
        onClose={() => setModalOpen(false)}
        onBooked={() => {}}
      />
    </div>
  )
}

