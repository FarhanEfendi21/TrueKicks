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
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Navbar />

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-2 text-gray-600">Manage your profile information and account security.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">

                {/* Cover Background */}
                <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
                  {isGuest && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                        Guest Mode
                      </span>
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6 relative">
                  {/* Avatar */}
                  <div className="-mt-12 mb-4 flex justify-center">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl font-bold text-gray-400">{getInitials(user.full_name)}</span>
                          )}
                        </div>
                      </div>

                      {/* Edit Avatar Overlay */}
                      {!isGuest && (
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer m-1">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleMainAction}
                      className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2
                        ${isGuest
                          ? "bg-[#FF5500] text-white hover:bg-[#e04b00] shadow-lg shadow-orange-200"
                          : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200"
                        }`}
                    >
                      {isGuest ? "Register Now" : "Edit Profile"}
                    </button>

                    {!isGuest && profileImage && (
                      <button
                        onClick={removeProfileImage}
                        className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Personal Information Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                  {!isGuest && (
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="text-sm text-gray-500 hover:text-gray-900 font-medium underline decoration-gray-300 underline-offset-4"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-gray-900 font-semibold">{user.full_name}</p>
                  </div>

                  {/* Email */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-gray-900 font-semibold truncate" title={user.email}>{user.email}</p>
                  </div>

                  {/* Account Status */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Account Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isGuest ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                      <p className="text-gray-900 font-semibold">{isGuest ? "Guest" : "Active"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings / Danger Zone */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h3>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900">Sign Out</p>
                    <p className="text-sm text-gray-500">Securely log out of your account on this device.</p>
                  </div>
                  <button
                    onClick={isGuest ? handleGuestExit : () => setShowLogoutModal(true)}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-all"
                  >
                    {isGuest ? "Exit" : "Logout"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-500 mt-1">Update your personal details.</p>
                </div>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={editForm.full_name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-gray-500">Email address cannot be changed.</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to sign out of your account?</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
                >
                  Sign Out
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