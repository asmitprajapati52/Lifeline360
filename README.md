# LifeLine360 - Emergency Healthcare & Ambulance Management System

A modern, beautiful web application for managing emergency healthcare services, hospital resources, and ambulance dispatch.

## Features

✅ **Public Dashboard**
- Search nearby hospitals with real-time resource availability
- Filter by ICU beds, ventilators, oxygen levels, blood groups, and budget
- Submit emergency requests with automatic hospital and ambulance assignment

✅ **Hospital Admin Dashboard**
- Update hospital resources (ICU beds, ventilators, oxygen levels)
- View and manage incoming emergency requests
- Accept or reject emergency requests

✅ **Ambulance Dashboard**
- View assigned emergencies
- Track patient details and destination hospitals
- Call patient and view route options

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Installation

1. **Clone or create the project:**
```bash
mkdir lifeline360
cd lifeline360
```

2. **Create all the files** as shown in the structure above

3. **Install dependencies:**
```bash
npm install
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open browser:**
```
http://localhost:5173
```

## Usage

### Login Options:
- **Public User** - Search hospitals and submit emergency requests
- **Hospital Admin** - Manage resources and emergency requests
- **Ambulance Driver** - View assigned emergencies

### Demo Flow:
1. Login as Public User
2. Click "SOS Emergency" button
3. Fill emergency request form
4. Submit request
5. Logout and login as Hospital Admin
6. View and accept/reject the request
7. Logout and login as Ambulance Driver
8. View assigned emergency

## Build for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Project Structure
```
lifeline360/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   ├── EmergencyModal.jsx
│   │   ├── PublicDashboard.jsx
│   │   ├── HospitalDashboard.jsx
│   │   └── AmbulanceDashboard.jsx
│   ├── data/
│   │   └── initialData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## License
This project is licensed under the MIT License © 2026 Asmit Prajapati


## Author

Asmit Prajapati
