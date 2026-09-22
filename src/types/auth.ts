export type AuthUser = {
  id: string;
  role: string;
};

export type LoginRequest = {
  email: string;
  password?: string;
};

export type RegisterRequest = {
  email: string;
  username: string;
  password?: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type SessionData = {
  user: AuthUser;
  expires: Date;
};
