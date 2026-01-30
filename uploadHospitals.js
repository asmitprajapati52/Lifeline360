import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

/* Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyC854m-ARCmsj-gUKhywzmyuro2uTgJqDk",
  authDomain: "lifeline360-17d8a.firebaseapp.com",
  projectId: "lifeline360-17d8a",
  storageBucket: "lifeline360-17d8a.firebasestorage.app",
  messagingSenderId: "894639205623",
  appId: "1:894639205623:web:e32e508e6b23a70e1777f2",
  measurementId: "G-NNHEYF473M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Hospital Data */
const hospitals = [
  {
    name: "City General Hospital",
    location: "Downtown",
    distance: 2.3,
    icuBeds: 5,
    ventilators: 3,
    oxygen: 85,
    bloodGroups: ["A+", "B+", "O+", "AB+"],
    phone: "9876543210",
    priceRange: "medium",
    avgCost: 1500,
    rating: 4.5,
    category: "Government"
  },
  {
    name: "Metro Medical Center",
    location: "Uptown",
    distance: 4.1,
    icuBeds: 2,
    ventilators: 1,
    oxygen: 45,
    bloodGroups: ["O+", "A-", "B-"],
    phone: "9876543211",
    priceRange: "high",
    avgCost: 3500,
    rating: 4.8,
    category: "Private"
  },
  {
    name: "Hope Healthcare",
    location: "Midtown",
    distance: 1.8,
    icuBeds: 12,
    ventilators: 8,
    oxygen: 100,
    bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    phone: "9876543212",
    priceRange: "medium",
    avgCost: 2000,
    rating: 4.7,
    category: "Private"
  },
  {
  name: "Metro Medical Center",
  location: "Uptown",
  distance: 4.1,
  icuBeds: 2,
  ventilators: 1,
  oxygen: 45,
  bloodGroups: ["O+", "A-", "B-"],
  phone: "9876543211",
  priceRange: "high",
  avgCost: 3500,
  rating: 4.8,
  category: "Private"
},
{
  name: "Emergency Care Hospital",
  location: "Westside",
  distance: 3.5,
  icuBeds: 8,
  ventilators: 6,
  oxygen: 95,
  bloodGroups: ["A+", "B+", "O+", "O-", "AB+", "AB-"],
  phone: "9876543212",
  priceRange: "high",
  avgCost: 4000,
  rating: 4.9,
  category: "Super Specialty"
},
{
  name: "St. Mary's Medical",
  location: "Eastside",
  distance: 5.2,
  icuBeds: 0,
  ventilators: 0,
  oxygen: 20,
  bloodGroups: ["A+", "O+"],
  phone: "9876543213",
  priceRange: "low",
  avgCost: 800,
  rating: 4.2,
  category: "Government"
},
{
  name: "Hope Healthcare",
  location: "Midtown",
  distance: 1.8,
  icuBeds: 12,
  ventilators: 8,
  oxygen: 100,
  bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  phone: "9876543214",
  priceRange: "medium",
  avgCost: 2000,
  rating: 4.7,
  category: "Private"
},
{
  name: "LifeCare Specialty",
  location: "Southside",
  distance: 6.5,
  icuBeds: 15,
  ventilators: 10,
  oxygen: 98,
  bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  phone: "9876543215",
  priceRange: "high",
  avgCost: 5000,
  rating: 5.0,
  category: "Super Specialty"
},
{
  name: "Community Health Center",
  location: "Northwest",
  distance: 3.8,
  icuBeds: 3,
  ventilators: 2,
  oxygen: 70,
  bloodGroups: ["O+", "A+", "B+"],
  phone: "9876543216",
  priceRange: "low",
  avgCost: 600,
  rating: 3.9,
  category: "Government"
},
{
  name: "Elite Medical Institute",
  location: "Central",
  distance: 2.9,
  icuBeds: 10,
  ventilators: 7,
  oxygen: 92,
  bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  phone: "9876543217",
  priceRange: "high",
  avgCost: 4500,
  rating: 4.9,
  category: "Private"
}
];

/* Upload Function */
async function uploadHospitals() {
  try {
    for (let i = 0; i < hospitals.length; i++) {
      const hospitalId = `hospital_${String(i + 1).padStart(3, "0")}`;

      await setDoc(doc(db, "hospitals", hospitalId), hospitals[i]);

      console.log(`✅ Uploaded ${hospitalId}`);
    }

    console.log("🎉 All hospitals uploaded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
}

uploadHospitals();
