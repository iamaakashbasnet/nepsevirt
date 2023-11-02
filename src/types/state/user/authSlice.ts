interface UserState {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: null | boolean;
  user: null | UserState;
}

export type { UserState, AuthState };
