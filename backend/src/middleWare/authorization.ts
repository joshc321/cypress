/**
 @module Authorization
*/

import * as jwt from "jsonwebtoken"
import User from "../models/user";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).send({error: 'Unauthorized'});
  
    jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
        
        if (err) return res.status(401).send({error: 'Unauthorized'});
        User.findById(user.id).select('permissionLevel company').then((user) => {
          if(user)
          {
            req.user = user;
            next();
          }
          else res.status(401).send({error: 'Unauthorized'});
        }).catch(next)
      })
  }

export default authenticateToken