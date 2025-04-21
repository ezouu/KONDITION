import { Redirect } from 'expo-router';
import { useAuth } from '../auth/AuthContext';
import { LoginScreen } from '../auth/screens/LoginScreen';

export default function Index() {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return null; // Or a loading screen
  }

  if (!authState.user) {
    return <LoginScreen />;
  }

  return <Redirect href="/(tabs)" />;
} 