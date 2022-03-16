/**
 @module CheckCompany
*/


function checkCompany(req, res, next) {
    if(req.user.permissionLevel > 1 || req.params.id == req.user.company) next();
    else{
        res.status(403).send({error: 'Not Authorized'});
    }
  }

export default checkCompany