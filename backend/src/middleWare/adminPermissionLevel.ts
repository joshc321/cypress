/**
 @module AdminPermissionLevel
*/

//checks if the user has a permission level greater than or equal to 2 else sends not authorized
//checks if the user is trying to chage a permission level above their own and prevents this

function adminPermissionLevel(req, res, next) {
    if(req.user.permissionLevel < 2) res.status(403).send({error: 'Not Authorized'});
    else if('permissionLevel' in req.body && req.user.permissionLevel < req.body.permissionLevel) res.status(403).send({error: 'Not Authorized'});
    else next();
  }

export default adminPermissionLevel
