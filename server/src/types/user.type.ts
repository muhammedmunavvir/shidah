export interface Iuser{
     _id?: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}