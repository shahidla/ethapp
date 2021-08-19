const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const request = require("request");
const fs = require("fs");
const PORT = 3050;
const HOST = '0.0.0.0';

var storage = multer.diskStorage({
  destination: "Inference",
  limits: { fileSize: 1000000 },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //date as file name + extension
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".csv")) {
      return cb(new Error("Upload CSV"));
    }
    cb(undefined, true);
  },
});

var upload = multer({ storage: storage });

var objmsg = { message: 'Uploaded' };
objmsg.message;

const ior_url =
  "https://invoice-object-recommendation-trial.cfapps.eu10.hana.ondemand.com/api/v1/ivp/inference";
const clientID =
  "sb-5a752137-213";
const clientSecret = "Z5WwyNUsUSsl0Fk=";
const url =
  "https://trial.authentication.eu10.hana.ondemand.com/oauth/token";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var options = {
  method: "POST",
  url: url,
  qs: { grant_type: "client_credentials" },
  auth: { user: clientID, pass: clientSecret },
};

// Functions
function authRequest(url) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);
        var bToken = "Bearer" + " " + json.access_token;
        resolve(bToken);
      } else {
        reject(error);
      }
    });
  });
}

function iorRequest(ior_url, ioroptions) {
  return new Promise(function (resolve, reject) {
    request(ioroptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function getFilename(req) {
  return new Promise(function (resolve, reject) {
    resolve(path.join(__dirname + "/Inference", req.file.filename));
  });
}

function getIoroptions(res, csvfile) {
  return new Promise(function (resolve, reject) {
    ior_options = {
      method: "POST",
      url: ior_url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: res,
        accept: "application/json",
      },
      formData: {
        file: {
          value: fs.createReadStream(csvfile),
          options: { name: "Inference-Sample.csv", contentType: null },
        },
      },
    };

    resolve(ior_options);
  });
}

// Async- Await
async function main(req) {
  let csvfile = await getFilename(req);
  let res = await authRequest(url);
  let ior_options = await getIoroptions(res, csvfile);
  //console.log(ior_options);
  let ior_result = await iorRequest(ior_url, ior_options);
  console.log(ior_result);
  let probability = await csvJson(ior_result);
  console.log(probability);
  let finalresult = await prepareResult(probability);
  console.log(finalresult);
  return finalresult;
}

function prepareResult(probability) {
  return new Promise(function (resolve, reject) {
    
    var obj = { RGA1: probability[0].recommended_account_HKONT_1, 
                PGA1: probability[0].probability_HKONT_1,
                RGA2: probability[0].recommended_account_HKONT_2, 
                PGA2: probability[0].probability_HKONT_2  
              };
    resolve(obj);

  });
}

function csvJson(ior_result) {
  return new Promise(function (resolve, reject) {
    const CSVToJSON = require('csvtojson');
    CSVToJSON().fromString(ior_result)
    .then(users => {
      resolve(users);
    }).catch(err => {
        console.log(err);
    });

  });
}

app.post("/ml/file", upload.single("upload"), (req, res) => {
  main(req).then(function (data) {
    //res.send(objmsg)
    res.send(data);
  });
});

app.listen(PORT, HOST, function () {
  console.log('listening on', HOST, ':', PORT);
});


///test 

app.get('/', (req, res) => {

res.send('test')
console.log('test');

});

