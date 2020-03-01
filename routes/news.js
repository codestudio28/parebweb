const router = require('express').Router();
let News = require('../models/news.model');

// Add News
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const banner = req.body.banner;
    const userid = req.body.userid;
    const datecreated = req.body.datecreated;
    const status = req.body.status;

    const newNews = new News({
        title,
        content,
        banner,
        userid,
        datecreated,
        status
    });
    newNews.save()
        .then(() => {
            res.json(newNews._id)
        })
        .catch(err => res.status(400).json('Error: ' + err));


});

// Get News
router.route('/').get((req, res) => {
    News.find((err, news) => {
        if (err) {
            return res.json('404');
        } else if (news.length > 0) {
            return res.json(news);
        } else {
            return res.json(news);
        }
    });
});

// retrieve single news
router.route('/:id').get((req,res) =>{
    News.findById(req.params.id)
        .then(news =>res.json(news))
        .catch(err => res.status(400).json('Error: ' + err));
});


// // Update News - Published

router.route('/publish/:id').post((req,res) =>{
    News.findById(req.params.id)
      .then(news => {
        news.status = req.body.status;
        news.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// // Update News - Information

router.route('/update/:id').post((req,res) =>{
    News.findById(req.params.id)
      .then(news => {
        news.title = req.body.title;
        news.content = req.body.content;
        news.banner = req.body.banner;
        news.status = req.body.status;
        news.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// remove news
router.route('/remove/:id').post((req,res) =>{
    const status=req.body.status;
    News.findById(req.params.id)
      .then(news => {
        news.status = status;
        news.save()
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

// //Delete Administrator
// router.route('/:id').delete((req, res) => {
//     Account.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Account deleted'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

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