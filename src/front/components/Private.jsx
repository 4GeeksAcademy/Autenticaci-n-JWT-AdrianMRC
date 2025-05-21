import { useEffect, useState } from 'react';
import { useAuth } from '../store/authContext';

export default function Private() {
  const { token, user, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/private', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            logout();
            return;
          }
          throw new Error('Error accessing private route');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching private data:', error);
        setError('Error loading private data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPrivateData();
    }
  }, [token, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <div className="text-red-600 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Panel Privado
            </h2>
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700">
                ¡Bienvenido al área privada, {user?.email}!
              </p>
              {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {message}
                </div>
              )}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Información del usuario:</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>ID:</strong> {user?.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}