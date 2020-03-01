const router = require('express').Router();
let Network = require('../models/network.model');

// Add network
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const network = req.body.network;
  

    const newNetwork = new Network({
        userid,
        network
    });
    newNetwork.save()
        .then(() => {
            res.json('101')
        })
        .catch(err => res.status(400).json('Error: ' + err));
        
});

// Get Network
router.route('/').get((req, res) => {
    Network.find((err, network) => {
        if (err) {
            return res.json('404');
        } else if (network.length > 0) {
            return res.json(network);
        }else {
            return res.json(network);
        }
    });
});



// update network
router.route('/update/:id').post((req,res) =>{
    Network.findById(req.params.id)
      .then(network => {
        network.network = req.body.network;
        network.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
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
    Network.findByIdAndDelete(req.params.id)
        .then(() => res.json('Network deleted'))
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