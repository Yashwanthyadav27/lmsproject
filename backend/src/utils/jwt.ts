import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.accessTokenExpiresIn,
  });
}

export function generateRefreshToken(): string {
  return jwt.sign({}, config.jwtSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): boolean {
  try {
    jwt.verify(token, config.jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}

export function getRefreshTokenExpiry(): Date {
  const days = 30;
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}
