export type Session = {
  provider_token?: string | null;
  access_token: string;
  exppires_in?: number;
  exppires_at?: number;
  refresh_token?: string;
  token_type: string;
//   user: User | null;
};
