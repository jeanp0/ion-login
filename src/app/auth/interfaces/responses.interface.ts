export interface LoginResponse {
  uid: string;
  name: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  uid: string;
  name: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}
