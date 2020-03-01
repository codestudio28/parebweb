const router = require('express').Router();
let Expertise = require('../models/expertise.model');

// Add Expertise
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const expertise = req.body.expertise;

    const newExpertise = new Expertise({
        userid,
        expertise
    });
    newExpertise.save()
        .then(() => {
            res.json('101')
        })
        .catch(err => res.status(400).json('Error: ' + err));


});

// Get Expertise
router.route('/').get((req, res) => {
    Expertise.find((err, expertise) => {
        if (err) {
            return res.json('404');
        } else if (expertise.length > 0) {
            return res.json(expertise);
        } else {
            return res.json(expertise);
        }
    });
});


// update Expertise
router.route('/update/:id').post((req,res) =>{
    Expertise.findById(req.params.id)
      .then(real => {
        real.expertise = req.body.expertise;
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




// //Delete Expertise
router.route('/:id').delete((req, res) => {
    Expertise.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;