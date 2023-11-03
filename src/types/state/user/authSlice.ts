interface UserState {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  at: string | undefined;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: null | UserState;
}

export type { UserState, AuthState };
