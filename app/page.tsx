'use client';

import { useState } from 'react';
import RegisterForm from '@/components/RegisterForm';
import UserList from '@/components/UserList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRegistrationSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          User Registration Demo
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Register New User
            </h2>
            <RegisterForm onSuccess={handleRegistrationSuccess} />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Registered Users
            </h2>
            <UserList key={refreshKey} />
          </div>
        </div>
      </div>
    </main>
  );
}
