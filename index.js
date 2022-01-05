const express = require('express')
//const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const port = process.env.port || 3000;
const fs = require('fs');
const dataPath = './src/data/db.json';
app.use(cors())

const routes = require('./src/routes/routes.js');

routes(app, fs, dataPath);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logErrors);
// app.use(clientErrorHandler);
// app.use(errorHandler);



// app.get('/', (req, res) => {
//   res.end('Hello World!');
// });

// app.route('/list_movies')
//   .get((req, res) => {
//     readFile(data => {
//       res.send(data);
//     }, true);
//       // fs.readFile(__dirname + '/' + 'db.json', 'utf8', (err, data) => {
//       //     res.end(data);
//       // });
//   })
//   .post((req, res) => {
//     fs.readFile(__dirname + '/' + 'db.json', 'utf8', (err, data) => {
//         res.end(data);
//     });
//   })

//   app.route('/users')
//     .post('/users', (req, res) => {
//       readFile(data => {
//         // Note: this needs to be more robust for production use. 
//         // e.g. use a UUID or some kind of GUID for a unique ID value.
//         const newUserId = Date.now().toString();
    
//         // add the new user
//         data[newUserId] = req.body;
    
//         writeFile(JSON.stringify(data, null, 2), () => {
//           res.status(200).send('new user added');
//         });
//       }, true);
//     });

// function logErrors(err, req, res, next) {
//     console.log(err.stack);
//     next(err);
// }

// function errorHandler (err, req, res, next) {
//     res.status(500)
//     res.render('error', { error: err })
// }

// function clientErrorHandler (err, req, res, next) {
//     if (req.xhr) {
//       res.status(500).send({ error: 'Something failed!' })
//     } else {
//       next(err)
//     }
// }