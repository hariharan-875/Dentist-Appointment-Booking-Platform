import { NavLink, Route, Routes } from 'react-router-dom'
import { DentistListPage } from './pages/DentistListPage'
import { AdminAppointmentsPage } from './pages/AdminAppointmentsPage'

function NavItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-semibold ${
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function App() {
  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="text-sm font-extrabold tracking-tight text-slate-900">
            Dentist Booking
          </div>
          <nav className="flex items-center gap-2">
            <NavItem to="/" end>
              Dentists
            </NavItem>
            <NavItem to="/admin">Admin</NavItem>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<DentistListPage />} />
        <Route path="/admin" element={<AdminAppointmentsPage />} />
      </Routes>
    </div>
  )
}
