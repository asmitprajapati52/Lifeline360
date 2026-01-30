import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import EmergencyModal from './components/EmergencyModal';
import PublicDashboard from './components/PublicDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import AmbulanceDashboard from './components/AmbulanceDashboard';
import { initialHospitals, initialAmbulances, initialRequests } from './data/initialData';
import { db } from './services/firebase';
import { getHospitals, getRequests, getAmbulances } from "./services/firestoreService";


export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);
 const [hospitals, setHospitals] = useState([]);
const [ambulances, setAmbulances] = useState([]);
const [requests, setRequests] = useState([]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [emergencyDetails, setEmergencyDetails] = useState(null);
  const [filters, setFilters] = useState({ icuBeds: false, ventilators: false, oxygen: false, bloodGroup: '', budget: 'all' });

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentPage(role === 'public' ? 'public' : role === 'hospital' ? 'hospital' : 'ambulance');
  };

  

  const handleLogout = () => {
    setCurrentPage('login');
    setUserRole(null);
  };

useEffect(() => {
  const loadData = async () => {
    try {
      const hospitalData = await getHospitals();
      const requestData = await getRequests();
      const ambulanceData = await getAmbulances();

      setHospitals(hospitalData);
      setRequests(requestData);
      setAmbulances(ambulanceData);

    } catch (error) {
      console.error("Firestore load error:", error);
    }
  };

  loadData();
}, []);

  return (
    <div>
      {showEmergencyModal && (
        <EmergencyModal 
          hospitals={hospitals}
          ambulances={ambulances}
          setRequests={setRequests}
          emergencySubmitted={emergencySubmitted}
          setEmergencySubmitted={setEmergencySubmitted}
          emergencyDetails={emergencyDetails}
          setEmergencyDetails={setEmergencyDetails}
          onClose={() => setShowEmergencyModal(false)}
        />
      )}
      
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {currentPage === 'public' && (
        <PublicDashboard 
          hospitals={hospitals}
          filters={filters}
          setFilters={setFilters}
          onLogout={handleLogout}
          onEmergencyClick={() => setShowEmergencyModal(true)}
        />
      )}
      
      {currentPage === 'hospital' && (
        <HospitalDashboard 
          hospitals={hospitals}
          setHospitals={setHospitals}
          requests={requests}
          setRequests={setRequests}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'ambulance' && (
        <AmbulanceDashboard 
          ambulances={ambulances}
          requests={requests}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}