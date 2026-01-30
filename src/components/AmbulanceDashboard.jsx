import React from 'react';
import { Activity, AlertCircle, Phone, MapPin, Building2, CheckCircle } from 'lucide-react';

export default function AmbulanceDashboard({ ambulances, requests, onLogout }) {
 const myAmbulance = ambulances?.[0];
if (!myAmbulance) {
  return <div className="p-10 text-center text-xl font-bold">No ambulance data found</div>;
}

  const myRequests = requests.filter(r => r.ambulance === myAmbulance.vehicleNo);
  if (!ambulances || ambulances.length === 0) {
  return <div className="p-10 text-center font-bold">No ambulance data found</div>;
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Ambulance Dashboard</h1>
                <p className="text-xs text-gray-500 font-bold">Emergency Response</p>
              </div>
            </div>
            <button onClick={onLogout} className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-black hover:shadow-2xl hover:scale-105 transition-all">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border-2 border-green-300">
          <h2 className="text-3xl font-black text-gray-900 mb-6">🚑 Vehicle Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="p-5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border-2 border-green-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Vehicle Number</p>
              <p className="text-2xl font-black text-gray-900 mt-2">{myAmbulance.vehicleNo}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Driver Name</p>
              <p className="text-2xl font-black text-gray-900 mt-2">{myAmbulance.driver}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Status</p>
              <p className={`text-2xl font-black mt-2 ${myAmbulance.status === 'available' ? 'text-green-600' : 'text-orange-600'}`}>{myAmbulance.status}</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl border-2 border-orange-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Active Requests</p>
              <p className="text-2xl font-black text-gray-900 mt-2">{myRequests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-red-300">
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            Assigned Emergencies
          </h2>

          {myRequests.length === 0 ? (
            <div className="text-center py-16">
              <Activity className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl font-black">No emergencies assigned</p>
              <p className="text-gray-400 text-sm font-semibold mt-2">Ready for action! 🚑</p>
            </div>
          ) : (
            <div className="space-y-8">
              {myRequests.map(request => (
                <div key={request.id} className="border-3 border-green-400 rounded-3xl p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900">{request.patientName}</h3>
                      <p className="text-gray-600 mt-2 font-bold text-lg">Age: {request.age} | Blood: {request.bloodGroup}</p>
                    </div>
                    <span className={`px-5 py-3 rounded-full text-sm font-black shadow-lg ${request.status === 'in-progress' ? 'bg-orange-500 text-white' : request.status === 'accepted' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {request.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-white rounded-2xl p-5 border-2 border-red-300 shadow-lg">
                      <p className="text-sm font-black text-gray-600 mb-2">Emergency Type</p>
                      <p className="text-xl font-black text-red-600">🚨 {request.emergency}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border-2 border-green-300 shadow-lg">
                      <p className="text-sm font-black text-gray-600 mb-2">Destination Hospital</p>
                      <p className="text-xl font-black text-green-600">🏥 {request.hospital || 'Not assigned'}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 mb-6 border-2 border-blue-300 shadow-lg">
                    <p className="text-sm font-black text-gray-600 mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Patient Location
                    </p>
                    <p className="text-xl font-black text-gray-900">📍 {request.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-black hover:shadow-2xl hover:shadow-green-500/50 transition flex items-center justify-center gap-3 text-base">
                      <Phone className="w-6 h-6" />
                      Call Patient
                    </button>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black hover:shadow-2xl hover:shadow-purple-500/50 transition flex items-center justify-center gap-3 text-base">
                      <MapPin className="w-6 h-6" />
                      View Route
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}