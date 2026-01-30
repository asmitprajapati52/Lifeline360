import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC854m-ARCmsj-gUKhywzmyuro2uTgJqDk",
  authDomain: "lifeline360-17d8a.firebaseapp.com",
  projectId: "lifeline360-17d8a",
  storageBucket: "lifeline360-17d8a.firebasestorage.app",
  messagingSenderId: "894639205623",
  appId: "1:894639205623:web:e32e508e6b23a70e1777f2",
  measurementId: "G-NNHEYF473M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ambulance data
const ambulances = [
  { id: "AMB-001", vehicleNo: "AMB-001", driver: "Rahul Sharma", status: "available" },
  { id: "AMB-002", vehicleNo: "AMB-002", driver: "Amit Verma", status: "on-duty" },
  { id: "AMB-003", vehicleNo: "AMB-003", driver: "Suresh Kumar", status: "available" },
  { id: "AMB-004", vehicleNo: "AMB-004", driver: "Vikas Singh", status: "available" },
  { id: "AMB-005", vehicleNo: "AMB-005", driver: "Rohit Yadav", status: "on-duty" }
];

// Upload function
async function uploadAmbulances() {
  try {
    for (const amb of ambulances) {
      const ref = doc(collection(db, "ambulances"), amb.id);
      await setDoc(ref, amb);
      console.log(`✅ Uploaded ${amb.vehicleNo}`);
    }
    console.log("🎉 All ambulances uploaded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
}

// Run
uploadAmbulances();
