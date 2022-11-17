declare global {
    namespace Express {
        /*
        * Declare schema for Request
        */
      interface Request {
        file?: any;
        user?: Context;
        query?: {
          q?: string 
        }
      }
    }
  }

export {}