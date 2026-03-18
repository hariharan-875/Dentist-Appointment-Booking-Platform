# Dentist Appointment Booking Platform (React + Express + SQLite)

## Tech
- **Frontend**: React (Vite) + Tailwind CSS + Fetch API
- **Backend**: Node.js + Express
- **DB**: SQLite (file: `backend/db/app.db`)

## Run locally

### 1) Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

Backend runs on `http://localhost:4000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

> The frontend dev server proxies `/api/*` requests to `http://localhost:4000`.

## Pages
- **User**: `http://localhost:5173/` (Dentist listing + booking modal)
- **Admin**: `http://localhost:5173/admin` (Appointments table)

## API

### Dentist APIs
- `GET /api/dentists`
- `POST /api/dentists`

Example payload:

```json
{
  "name": "Dr. Jane Doe",
  "photoUrl": "https://example.com/photo.jpg",
  "qualification": "BDS, MDS",
  "experienceYears": 7,
  "clinicName": "Smile Clinic",
  "address": "123 Main Road",
  "location": "City"
}
```

### Appointment APIs
- `POST /api/appointments`
- `GET /api/appointments`

Example payload:

```json
{
  "dentistId": 1,
  "patientName": "John",
  "age": 28,
  "gender": "Male",
  "appointmentDate": "2026-03-17"
}
```

