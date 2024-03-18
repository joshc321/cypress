
export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'USER';
  };
  
  export type UserResponse = {
    jwt: string;
    user: AuthUser;
  };
  