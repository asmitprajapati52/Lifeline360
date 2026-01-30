import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc
} from "firebase/firestore";

/* ================================
   Fetch Hospitals
================================ */
export const getHospitals = async () => {
  const snapshot = await getDocs(collection(db, "hospitals"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/* ================================
   Fetch Ambulances
================================ */
export const getAmbulances = async () => {
  const snapshot = await getDocs(collection(db, "ambulances"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/* ================================
   Fetch Emergency Requests
================================ */
export const getRequests = async () => {
  const snapshot = await getDocs(collection(db, "emergencies"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/* ================================
   Update Hospital Resources
================================ */
export const updateHospital = async (hospitalId, data) => {
  const ref = doc(db, "hospitals", hospitalId);
  await updateDoc(ref, data);
};

/* ================================
   Update Emergency Request Status
================================ */
export const updateRequestStatus = async (requestId, status) => {
  const ref = doc(db, "emergencies", requestId);
  await updateDoc(ref, { status });
};

/* ================================
   Create Emergency Request
================================ */
export const createEmergencyRequest = async (data) => {
  await addDoc(collection(db, "emergencies"), data);
};

/* ================================
   Alias for emergencyService.js
================================ */
export const createEmergency = async (data) => {
  await addDoc(collection(db, "emergencies"), data);
};
