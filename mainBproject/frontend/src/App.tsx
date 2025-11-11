import  { useState, useEffect } from 'react';
import { getCurrentUser, login, register, logout } from './utils/auth'; // Import new getCurrentUser
import Layout from './components/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutPlanner from './components/workouts/WorkoutPlanner';
import DietTracker from './components/diet/DietTracker';
import GoalTracker from './components/goals/GoalTracker';
import ProgressDashboard from './components/progress/ProgressDashboard';
import VirtualTrainer from './components/trainer/VirtualTrainer';
import AdminPanel from './components/admin/AdminPanel';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';
import { User } from './types'; // Make sure you have a User type

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Check for user on initial load
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false); // Finished checking
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthError('');
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      setAuthError(errorMessage);
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      setAuthError('');
      // The register function in auth.ts now sends the request.
      // After a successful registration, we should log the user in.
      await register(userData);
      // Automatically log in the user after they register
      const loggedInUser = await login(userData.email, userData.password);
      setUser(loggedInUser);
    } catch (error: any) {
       const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
       setAuthError(errorMessage);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentView('dashboard'); // Or 'login' view
  };

  const renderContent = () => {
    // Your renderContent switch statement remains the same
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} onViewChange={setCurrentView} />;
        // return <Dashboard user={user} />;
      case 'workouts':
        return <WorkoutPlanner user={user} />;
      case 'diet':
        return <DietTracker user={user} />;
      case 'goals':
        return <GoalTracker user={user} />;
      case 'progress':
        return <ProgressDashboard user={user} currentView={currentView} />;
      case 'trainer':
        return <VirtualTrainer user={user} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return user?.isAdmin ? <AdminPanel user={user} /> :<Dashboard user={user} onViewChange={setCurrentView} />;                // <Dashboard user={user} />;
      default:
          return <Dashboard user={user} onViewChange={setCurrentView} />;
        // return <Dashboard user={user} />;
    }
  };
  
  // Show a loading spinner or empty screen while checking for user
  if (isLoading) {
      return <div>Loading...</div>; 
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setAuthMode('register');
          setAuthError('');
        }}
        error={authError}
      />
    ) : (
      <RegisterForm
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setAuthMode('login');
          setAuthError('');
        }}
        error={authError}
      />
    );
  }

  return (
    <Layout
      currentView={currentView}
      onViewChange={setCurrentView}
      user={user}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;