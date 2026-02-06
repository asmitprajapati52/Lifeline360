import React from 'react';
import { Activity, AlertCircle, Phone, MapPin } from 'lucide-react';

export default function AmbulanceDashboard({ ambulances, requests, onLogout }) {
  const myAmbulance = ambulances?.[0];

  if (!myAmbulance) {
    return <div className="p-6 sm:p-10 text-center text-lg sm:text-xl font-bold">No ambulance data found</div>;
  }

  const myRequests = requests.filter(r => r.ambulance === myAmbulance.vehicleNo);

  if (!ambulances || ambulances.length === 0) {
    return <div className="p-6 sm:p-10 text-center font-bold">No ambulance data found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Ambulance Dashboard
                </h1>
                <p className="text-xs text-gray-500 font-bold">Emergency Response</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-black hover:shadow-2xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* VEHICLE INFO */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 mb-8 border-2 border-green-300">
          <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-6">
            🚑 Vehicle Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border-2 border-green-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Vehicle Number</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{myAmbulance.vehicleNo}</p>
            </div>

            <div className="p-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Driver Name</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{myAmbulance.driver}</p>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Status</p>
              <p className={`text-xl sm:text-2xl font-black mt-2 ${myAmbulance.status === 'available' ? 'text-green-600' : 'text-orange-600'}`}>
                {myAmbulance.status}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl border-2 border-orange-300 shadow-lg">
              <p className="text-xs text-gray-600 font-black">Active Requests</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{myRequests.length}</p>
            </div>
          </div>
        </div>

        {/* EMERGENCIES */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-red-300">
          <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            Assigned Emergencies
          </h2>

          {myRequests.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg sm:text-xl font-black">No emergencies assigned</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {myRequests.map(request => (
                <div
                  key={request.id}
                  className="border-2 border-green-400 rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-3xl font-black text-gray-900">{request.patientName}</h3>
                      <p className="text-gray-600 mt-2 font-bold text-sm sm:text-lg">
                        Age: {request.age} | Blood: {request.bloodGroup}
                      </p>
                    </div>

                    <span className="px-4 py-2 rounded-full text-sm font-black bg-green-500 text-white w-fit">
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-white rounded-2xl p-5 border-2 border-red-300 shadow-lg">
                      <p className="text-sm font-black text-gray-600 mb-2">Emergency Type</p>
                      <p className="text-lg sm:text-xl font-black text-red-600">🚨 {request.emergency}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border-2 border-green-300 shadow-lg">
                      <p className="text-sm font-black text-gray-600 mb-2">Destination Hospital</p>
                      <p className="text-lg sm:text-xl font-black text-green-600">
                        🏥 {request.hospital || 'Not assigned'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      Call Patient
                    </button>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5" />
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
