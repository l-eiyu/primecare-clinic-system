# PrimeCare Medical Clinic — Appointment Booking System

> **Compassion You Can Trust, Care You Deserve**

A fully responsive, web-based appointment booking system for PrimeCare Medical Clinic, built with HTML5, CSS3, and JavaScript. Deployed on Amazon Web Services (AWS).

---

## Project Overview

The **PrimeCare Medical Clinic Appointment Booking System** is a front-end web prototype that digitizes and automates the appointment management process of a small medical clinic. It provides a complete patient portal and admin portal with real-time form validation, a mock localStorage database, role-based authentication, Chart.js analytics, and an AWS cloud deployment architecture.

This project was developed as a **Final Project** for the subject **Software Design** at **BS Computer Engineering**, demonstrating the full progression from Figma UI/UX design → HTML structure → fully styled and functional web application → AWS cloud deployment.

---

## Live Demo

| Platform | URL |
|---|---|
| **AWS S3** | http://primecare-clinic-website.s3-website-ap-southeast-1.amazonaws.com |
| **GitHub Pages** | https://YOURUSERNAME.github.io/primecare-clinic |
| **CloudFront (HTTPS)** | https://[your-cloudfront-id].cloudfront.net |

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Patient** | patient@primecare.ph | patient123 |
| **Admin** | admin@primecare.ph | admin123 |

> If login doesn't work, clear your browser's localStorage first: F12 → Application → Local Storage → Clear All → Refresh

---

## Features

### Patient Portal
- User registration and login with role-based authentication
- Real-time password strength meter
- 3-step appointment booking flow (Select → Payment → Confirm)
- Online payment simulation (Stripe-style UI)
- Appointment history with pagination and filtering
- Appointment detail view with billing breakdown
- SMS notification simulation
- In-app notification center with unread badges
- Patient-to-clinic messaging system
- Profile management with photo upload
- Account settings
- Toast notifications for all actions
- Breadcrumb navigation
- Back to top button

### Admin Portal
-  Secure role-based admin login
-  Admin dashboard with real-time stats
-  Appointment confirmation and cancellation with modals
-  Patient records with search and pagination
-  Doctor management and schedules
-  Admin-to-patient messaging
-  Full analytics reports page with 4 charts

### Data Visualization (Chart.js)
-  Bar Graph — Monthly Appointments
-  Pie/Donut Chart — Appointment Status Distribution
-  Line Graph — Monthly Revenue Trend
-  Horizontal Bar — Appointments by Service
-  Mini charts on admin dashboard

### Public Landing Page
-  Hero section with clinic info
-  About section
-  Services with fees
-  Doctor profiles with clickable modals
-  How It Works (step-by-step)
-  Testimonials
-  FAQ accordion
-  Contact form with Google Maps embed
-  Cookie consent banner
-  Social media links

---

## Project Structure

```
primecare/
│
├── index.html                — Public landing page
├── login.html                — Patient login
├── signup.html               — Patient registration
├── forgot-password.html      — Password recovery
├── home.html                 — Patient dashboard
├── appointments.html         — Appointment list + pagination
├── appointment-detail.html   — Appointment details
├── book-appointment.html     — 3-step booking flow
├── messages.html             — Patient messaging
├── notifications.html        — Notification center
├── settings.html             — Account settings
├── profile.html              — Patient profile
├── terms.html                — Terms of Service
├── privacy.html              — Privacy Policy
├── 404.html                  — Error page
│
├── admin-login.html          — Admin login
├── admin-dashboard.html      — Admin dashboard + mini charts
├── admin-appointments.html   — Appointment management
├── admin-patients.html       — Patient records
├── admin-doctors.html        — Doctor management
├── admin-messages.html       — Admin messaging
├── admin-reports.html        — Analytics + all charts
│
├──  style.css                 — Main stylesheet (patient-facing)
├──  admin.css                 — Admin portal stylesheet
│
├──  db.js                     — Mock database (localStorage)
├──  auth.js                   — Patient auth guard
├──  admin-auth.js             — Admin auth guard
├──  toast.js                  — Toast notification system
│
└──  assets/
    ├── clinic-bg.jpg
    ├── clinic-front.jpg
    ├── clinic-inside.jpg
    ├── doctor-buena.jpg
    ├── doctor-santos.jpg
    └── doctor-gole.jpg
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, Flexbox, Grid, animations, media queries |
| **JavaScript (ES6)** | Interactivity, DOM manipulation, API calls |
| **localStorage API** | Client-side mock database |
| **Chart.js** | Data visualization (bar, pie, line charts) |
| **Google Fonts** | Nunito + Inter typography |
| **AWS S3** | Static website hosting |
| **AWS CloudFront** | CDN + HTTPS delivery |
| **AWS IAM** | Secure access control |
| **AWS CloudWatch** | Monitoring and metrics |
| **AWS SES** | Email notifications |
| **AWS SNS** | SMS notifications |
| **AWS Certificate Manager** | SSL/TLS certificate |

---

## API Integrations

| API | Purpose | Status |
|---|---|---|
| **Google Maps** | Clinic location embed | Active |
| **Postman API** | Serves as the Backend Server | Active |

---

## AWS Architecture

```
User → Route 53 → CloudFront (HTTPS) → S3 (Static Files)
                        ↓
              Certificate Manager (SSL)
                        ↓
              CloudWatch (Monitoring)
                        ↓
              SES (Emails) + SNS (SMS)
```

**S3 Bucket:** `primecare-clinic-website`
**AWS Region:** `ap-southeast-1` (Singapore)

---

## Responsive Design

The system is fully responsive across:
-  Desktop (1200px+)
-  Laptop (1024px)
-  Tablet (768px)
-  Mobile (480px and below)

Implemented using CSS Media Queries, Flexbox, and CSS Grid.

---

## Security Features

- Role-based authentication (Patient vs Admin)
- Session management via localStorage
- Auto-redirect for unauthorized page access
- Password strength enforcement
- HTTPS via AWS Certificate Manager
- Philippine Data Privacy Act (RA 10173) compliant
- Terms of Service and Privacy Policy pages

---

## How to Run Locally

1. Download or clone this repository:
```bash
git clone https://github.com/l-eiyu/primecare-clinic.git
```

2. Open the project folder:
```bash
cd primecare-clinic
```

3. Open `index.html` in your browser using **Live Server** (VS Code extension) or simply double-click the file.

4. To test the system:
   - **Patient login:** patient@primecare.ph / patient123
   - **Admin login:** admin@primecare.ph / admin123

> If pages redirect incorrectly, clear localStorage: F12 → Application → Local Storage → Clear All

---



### Landing Page
*(Attach screenshot here)*

### Patient Dashboard
*(Attach screenshot here)*

### Appointment Booking
*(Attach screenshot here)*

### Admin Dashboard
*(Attach screenshot here)*

### Analytics / Reports
*(Attach screenshot here)*

---

## Documentation

Full project documentation (16 chapters) covering:
- Background of the Study
- Review of Related Literature
- Feasibility Study
- Requirements Analysis
- Figma Design and Wireframes
- Object-Oriented Design (UML, Use Case, Sequence, Activity)
- Data Modeling (ERD, Schema, Data Dictionary)
- API Design and Integration
- Source Code Documentation
- Data Mining Integration
- Data Visualization
- Software QA and Testing
- Deployment and Hosting
- Security and Privacy
- Maintenance and Future Enhancements
- Conclusion

---

## Developer

| Field | Info |
|---|---|
| **Name** | Frio, Adrian Lei C. |
| **Course** | BS Computer Engineering — 2nd Year |
| **Subject** | Software Design LEC (53106) |
| **Instructor** | Engr. John Pio Anthony Buena, CCpE |
| **Academic Year** | 2025 – 2026 |

---

## License

This project was developed for academic purposes as a Final Project requirement for the Software Design subject. All rights reserved © 2026 PrimeCare Medical Clinic.

---

> Built by Adrian Lei C. Frio
