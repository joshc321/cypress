declare global {
    namespace Express {
        /*
        * Declare schema for Request
        */
      interface Request {
        user?: Context;
      }
    }
  }

export {}