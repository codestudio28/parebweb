const router = require('express').Router();
let Account = require('../models/account.model');
let Member = require('../models/member.model');

// Add account
router.route('/add').post((req, res) => {
    const usertype = req.body.usertype;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const datecreated = req.body.datecreated;
    const status = req.body.status;

    Account.find({
        email: email
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json('202');

        } else {
            const newAccount = new Account({
                usertype,
                email,
                password,
                profile,
                lastname,
                firstname,
                middlename,
                datecreated,
                status
            });
            newAccount.save()
                .then(() => {
                    res.json(newAccount._id)
                })
                .catch(err => res.status(400).json('Error: ' + err));
            
        }
    });
});

// Get User
router.route('/').get((req, res) => {
    Account.find((err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);
        }else {
            return res.json(account);
        }
    });
});

// // Update Administrator

// update administrator
router.route('/update/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.lastname = req.body.lastname;
        account.firstname = req.body.firstname;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// remove administrator
router.route('/remove/:id').post((req,res) =>{
    const status=req.body.status;
    Account.findById(req.params.id)
      .then(account => {
        account.status = status;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});
// retrieve administrator
router.route('/retrieve/:id').post((req,res) =>{
    const status=req.body.status;
    Account.findById(req.params.id)
      .then(account => {
        account.status = status;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update first name member
router.route('/update/member/firstname/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.firstname = req.body.firstname;
        account.save()
                  .then(() => {
                    res.json('101')
                  })
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update middle name member
router.route('/update/member/middlename/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.middlename = req.body.middlename;
        account.save()
                  .then(() => {
                    res.json('101')
                  })
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update last name member
router.route('/update/member/lastname/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.lastname = req.body.lastname;
        account.save()
                  .then(() => {
                    res.json('101')
                  })
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update member profile
router.route('/update/memberprofile/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.profile = req.body.profile;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// // update administrator from active to remove
// router.route('/remove/:id').post((req,res) =>{
//     const status = req.body.status;
//     Account.findById(req.params.id)
//       .then(account => {
//         account.status = status;
//         account.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });

// // update administrator from remove to active
// router.route('/retrieve/:id').post((req,res) =>{
//     const status = req.body.status;
//     Account.findById(req.params.id)
//       .then(account => {
//         account.status = status;
//         account.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });

// //Delete Administrator
router.route('/:id').delete((req, res) => {
    Account.findByIdAndDelete(req.params.id)
        .then(() => res.json('Account deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// // Get all remove administrator
// router.route('/remove').get((req, res) => {
//     const status='REMOVED';
//     const usertypes='administrator';
//     Account.find({
//         status: status,
//         usertype:usertypes
//     }, (err, account) => {
//         if (err) {
//             return res.json('404');
//         } else if (account.length > 0) {
//             return res.json(account);

//         }else {
//             return res.json(account);
//         }
//     });
// });

// // Get administrator by id
// router.route('/:id').get((req,res) =>{
//     Account.findById(req.params.id)
//         .then(account =>res.json(account))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// Login
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const status = "ACTIVE";

    Account.find({
        email : email,
        password : password,
        status : status
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        } else {
            return res.json('303');
        }
    });
});

module.exports = router;