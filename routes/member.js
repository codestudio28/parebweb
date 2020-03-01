const router = require('express').Router();
let Member = require('../models/member.model');

// Add member
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const orgid = req.body.orgid;
    const status = req.body.status;
    const link = req.body.link;


    const newMember = new Member({
        userid,
        link,
        lastname,
        firstname,
        middlename,
        orgid,
        status
    });
    newMember.save()
        .then(() => {
            res.json('101')
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

// Get Member
router.route('/').get((req, res) => {
    Member.find((err, member) => {
        if (err) {
            return res.json('404');
        } else if (member.length > 0) {
            return res.json(member);
        }else {
            return res.json(member);
        }
    });
});


// update Member
router.route('/update/:id').post((req,res) =>{
    Member.findById(req.params.id)
      .then(member => {
        member.lastname = req.body.lastname;
        member.firstname = req.body.firstname;
        member.middlename = req.body.middlename;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update Member firstname
router.route('/update/firstname/:id').post((req,res) =>{
    Member.findById(req.params.id)
      .then(member => {
        member.firstname = req.body.firstname;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update Member middlename
router.route('/update/middlename/:id').post((req,res) =>{
    Member.findById(req.params.id)
      .then(member => {
        member.middlename = req.body.middlename;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update Member lastname
router.route('/update/lastname/:id').post((req,res) =>{
    Member.findById(req.params.id)
      .then(member => {
        member.lastname = req.body.lastname;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// //Delete Member
router.route('/:id').delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// update member from active to remove
router.route('/remove/:id').post((req,res) =>{
    const status = req.body.status;
    Member.findById(req.params.id)
      .then(member => {
        member.status = status;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update member from active to remove
router.route('/retrieve/:id').post((req,res) =>{
    const status = req.body.status;
    Member.findById(req.params.id)
      .then(member => {
        member.status = status;
        member.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update member link
router.route('/link/:id').post((req,res) =>{
  const link = req.body.link;
  Member.findById(req.params.id)
    .then(member => {
      member.link = link;
      member.save()
                .then(() => res.json('101'))
                .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: '+ err))
});


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