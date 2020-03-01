const router = require('express').Router();
let Officer = require('../models/officer.model');

// Add officer
router.route('/add').post((req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const position = req.body.position;
    const orgid = req.body.orgid;

    Officer.find({
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        position: position,

    }, (err, officer) => {
        if (err) {
            return res.json('404');
        } else if (officer.length > 0) {
            return res.json('202');

        } else {
            const newOfficer = new Officer({
                lastname,
                firstname,
                middlename,
                position,
                orgid
            });
            newOfficer.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get Officer
router.route('/').get((req, res) => {
    Officer.find((err, officer) => {
        if (err) {
            return res.json('404');
        } else if (officer.length > 0) {
            return res.json(officer);
        }else {
            return res.json(officer);
        }
    });
});

// // Update Administrator

// update officer
router.route('/update/:id').post((req,res) =>{
    Officer.findById(req.params.id)
      .then(officer => {
        officer.lastname = req.body.lastname;
        officer.firstname = req.body.firstname;
        officer.middlename = req.body.middlename;
        officer.position = req.body.position;
        officer.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// //Delete Administrator
router.route('/:id').delete((req, res) => {
    Officer.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// remove administrator
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
// // retrieve administrator
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
// s

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