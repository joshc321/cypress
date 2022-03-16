/**
 @module SetCompany
*/

//sets value of company in body to the users company unless they have permissionl level 2 or above

function setCompany(req, res, next) {
    if(req.user.permissionLevel > 1 && 'company' in req.body) next();
    else{
        req.body.company = req.user.company;
        next()
    }
  }

export default setCompany