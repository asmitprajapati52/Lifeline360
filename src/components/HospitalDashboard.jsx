import React, { useEffect, useState } from "react";
import { Building2, Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { updateHospital, updateRequestStatus } from "../services/firestoreService";

export default function HospitalDashboard({
  hospitals,
  setHospitals,
  requests,
  setRequests,
  onLogout,
}) {
  const [editingHospital, setEditingHospital] = useState(null);

  useEffect(() => {
    if (hospitals && hospitals.length > 0) {
      setEditingHospital(hospitals[0]);
    }
  }, [hospitals]);

  const handleUpdateResources = async (e) => {
    e.preventDefault();
    if (!editingHospital) return;

    await updateHospital(editingHospital.id, editingHospital);

    setHospitals(
      hospitals.map((h) =>
        h.id === editingHospital.id ? editingHospital : h
      )
    );

    alert("✅ Resources updated successfully!");
  };

  const handleRequestAction = async (requestId, action) => {
    await updateRequestStatus(requestId, action);

    setRequests(
      requests.map((r) =>
        r.id === requestId ? { ...r, status: action } : r
      )
    );
  };

  /* ---------- FIX: Prevent crash when data not ready ---------- */
  if (!editingHospital) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading hospital dashboard...
      </div>
    );
  }
  /* ------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b-4 border-purple-500">
            <div className="max-w-7xl mx-auto px-6 py-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Hospital Dashboard</h1>
                    <p className="text-xs text-gray-500 font-bold">Resource Management</p>
                  </div>
                </div>
                <button onClick={onLogout} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-black hover:shadow-2xl hover:scale-105 transition-all">Logout</button>
              </div>
            </div>
          </nav>
    
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-purple-300">
                <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  Update Resources
                </h2>
    
                <form onSubmit={handleUpdateResources} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">Hospital Name</label>
                    <input type="text" value={editingHospital.name} readOnly className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-100 font-bold text-gray-900 shadow-inner" />
                  </div>
    
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-3">ICU Beds</label>
                      <input type="number" value={editingHospital.icuBeds} onChange={(e) => setEditingHospital({...editingHospital, icuBeds: parseInt(e.target.value) || 0})} className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-bold text-gray-900 shadow-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-3">Ventilators</label>
                      <input type="number" value={editingHospital.ventilators} onChange={(e) => setEditingHospital({...editingHospital, ventilators: parseInt(e.target.value) || 0})} className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-bold text-gray-900 shadow-lg" />
                    </div>
                  </div>
    
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">Oxygen Level (%)</label>
                    <input type="number" min="0" max="100" value={editingHospital.oxygen} onChange={(e) => setEditingHospital({...editingHospital, oxygen: parseInt(e.target.value) || 0})} className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-bold text-gray-900 shadow-lg" />
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-4 shadow-inner">
                      <div className={`h-4 rounded-full shadow-lg ${editingHospital.oxygen < 30 ? 'bg-gradient-to-r from-red-500 to-pink-500' : editingHospital.oxygen < 60 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`} style={{width: `${editingHospital.oxygen}%`}}></div>
                    </div>
                  </div>
    
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all transform">
                    ✅ Update Resources
                  </button>
                </form>
              </div>
    
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-orange-300">
                <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  Emergency Requests
                </h2>
    
                <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
                  {requests.filter(r => r.status === 'pending' || r.status === 'in-progress').length === 0 ? (
                    <div className="text-center py-16">
                      <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-xl font-black">No pending requests</p>
                      <p className="text-gray-400 text-sm font-semibold mt-2">All clear! 🎉</p>
                    </div>
                  ) : (
                    requests.filter(r => r.status === 'pending' || r.status === 'in-progress').map(request => (
                      <div key={request.id} className="border-3 border-orange-300 rounded-2xl p-6 hover:border-orange-500 transition bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg hover:shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-black text-xl text-gray-900">{request.patientName}</h3>
                            <p className="text-sm text-gray-600 font-bold mt-1">Age: {request.age} | Blood: {request.bloodGroup}</p>
                          </div>
                          <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-xs font-black shadow-lg">{request.timestamp}</span>
                        </div>
                        <div className="mb-4 space-y-2">
                          <p className="text-sm text-gray-700 font-semibold"><span className="font-black">Emergency:</span> {request.emergency}</p>
                          <p className="text-sm text-gray-700 font-semibold"><span className="font-black">Location:</span> {request.location}</p>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => handleRequestAction(request.id, 'accepted')} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-black hover:shadow-xl transition flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Accept
                          </button>
                          <button onClick={() => handleRequestAction(request.id, 'rejected')} className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-black hover:shadow-xl transition flex items-center justify-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
