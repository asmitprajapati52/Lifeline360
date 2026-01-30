import React from 'react';
import { Heart, Sparkles, Zap, Bed, Wind, Activity, MapPin, Phone, Building2, DollarSign, Star, Droplet, AlertCircle } from 'lucide-react';

export default function PublicDashboard({ 
  hospitals = [],       // ✅ default value added
  filters = {},         // ✅ default value added
  setFilters, 
  onLogout, 
  onEmergencyClick 
}) 
{
  const filteredHospitals = hospitals.filter(h => {
    if (filters.icuBeds && h.icuBeds === 0) return false;
    if (filters.ventilators && h.ventilators === 0) return false;
    if (filters.oxygen && h.oxygen < 50) return false;
    if (filters.bloodGroup && !h.bloodGroups.includes(filters.bloodGroup)) return false;
    if (filters.budget === 'low' && h.priceRange !== 'low') return false;
    if (filters.budget === 'medium' && h.priceRange !== 'medium') return false;
    if (filters.budget === 'high' && h.priceRange !== 'high') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">LifeLine360</h1>
                <p className="text-xs text-gray-500 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Emergency Healthcare Platform
                </p>
              </div>
            </div>
            <button onClick={onLogout} className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-black hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-4 leading-tight">Find Your Perfect Hospital 🏥</h2>
          <p className="text-gray-600 text-xl font-semibold">Real-time availability • Transparent pricing • Instant booking</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-10 border-2 border-purple-200">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            Smart Filters
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <button onClick={() => setFilters({...filters, icuBeds: !filters.icuBeds})} className={`p-5 rounded-2xl border-3 transition-all transform hover:scale-110 duration-300 ${filters.icuBeds ? 'border-red-500 bg-gradient-to-br from-red-100 to-pink-100 shadow-xl shadow-red-500/30' : 'border-gray-200 bg-white hover:border-red-300'}`}>
              <Bed className={`w-7 h-7 mx-auto mb-2 ${filters.icuBeds ? 'text-red-600' : 'text-gray-400'}`} />
              <p className="font-black text-xs">ICU Beds</p>
            </button>
            <button onClick={() => setFilters({...filters, ventilators: !filters.ventilators})} className={`p-5 rounded-2xl border-3 transition-all transform hover:scale-110 duration-300 ${filters.ventilators ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-cyan-100 shadow-xl shadow-blue-500/30' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
              <Wind className={`w-7 h-7 mx-auto mb-2 ${filters.ventilators ? 'text-blue-600' : 'text-gray-400'}`} />
              <p className="font-black text-xs">Ventilators</p>
            </button>
            <button onClick={() => setFilters({...filters, oxygen: !filters.oxygen})} className={`p-5 rounded-2xl border-3 transition-all transform hover:scale-110 duration-300 ${filters.oxygen ? 'border-green-500 bg-gradient-to-br from-green-100 to-emerald-100 shadow-xl shadow-green-500/30' : 'border-gray-200 bg-white hover:border-green-300'}`}>
              <Activity className={`w-7 h-7 mx-auto mb-2 ${filters.oxygen ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="font-black text-xs">Oxygen 50%+</p>
            </button>
            <div className="col-span-2">
              <select value={filters.bloodGroup} onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})} className="w-full h-full px-5 py-4 border-3 border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-black text-sm shadow-lg hover:shadow-xl transition-all">
                <option value="">🩸 All Blood Groups</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <select value={filters.budget} onChange={(e) => setFilters({...filters, budget: e.target.value})} className="w-full h-full px-5 py-4 border-3 border-gray-200 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-black text-sm shadow-lg hover:shadow-xl transition-all">
                <option value="all">💰 All Budgets</option>
                <option value="low">💵 Low</option>
                <option value="medium">💳 Medium</option>
                <option value="high">💎 Premium</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 border-2 border-transparent hover:border-purple-400 transform hover:scale-105 hover:-rotate-1 duration-300">
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-lg ${hospital.category === 'Government' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : hospital.category === 'Private' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'}`}>
                      {hospital.category}
                    </span>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 rounded-full shadow-lg">
                      <Star className="w-4 h-4 text-white fill-white" />
                      <span className="text-xs font-black text-white">{hospital.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{hospital.name}</h3>
                  <p className="text-gray-600 flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {hospital.location} • {hospital.distance} km
                  </p>
                </div>
                <Building2 className="w-12 h-12 text-purple-500 group-hover:text-pink-500 transition-colors" />
              </div>

              <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-2xl p-5 mb-5 border-2 border-green-300 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-gray-700">Average Cost</span>
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-4xl font-black text-green-600 mb-3">${hospital.avgCost}</p>
                <span className={`inline-block px-4 py-2 rounded-full text-xs font-black shadow-lg ${hospital.priceRange === 'low' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : hospital.priceRange === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'}`}>
                  {hospital.priceRange === 'low' ? '💰 Budget' : hospital.priceRange === 'medium' ? '💵 Moderate' : '💎 Premium'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className={`p-4 rounded-2xl shadow-lg ${hospital.icuBeds === 0 ? 'bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-300' : hospital.icuBeds < 5 ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300' : 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300'}`}>
                  <Bed className={`w-6 h-6 mb-2 ${hospital.icuBeds === 0 ? 'text-red-600' : hospital.icuBeds < 5 ? 'text-orange-600' : 'text-green-600'}`} />
                  <p className="text-xs font-black text-gray-700">ICU Beds</p>
                  <p className="text-3xl font-black mt-1">{hospital.icuBeds}</p>
                </div>
                <div className={`p-4 rounded-2xl shadow-lg ${hospital.ventilators === 0 ? 'bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-300' : hospital.ventilators < 3 ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-300'}`}>
                  <Wind className={`w-6 h-6 mb-2 ${hospital.ventilators === 0 ? 'text-red-600' : hospital.ventilators < 3 ? 'text-orange-600' : 'text-blue-600'}`} />
                  <p className="text-xs font-black text-gray-700">Ventilators</p>
                  <p className="text-3xl font-black mt-1">{hospital.ventilators}</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black text-gray-700 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Oxygen Level
                  </span>
                  <span className={`text-sm font-black px-3 py-1 rounded-full ${hospital.oxygen < 30 ? 'bg-red-100 text-red-700' : hospital.oxygen < 60 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{hospital.oxygen}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div className={`h-4 rounded-full shadow-lg transition-all duration-1000 ${hospital.oxygen < 30 ? 'bg-gradient-to-r from-red-500 to-pink-500' : hospital.oxygen < 60 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`} style={{width: `${hospital.oxygen}%`}}></div>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-black text-gray-700 mb-3 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-red-600" />
                  Available Blood
                </p>
                <div className="flex flex-wrap gap-2">
                  {hospital.bloodGroups.map(bg => (
                    <span key={bg} className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-black shadow-lg hover:shadow-xl hover:scale-110 transition-all">{bg}</span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 rounded-2xl font-black hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-base">
                <Phone className="w-5 h-5" />
                Call: {hospital.phone}
              </button>
            </div>
          ))}
        </div>

        <button onClick={onEmergencyClick} className="fixed bottom-10 right-10 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white px-10 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-110 flex items-center gap-4 font-black text-xl z-30 animate-bounce border-4 border-white">
          <AlertCircle className="w-8 h-8" />
          🚨 SOS Emergency
        </button>
      </div>
    </div>
  );
}