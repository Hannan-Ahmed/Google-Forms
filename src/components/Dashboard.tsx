// Final all-in-one component with multiple charts and enhanced UI
import React, { useState } from 'react';
import {
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BellIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Dashboard = () => {
  const [rooms, setRooms] = useState([
    { id: 1, number: 'A101', type: 'Single', status: 'Available' },
    { id: 2, number: 'B202', type: 'Double', status: 'Occupied' },
    { id: 3, number: 'C303', type: 'Single', status: 'Maintenance' },
  ]);

  const occupancyData = [
    { month: 'Jan', occupancy: 70 },
    { month: 'Feb', occupancy: 75 },
    { month: 'Mar', occupancy: 80 },
    { month: 'Apr', occupancy: 78 },
    { month: 'May', occupancy: 85 },
    { month: 'Jun', occupancy: 90 },
  ];

  const roomTypes = [
    { name: 'Single', value: 60 },
    { name: 'Double', value: 40 },
  ];

  const genderDistribution = [
    { name: 'Male', value: 65 },
    { name: 'Female', value: 35 },
  ];

  const COLORS = ['#6366f1', '#f59e0b', '#10b981'];

  const sidebarItems = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Rooms', icon: BuildingOffice2Icon },
    { name: 'Students', icon: UsersIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
  ];

  const deleteRoom = (id) => setRooms(rooms.filter((room) => room.id !== id));

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-white text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b">
          🏨 Hostel Admin
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-100 transition"
            >
              <item.icon className="h-5 w-5 text-indigo-500" />
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-8">
        {/* Topbar */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Hostel Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            <BellIcon className="w-6 h-6 text-indigo-500" />
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-full border-2 border-indigo-300 shadow-sm"
              alt="Profile"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Total Rooms</h2>
            <p className="text-3xl font-semibold mt-2 text-indigo-600">120</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Occupied</h2>
            <p className="text-3xl font-semibold mt-2 text-red-500">85</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Available</h2>
            <p className="text-3xl font-semibold mt-2 text-green-600">35</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Pending Requests</h2>
            <p className="text-3xl font-semibold mt-2 text-yellow-500">12</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Monthly Occupancy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Room Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={roomTypes} dataKey="value" nameKey="name" outerRadius={100}>
                  {roomTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Graph */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">Gender Ratio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderDistribution}>
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room Management Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-indigo-700">Room Management</h3>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              + Add Room
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="text-left px-4 py-3">Room</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-indigo-50 transition">
                    <td className="px-4 py-3">{room.number}</td>
                    <td className="px-4 py-3">{room.type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          room.status === 'Available'
                            ? 'bg-green-100 text-green-700'
                            : room.status === 'Occupied'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;