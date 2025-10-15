import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/auth-context';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/diario" />;
  }

  return <Redirect href="/(auth)/login" />;
}

