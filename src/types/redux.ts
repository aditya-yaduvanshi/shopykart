export interface AuthInitialState {
  user: User | null;
  signedIn: boolean;
  access: string | null;
  refresh: string | null;
  expiry: string | null;
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