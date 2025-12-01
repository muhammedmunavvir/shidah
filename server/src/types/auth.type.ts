export interface AuthRequest {
  email: string;
  password?: string;
  token?: string;
}

export interface JwtPayload {
  _id: string;
  email: string;
  role: string;
  avatar?: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  _id: string;
}

export type TokenPayload = JwtPayload | RefreshTokenPayload;
