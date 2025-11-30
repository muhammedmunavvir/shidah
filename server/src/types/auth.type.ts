export interface AuthRequest {
  email: string;
  password?: string;
  token?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  avatar?: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  id: string;
}

export type TokenPayload = JwtPayload | RefreshTokenPayload;
