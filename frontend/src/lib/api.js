async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await res.json().catch(() => null)
  if (!res.ok) {
    const message = json?.error?.message || 'Request failed'
    const details = json?.error?.details
    const err = new Error(message)
    err.details = details
    throw err
  }

  return json?.data
}

export function getDentists() {
  return request('/api/dentists')
}

export function createAppointment(payload) {
  return request('/api/appointments', { method: 'POST', body: payload })
}

export function getAppointments() {
  return request('/api/appointments')
}

