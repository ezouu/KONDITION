import { LoginScreen } from '../src/auth/screens/LoginScreen';
import { useAuth } from '../src/auth/AuthContext';
import { Redirect } from 'expo-router';

export default function Index() {
  const { authState } = useAuth();

  // If user is already logged in, redirect to main app
  if (authState.user) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise show login screen
  return <LoginScreen />;
} 