// const   Print = require('../models/print');
const   middlewareObj = {};
        
// middlewareObj.checkPrintOwner = function(req, res, next){
//     if(req.isAuthenticated()){
//         Print.findById(req.params.id, function(err, foundPrint){
//             if(err){
//                 res.redirect('back');
//             } else {
//                 if(foundPrint.author.id.equals(req.user._id) || req.user.isAdmin){
//                     next();
//                 } else {
//                     req.flash('error', "You do not have permission to do this action!");
//                     res.redirect('back');
//                 }
//             }
//         });
//     } else {
//         req.flash('error', "Please login");
//         res.redirect('/login');    
//     }
// }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash('error','You need to login first');
    res.redirect('back');
}

module.exports = middlewareObj;