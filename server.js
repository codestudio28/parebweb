const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// 1
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// 2
app.use(fileUpload());

app.use(cors());
app.use(express.json());

// mongoose.Promise = global.Promise;
const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true, useCreateIndex: true
}
);


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database established successfully");
})


const accountRouter = require('./routes/account');
const newsRouter = require('./routes/news');
const orgRouter = require('./routes/organization');
const officerRouter = require('./routes/officer');
const memberRouter = require('./routes/member');
const networkRouter = require('./routes/network');
const realtyRouter = require('./routes/realty');
const expertiseRouter = require('./routes/expertise');
const interestRouter = require('./routes/interest');
const eventRouter = require('./routes/event');

app.use('/accountrouter',accountRouter);
app.use('/newsrouter',newsRouter);
app.use('/orgrouter',orgRouter);
app.use('/officerrouter',officerRouter);
app.use('/memberrouter',memberRouter);
app.use('/networkrouter',networkRouter);
app.use('/realtyrouter',realtyRouter);
app.use('/expertiserouter',expertiseRouter);
app.use('/interestrouter',interestRouter);
app.use('/eventrouter',eventRouter);
// 3
// app.post('/profile', (req, res) => {
//     if (req.files === null) {
//         return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const file = req.files.file;

//     var tempDate = new Date();
//     var date = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds();
//     // const currDate = "Current Date= " + date;

//     file.name = date+''+file.name;

//     file.mv(`${__dirname}/todo-react/public/profile/${file.name}`, err => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }
       
//         // console.log(file.name);
//         res.json({ fileName: file.name, filePath: `/profile/${file.name}` });
//         // res.json('Article Added!');
//     });
// });


if (process.env.NODE_ENV === "production") {
    app.use(express.static('todo-react/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'todo-react', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}

);