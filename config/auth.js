module.exports = {
    isLoggedIn(req, res, next){
        if (req.isAuthenticated()){
          return next();
        }
        res.redirect('/');
    },
    notLoggedIn(req, res, next){
        if (!req.isAuthenticated()){
            return next();
        }
      res.redirect('/');
    },
    isAdmin: (req, res, next) => {
        if (req.user) {
            currentUser = req.user;   
            if(currentUser.isAdmin) {
                req.session.currentUser = currentUser.isAdmin;
                return next();
            }
            else {
                res.redirect('/');
            }
        }
        else {
            res.redirect('/user/signin');
        }
    }
} 