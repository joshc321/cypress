
export type AuthUser = {
    id: string;
    company: string;
    email: string;
    first: string;
    last: string;
    role: 'ADMIN' | 'USER';
  };
  
  export type UserResponse = {
    jwt: string;
    user: AuthUser;
  };
  