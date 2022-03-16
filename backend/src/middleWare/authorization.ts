/**
 @module Authorization
*/

import * as jwt from "jsonwebtoken"

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).send({error: 'Unauthorized'});
  
    jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
        
        if (err) return res.status(401).send({error: 'Unauthorized'});
    
        req.user = user;
        next();
      })
  }

export default authenticateToken