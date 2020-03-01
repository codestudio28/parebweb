const router = require('express').Router();
let Interest = require('../models/interest.model');

// Add interest
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const interest = req.body.interest;

    const newInterest = new Interest({
        userid,
        interest
    });
    newInterest.save()
        .then(() => {
            res.json('101')
        })
        .catch(err => res.status(400).json('Error: ' + err));


});

// Get interest
router.route('/').get((req, res) => {
    Interest.find((err, interest) => {
        if (err) {
            return res.json('404');
        } else if (interest.length > 0) {
            return res.json(interest);
        } else {
            return res.json(interest);
        }
    });
});


// update Interest
router.route('/update/:id').post((req,res) =>{
    Interest.findById(req.params.id)
      .then(real => {
        real.interest = req.body.interest;
        real.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});
// // update org accr
// router.route('/update/orgaccr/:id').post((req,res) =>{
//     Organization.findById(req.params.id)
//       .then(org => {
//         org.orgaccr = req.body.orgaccr;
//         org.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });




// //Delete interest
router.route('/:id').delete((req, res) => {
    Interest.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;