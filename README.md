# PrimeCare Mock API + Postman Collection

Your PrimeCare system currently has no real backend — `db.js` uses `localStorage`
in the browser. This package gives you an actual server that implements the
endpoints documented in **Chapter 8 (API Design and Integration)** of your
project documentation, so you can generate real request/response screenshots
for **Appendix H (Postman Results)**.

## 1. Requirements
- Node.js installed (v16+)

## 2. Run the server
```
npm install
npm start
```
You should see:
```
PrimeCare mock API running at http://localhost:3000
```
Leave this terminal window open while you test in Postman.

## 3. Import into Postman
1. Open Postman → **Import**
2. Select `PrimeCare.postman_collection.json`
3. You'll see a collection called **PrimeCare Clinic API** with two folders:
   - **Patients** — GET all patients, GET patient by ID
   - **Appointments** — GET all, GET by ID, POST book, PUT update status, DELETE cancel

The collection already points at `http://localhost:3000` via the `baseUrl`
variable, and uses `APT-2026-0021` / `P-001` as example IDs (matching the
seed data below). Change these collection variables if you want to test a
different appointment or patient.

## 4. Suggested order for your Postman screenshots (Appendix H)
1. **GET all patients** — `/api/patients`
2. **GET patient by ID** — `/api/patients/P-001`
3. **GET all appointments** — `/api/appointments`
4. **GET appointment by ID** — `/api/appointments/APT-2026-0021`
5. **POST book new appointment** — `/api/appointments/book` (creates a new appointment, e.g. `APT-3022`)
6. **PUT update appointment status** — `/api/appointments/APT-2026-0021` with body `{ "status": "confirmed" }`
7. **DELETE cancel appointment** — `/api/appointments/APT-2026-0018`

For each screenshot, capture: the HTTP method + URL, the request body (for
POST/PUT), the response body, and the status code shown in Postman.

## 5. Seed data
The server starts with:
- Patients: `P-001` (Adrian Lei Frio), `P-002` (Maria Santos)
- Appointments: `APT-2026-0018` (complete), `APT-2026-0021` (pending)

Data resets every time you restart the server (`npm start`), since it's kept
in memory — this is intentional, so your test run is always repeatable and
matches this README.

## 6. Files in this package
- `server.js` — the Express API server
- `package.json` — dependencies (`express`, `cors`)
- `PrimeCare.postman_collection.json` — the Postman collection to import
