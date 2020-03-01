const router = require('express').Router();
let Realty = require('../models/realty.model');

// Add Realty
router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    const realty = req.body.realty;

    const newRealty = new Realty({
        userid,
        realty
    });
    newRealty.save()
        .then(() => {
            res.json('101')
        })
        .catch(err => res.status(400).json('Error: ' + err));


});

// Get Realty
router.route('/').get((req, res) => {
    Realty.find((err, realty) => {
        if (err) {
            return res.json('404');
        } else if (realty.length > 0) {
            return res.json(realty);
        } else {
            return res.json(realty);
        }
    });
});


// update realty
router.route('/update/:id').post((req,res) =>{
    Realty.findById(req.params.id)
      .then(real => {
        real.realty = req.body.realty;
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




// //Delete Realty
router.route('/:id').delete((req, res) => {
    Realty.findByIdAndDelete(req.params.id)
        .then(() => res.json('Realty deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;