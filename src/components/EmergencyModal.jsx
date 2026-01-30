import React, { useState } from 'react';
import { AlertCircle, X, CheckCircle, User, Building2, Activity } from 'lucide-react';
import { saveEmergencyRequest } from '../services/emergencyService';

export default function EmergencyModal({ 
  hospitals, 
  ambulances, 
  setRequests,
  emergencySubmitted,
  setEmergencySubmitted,
  emergencyDetails,
  setEmergencyDetails,
  onClose 
}) {
  const [formData, setFormData] = useState({ 
    patientName: '', 
    age: '', 
    bloodGroup: '', 
    emergency: '', 
    location: '', 
    budget: 'any' 
  });

  const handleSubmit = async () => {
    if (!formData.patientName || !formData.age || !formData.bloodGroup || !formData.emergency || !formData.location) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const availableAmbulance = ambulances.find(a => a.status === 'available');

    const nearestHospital = hospitals
      .filter(h => {
        if (h.icuBeds === 0 && h.ventilators === 0) return false;
        if (formData.bloodGroup && !h.bloodGroups.includes(formData.bloodGroup)) return false;
        if (formData.budget === 'low' && h.priceRange !== 'low') return false;
        if (formData.budget === 'medium' && h.priceRange === 'high') return false;
        return true;
      })
      .sort((a, b) => a.distance - b.distance)[0];

    const newRequest = {
      patientName: formData.patientName,
      age: parseInt(formData.age),
      bloodGroup: formData.bloodGroup,
      emergency: formData.emergency,
      location: formData.location,
      hospital: nearestHospital ? nearestHospital.name : 'No hospital available',
      ambulance: availableAmbulance ? availableAmbulance.vehicleNo : 'No ambulance available',
      status: 'pending'
    };

    try {
      // 🔥 Save to Firebase
      await saveEmergencyRequest(newRequest);

      // Local UI update
      setRequests(prev => [{ ...newRequest, id: Date.now() }, ...prev]);

      setEmergencyDetails({
        hospital: newRequest.hospital,
        ambulance: newRequest.ambulance,
        patient: newRequest.patientName
      });

      setEmergencySubmitted(true);
    } catch (error) {
      console.error('Firebase Error:', error);
      alert('❌ Failed to send emergency request!');
    }
  };

  const handleClose = () => {
    onClose();
    setEmergencySubmitted(false);
    setEmergencyDetails(null);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto border-4 border-red-500/20">
            {emergencySubmitted ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
                <h2 className="text-4xl font-black text-green-600 mb-4">Request Sent Successfully! ✅</h2>
                <p className="text-xl font-bold text-gray-700 mb-8">Help is on the way!</p>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-300">
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600">Patient</p>
                        <p className="text-lg font-black text-gray-900">{emergencyDetails?.patient}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600">Assigned Hospital</p>
                        <p className="text-lg font-black text-gray-900">{emergencyDetails?.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600">Ambulance Number</p>
                        <p className="text-lg font-black text-gray-900">{emergencyDetails?.ambulance}</p>
                      </div>
                    </div>
                  </div>
                </div>
    
                <button 
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all transform"
                >
                  ✓ Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">SOS Emergency</h2>
                      <p className="text-sm text-red-600 font-semibold">Quick Response Team</p>
                    </div>
                  </div>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition">
                    <X className="w-6 h-6" />
                  </button>
                </div>
    
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">Patient Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.patientName} 
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})} 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold text-gray-900 transition shadow-sm" 
                      placeholder="Full name" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2">Age *</label>
                      <input 
                        required 
                        type="number" 
                        value={formData.age} 
                        onChange={(e) => setFormData({...formData, age: e.target.value})} 
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold text-gray-900 transition shadow-sm" 
                        placeholder="Age" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2">Blood Group *</label>
                      <select 
                        required 
                        value={formData.bloodGroup} 
                        onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} 
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold text-gray-900 transition shadow-sm"
                      >
                        <option value="">Select</option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">Emergency Type *</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.emergency} 
                      onChange={(e) => setFormData({...formData, emergency: e.target.value})} 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold text-gray-900 transition shadow-sm" 
                      placeholder="e.g., Heart Attack, Accident" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">Budget Preference *</label>
                    <select 
                      required 
                      value={formData.budget} 
                      onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-gray-900 transition shadow-sm"
                    >
                      <option value="any">💎 Any Budget (All Hospitals)</option>
                      <option value="low">💰 Budget Friendly ($500-$1000)</option>
                      <option value="medium">💵 Moderate ($1000-$2500)</option>
                      <option value="high">💎 Premium ($2500+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">Current Location *</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold text-gray-900 transition shadow-sm" 
                      placeholder="Enter address or landmark" 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all transform duration-300"
                  >
                    🚨 Submit Emergency Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
  );
}
