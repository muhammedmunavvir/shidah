export interface AuthRequest {
  email: string;
  password?: string;
  token?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
