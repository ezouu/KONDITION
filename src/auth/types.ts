export interface User {
  id: string;
  name: string;
  email?: string;
  photoUrl?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 