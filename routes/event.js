const router = require('express').Router();
let Event = require('../models/event.model');

// Add Event
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const dates = req.body.dates;
    const content = req.body.content;
    const description = req.body.description;
    const times = req.body.times;
    const place = req.body.place;
    const banner = req.body.banner;
    const userid = req.body.userid;
    const datecreated = req.body.datecreated;
    const status = req.body.status;

    const newEvent = new Event({
        title,
        dates,
        content,
        description,
        times,
        place,
        banner,
        userid,
        datecreated,
        status
    });
    newEvent.save()
        .then(() => {
            res.json(newEvent._id)
        })
        .catch(err => res.status(400).json('Error: ' + err));


});

// Get Event
router.route('/').get((req, res) => {
    Event.find((err, event) => {
        if (err) {
            return res.json('404');
        } else if (event.length > 0) {
            return res.json(event);
        } else {
            return res.json(event);
        }
    });
});

// retrieve single news
router.route('/:id').get((req,res) =>{
    Event.findById(req.params.id)
        .then(event =>res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});


// // Update News - Published

router.route('/publish/:id').post((req,res) =>{
    Event.findById(req.params.id)
      .then(event => {
        event.status = req.body.status;
        event.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// // Update News - Information

router.route('/update/:id').post((req,res) =>{
    Event.findById(req.params.id)
      .then(event => {
        event.title = req.body.title;
        event.dates = req.body.dates;
        event.content = req.body.content;
        event.description= req.body.description;
        event.times = req.body.times;
        event.place = req.body.place;
        event.banner = req.body.banner;
        event.status = req.body.status;
        event.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// remove events
router.route('/remove/:id').post((req,res) =>{
    const status=req.body.status;
    Event.findById(req.params.id)
      .then(event => {
        event.status = status;
        event.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});
// retrieve events
router.route('/retrieve/:id').post((req,res) =>{
    const status=req.body.status;
    Event.findById(req.params.id)
      .then(event => {
        event.status = status;
        event.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});
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

//Delete Event
router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted'))
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

// // Login
// router.route('/login').post((req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const status = "ACTIVE";

//     Account.find({
//         email : email,
//         password : password,
//         status : status
//     }, (err, account) => {
//         if (err) {
//             return res.json('404');
//         } else if (account.length > 0) {
//             return res.json(account);

//         } else {
//             return res.json('303');
//         }
//     });
// });

module.exports = router;