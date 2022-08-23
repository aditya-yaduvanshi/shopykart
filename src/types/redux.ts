export interface AuthInitialState {
  user: User | null;
  accessToken: string | null;
  accessExpiry: string | null;
  refreshExpiry: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: any;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  id: string;
  role: string;
}