/* ================================================
   PRIMECARE — Mock REST API Server
   Mirrors the API design in Chapter 8 of the
   PrimeCare Final Project Documentation, so the
   documented endpoints can actually be hit from
   Postman (GET / POST / PUT / DELETE) instead of
   only existing as localStorage calls in db.js.
   ================================================ */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ── In-memory "database" (seeded to match db.js demo data) ── */

let patients = [
  {
    patient_id: 'P-001',
    name: 'Adrian Lei Frio',
    username: 'adrianfrio',
    email: 'patient@primecare.ph',
    contact: '+63 912 345 6789',
    address: 'Las Pinas City, Metro Manila',
    blood: 'O+',
  },
  {
    patient_id: 'P-002',
    name: 'Maria Santos',
    username: 'mariasantos',
    email: 'maria.santos@example.com',
    contact: '+63 917 555 1234',
    address: 'Muntinlupa City, Metro Manila',
    blood: 'A+',
  },
];

let appointments = [
  {
    appointment_id: 'APT-2026-0018',
    patient_id: 'P-001',
    doctor: 'Dr. John Buena',
    service: 'Orthopedics',
    date: '2026-01-02',
    time: '10:00 AM',
    mode: 'Face-to-Face',
    status: 'complete',
    fee: 800,
    payment_method: 'GCash',
    transaction_id: 'TXN-88421',
  },
  {
    appointment_id: 'APT-2026-0021',
    patient_id: 'P-001',
    doctor: 'Dr. John Buena',
    service: 'Orthopedics',
    date: '2026-02-10',
    time: '9:00 AM',
    mode: 'Face-to-Face',
    status: 'pending',
    fee: 800,
    payment_method: 'Card',
    transaction_id: 'TXN-90112',
  },
];

let apptCounter = 3022;

/* ── Helpers ── */

function findAppointment(id) {
  return appointments.find(a => a.appointment_id === id);
}

function findPatient(id) {
  return patients.find(p => p.patient_id === id);
}

/* ── Root ── */

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'PrimeCare mock API is running.',
    endpoints: [
      'GET    /api/patients',
      'GET    /api/patients/:id',
      'GET    /api/appointments',
      'GET    /api/appointments/:id',
      'POST   /api/appointments/book',
      'PUT    /api/appointments/:id',
      'DELETE /api/appointments/:id',
    ],
  });
});

/* ── PATIENTS ── */

// GET all patients
app.get('/api/patients', (req, res) => {
  res.json({ status: 'success', data: patients });
});

// GET patient by ID
app.get('/api/patients/:id', (req, res) => {
  const patient = findPatient(req.params.id);
  if (!patient) {
    return res.status(404).json({ status: 'error', message: 'Patient not found.' });
  }
  res.json({ status: 'success', data: patient });
});

/* ── APPOINTMENTS ── */

// GET all appointments
app.get('/api/appointments', (req, res) => {
  res.json({ status: 'success', data: appointments });
});

// GET appointment by ID
app.get('/api/appointments/:id', (req, res) => {
  const appt = findAppointment(req.params.id);
  if (!appt) {
    return res.status(404).json({ status: 'error', message: 'Appointment not found.' });
  }
  res.json({ status: 'success', data: appt });
});

// POST — book a new appointment
app.post('/api/appointments/book', (req, res) => {
  const {
    patient_id,
    patient_name,
    doctor_id,
    doctor,
    service,
    appointment_date,
    appointment_time,
    mode,
    payment_method,
    amount,
  } = req.body;

  if (!patient_id || !appointment_date || !appointment_time) {
    return res.status(400).json({
      status: 'error',
      message: 'patient_id, appointment_date, and appointment_time are required.',
    });
  }

  const newAppt = {
    appointment_id: 'APT-' + apptCounter++,
    patient_id,
    patient_name: patient_name || null,
    doctor_id: doctor_id || null,
    doctor: doctor || null,
    service: service || null,
    date: appointment_date,
    time: appointment_time,
    mode: mode || 'Face-to-Face',
    status: 'pending',
    fee: amount || 0,
    payment_method: payment_method || 'card',
    transaction_id: 'TXN-' + Math.floor(Math.random() * 90000 + 10000),
  };

  appointments.push(newAppt);

  res.status(201).json({
    booking_status: 'success',
    appointment_id: newAppt.appointment_id,
    transaction_id: newAppt.transaction_id,
    payment_status: 'paid',
  });
});

// PUT — update appointment status
app.put('/api/appointments/:id', (req, res) => {
  const appt = findAppointment(req.params.id);
  if (!appt) {
    return res.status(404).json({ status: 'error', message: 'Appointment not found.' });
  }
  if (!req.body.status) {
    return res.status(400).json({ status: 'error', message: 'status is required in the request body.' });
  }
  appt.status = req.body.status;
  res.json({
    status: 'success',
    message: `Appointment status updated to ${appt.status}.`,
  });
});

// DELETE — cancel appointment
app.delete('/api/appointments/:id', (req, res) => {
  const appt = findAppointment(req.params.id);
  if (!appt) {
    return res.status(404).json({ status: 'error', message: 'Appointment not found.' });
  }
  appt.status = 'cancelled';
  res.json({
    status: 'success',
    message: 'Appointment has been cancelled.',
  });
});

/* ── 404 fallback ── */

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`PrimeCare mock API running at http://localhost:${PORT}`);
});
