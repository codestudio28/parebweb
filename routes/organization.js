const router = require('express').Router();
let Organization = require('../models/organization.model');

// Add Organization
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const email = req.body.email;
    const logo = req.body.logo;
    const president = req.body.president;
    const orgaccr = req.body.orgaccr;
    const orgname = req.body.orgname;
    const city = req.body.city;
    const province = req.body.province;

    Organization.find({
        email: email
    }, (err, org) => {
        if (err) {
            return res.json('404');
        } else if (org.length > 0) {
            return res.json('202');

        } else {
            const newOrganization = new Organization({
                userid,
                email,
                logo,
                president,
                orgaccr,
                orgname,
                city,
                province
            });
            newOrganization.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get Organization
router.route('/').get((req, res) => {
    Organization.find((err, org) => {
        if (err) {
            return res.json('404');
        } else if (org.length > 0) {
            return res.json(org);
        }else {
            return res.json(org);
        }
    });
});

// // Update Administrator

// update org name
router.route('/update/orgname/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.orgname = req.body.orgname;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});
// update org accr
router.route('/update/orgaccr/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.orgaccr = req.body.orgaccr;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update org president
router.route('/update/president/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.president = req.body.president;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update org city
router.route('/update/city/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.city = req.body.city;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update org province
router.route('/update/province/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.province = req.body.province;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update org logo
router.route('/update/logo/:id').post((req,res) =>{
    Organization.findById(req.params.id)
      .then(org => {
        org.logo = req.body.logo;
        org.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// // remove administrator
// router.route('/remove/:id').post((req,res) =>{
//     const status=req.body.status;
//     Account.findById(req.params.id)
//       .then(account => {
//         account.status = status;
//         account.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });
// retrieve administrator
// router.route('/retrieve/:id').post((req,res) =>{
//     const status=req.body.status;
//     Account.findById(req.params.id)
//       .then(account => {
//         account.status = status;
//         account.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });

// // update administrator profile
// router.route('/update/profile/:id').post((req,res) =>{
//     Account.findById(req.params.id)
//       .then(account => {
//         account.image = req.body.image;
//         account.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });

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
    Organization.findByIdAndDelete(req.params.id)
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



module.exports = router;