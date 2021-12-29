const db = require('../data/db-object')

const appRouter = (app, fs, dataPath) => {
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  };
  
  app.use ((req,res,next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
  })

  // READ
  app.route('/weather')
    .post((req, res) => {
      getWeatherData(req,res);
    })
    .get((req, res) => {
      getWeatherData(req,res);
    })

  const getWeatherData = (req, res) => {
    console.log("in request..");
    readFile(data => {
      let gs = Object.assign(new db("db001"), data);
      if(req.query.citynames !== undefined) {
        res.send(gs.listCityNames());
      } else if(req.query.city !== undefined) {
        res.send(gs.getWetherByCity(req.query.city));
      }else if(req.query.search !== undefined) {
        res.send(gs.getSearchByCity(req.query.search));
      } else {
        res.send({'error': 'no data found'});
      }
    }, true);
    console.log("out request....");
  }

  // const writeFile = (
  //   fileData,
  //   callback,
  //   filePath = dataPath,
  //   encoding = 'utf8'
  // ) => {
  //   fs.writeFile(filePath, fileData, encoding, err => {
  //     if (err) {
  //       throw err;
  //     }
  //     callback();
  //   });
  // };

// // CREATE
//   app.post('/weather', (req, res) => {
//     readFile(data => {
//         // Note: this isn't ideal for production use. 
//         // ideally, use something like a UUID or other GUID for a unique ID value
//         const newUserId = Date.now().toString();
//         // add the new user
//         let citylist = data['citylist'];
//         data['citylist'] = [...citylist, req.body];

//         writeFile(JSON.stringify(data, null, 2), () => {
//             res.status(200).send('new user added');
//         });
//     }, true);
//   });


// // UPDATE
//   app.put('/users/:id', (req, res) => {
//       readFile(data => {

//           // add the new user
//           const userId = req.params["id"];
//           data[userId] = req.body;

//           writeFile(JSON.stringify(data, null, 2), () => {
//               res.status(200).send(`users id:${userId} updated`);
//           });
//       }, true);
//   });


//   // DELETE
//   app.delete('/users/:id', (req, res) => {

//     readFile(data => {

//         // delete the user
//         const userId = req.params["id"];
//         delete data[userId];

//         writeFile(JSON.stringify(data, null, 2), () => {
//             res.status(200).send(`users id:${userId} removed`);
//         });
//     }, true);
//   });
};

module.exports = appRouter;