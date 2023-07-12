// const User = require('../models/user');

// exports.getAddDetails = (req,res,next)=>{
//     User.findAll()
//     .then(userDetail =>{
//         console.log(userDetail);
//         res.render('/all-details',{
//             prods : userDetail,
//             pageTitle : 'User Details',
//             path : '/userdetails'
//         })
//         console.log(userDetail);
//     })
//     .catch(err=>console.log(err));
// }

// exports.postAddDetails=(req,res,next)=>{
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;

//     User.create({
//         name : name,
//         email : email,
//         phone : phone
//     })
//     .then(result =>{
//         console.log(result);
//     })
//     .catch(err => console.log(err));
// }
