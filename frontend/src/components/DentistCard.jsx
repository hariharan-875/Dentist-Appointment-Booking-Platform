export function DentistCard({ dentist, onBook }) {
  const {
    name,
    photoUrl,
    qualification,
    experienceYears,
    clinicName,
    address,
    location,
  } = dentist

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-600">
              {name?.slice(0, 2)?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-semibold text-slate-900">
            {name}
          </div>
          <div className="mt-1 text-sm text-slate-600">{qualification}</div>
          <div className="mt-1 text-sm text-slate-600">
            {experienceYears} years experience
          </div>
        </div>
      </div>

      <div className="space-y-1 border-t border-slate-100 px-4 py-3 text-sm">
        <div className="font-medium text-slate-900">{clinicName}</div>
        <div className="text-slate-600">{address}</div>
        <div className="text-slate-600">{location}</div>
      </div>

      <div className="border-t border-slate-100 p-4">
        <button
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-950"
          onClick={() => onBook(dentist)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}

