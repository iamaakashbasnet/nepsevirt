interface UserState {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  is_verified: boolean | undefined;
  at?: string | undefined;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: null | UserState;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export type { UserState, AuthState, LoginFormData, SignupFormData };
