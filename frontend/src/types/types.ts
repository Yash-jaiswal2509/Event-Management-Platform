export interface User {
  id: string;
  username: string;
  email: string;
  isGuest: boolean;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface VerifyTokenResponse {
  success: boolean;
  data?: {
    user: User;
  };
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}
