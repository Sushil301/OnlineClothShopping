module.exports = {
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