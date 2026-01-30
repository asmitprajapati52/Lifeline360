export const initialHospitals = [
  { id: 1, name: "City General Hospital", location: "Downtown", distance: 2.3, icuBeds: 5, ventilators: 3, oxygen: 85, bloodGroups: ["A+", "B+", "O+", "AB+"], phone: "+1-555-0101", priceRange: "medium", avgCost: 1500, rating: 4.5, category: "Government" },
  { id: 2, name: "Metro Medical Center", location: "Uptown", distance: 4.1, icuBeds: 2, ventilators: 1, oxygen: 45, bloodGroups: ["O+", "A-", "B-"], phone: "+1-555-0102", priceRange: "high", avgCost: 3500, rating: 4.8, category: "Private" },
  { id: 3, name: "Emergency Care Hospital", location: "Westside", distance: 3.5, icuBeds: 8, ventilators: 6, oxygen: 95, bloodGroups: ["A+", "B+", "O+", "O-", "AB+", "AB-"], phone: "+1-555-0103", priceRange: "high", avgCost: 4000, rating: 4.9, category: "Super Specialty" },
  { id: 4, name: "St. Mary's Medical", location: "Eastside", distance: 5.2, icuBeds: 0, ventilators: 0, oxygen: 20, bloodGroups: ["A+", "O+"], phone: "+1-555-0104", priceRange: "low", avgCost: 800, rating: 4.2, category: "Government" },
  { id: 5, name: "Hope Healthcare", location: "Midtown", distance: 1.8, icuBeds: 12, ventilators: 8, oxygen: 100, bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], phone: "+1-555-0105", priceRange: "medium", avgCost: 2000, rating: 4.7, category: "Private" },
  { id: 6, name: "LifeCare Specialty", location: "Southside", distance: 6.5, icuBeds: 15, ventilators: 10, oxygen: 98, bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], phone: "+1-555-0106", priceRange: "high", avgCost: 5000, rating: 5.0, category: "Super Specialty" },
  { id: 7, name: "Community Health Center", location: "Northwest", distance: 3.8, icuBeds: 3, ventilators: 2, oxygen: 70, bloodGroups: ["O+", "A+", "B+"], phone: "+1-555-0107", priceRange: "low", avgCost: 600, rating: 3.9, category: "Government" },
  { id: 8, name: "Elite Medical Institute", location: "Central", distance: 2.9, icuBeds: 10, ventilators: 7, oxygen: 92, bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], phone: "+1-555-0108", priceRange: "high", avgCost: 4500, rating: 4.9, category: "Private" },
];

export const initialAmbulances = [
  { id: 1, vehicleNo: "AMB-001", driver: "John Doe", status: "available" },
  { id: 2, vehicleNo: "AMB-002", driver: "Jane Smith", status: "on-duty", assignedTo: 1 },
  { id: 3, vehicleNo: "AMB-003", driver: "Mike Johnson", status: "available" },
];

export const initialRequests = [
  { id: 1, patientName: "Sarah Williams", age: 45, bloodGroup: "O+", emergency: "Heart Attack", location: "123 Main St", hospital: "Hope Healthcare", ambulance: "AMB-002", status: "in-progress", timestamp: "10:30 AM" },
  { id: 2, patientName: "Robert Brown", age: 62, bloodGroup: "A+", emergency: "Respiratory Failure", location: "456 Oak Ave", hospital: null, ambulance: null, status: "pending", timestamp: "10:45 AM" },
];