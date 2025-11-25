import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || null
  );
  
  // 1. Ambil data user dari Local Storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  // 2. Tentukan apakah user adalah Guest atau User asli
  // Jika tidak ada data di localStorage, kita anggap Guest
  const isGuest = !storedUser || storedUser.email === 'guest@truekicks.com' || storedUser.full_name === 'Guest';

  // Data user yang akan ditampilkan (Fallback ke data Guest jika null)
  const user = storedUser || { full_name: 'Guest', email: 'guest@truekicks.com' };
  
  // State untuk form edit
  const [editForm, setEditForm] = useState({
    full_name: user.full_name
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  // Handler khusus untuk Guest saat klik tombol "Keluar"
  const handleGuestExit = () => {
    handleLogout(); // Langsung keluar tanpa modal konfirmasi
  };

  // Handler untuk tombol aksi utama (Edit / Daftar)
  const handleMainAction = () => {
    if (isGuest) {
        // Jika Guest, arahkan ke halaman login/register
        navigate("/login"); 
    } else {
        // Jika User asli, buka modal edit
        setShowEditModal(true);
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      full_name: editForm.full_name
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowEditModal(false);
    window.location.reload();
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-poppins overflow-x-hidden">
        <Navbar />

        <div className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto animate-fadeIn">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-500">Manage your account and settings</p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Profile Section */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        getInitials(user.full_name)
                      )}
                    </div>
                    
                    {/* Edit Overlay (Hanya untuk User Asli) */}
                    {!isGuest && (
                        <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        </label>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.full_name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    {!isGuest && profileImage && (
                      <button
                        onClick={removeProfileImage}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove Photo
                      </button>
                    )}
                    {isGuest && (
                        <span className="mt-2 inline-block px-3 py-1 bg-orange-100 text-[#FF5500] text-xs font-bold rounded-full">
                            Guest Mode
                        </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Full Name</p>
                        <p className="text-base font-semibold text-gray-900">{user.full_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email Address</p>
                        <p className="text-base font-semibold text-gray-900">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Member Since</p>
                        <p className="text-base font-semibold text-gray-900">
                            {isGuest ? "Visitor" : "January 2024"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-3">
                
                {/* TOMBOL 1: EDIT (User) / DAFTAR (Guest) */}
                <button 
                  onClick={handleMainAction}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2
                    ${isGuest 
                        ? "bg-[#FF5500] text-white hover:bg-orange-600 shadow-lg shadow-orange-200" 
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                >
                  {isGuest ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                        Daftar Member
                    </>
                  ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                    </>
                  )}
                </button>

                {/* TOMBOL 2: LOGOUT (User) / KELUAR (Guest) */}
                <button
                  onClick={isGuest ? handleGuestExit : () => setShowLogoutModal(true)}
                  className="w-full bg-white text-gray-700 py-3.5 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {isGuest ? "Keluar" : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal (Hanya tampil jika showEditModal true, yg mana tidak akan true untuk Guest) */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Edit Profile</h3>
                <p className="text-gray-600">Update your account information</p>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={editForm.full_name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input - READ ONLY */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                    <span className="ml-2 text-xs font-normal text-gray-500">(Cannot be changed)</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Modal (Hanya untuk User Asli) */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-600">Are you sure you want to logout?</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}