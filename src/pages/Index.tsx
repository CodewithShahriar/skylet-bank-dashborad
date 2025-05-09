
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    // If authentication check is complete
    if (!isLoading) {
      if (isAuthenticated) {
        // Redirect to dashboard if authenticated
        navigate('/dashboard');
      } else {
        // Redirect to login if not authenticated
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  // Show loading while checking auth status
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-skylet-blue">Skylet Bank</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
