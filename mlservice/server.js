const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const request = require('request');
const fs = require("fs");
const PORT = 3050;
const HOST = '0.0.0.0';


var storage = multer.diskStorage({
  destination: 'images',
  limits: { fileSize: 1000000 },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
      console.log(file.originalname);
    },
  fileFilter(req,file,cb){
    if (!file.originalname.endsWith('.csv')){
        return cb(new Error('Upload CSV'))
    }
    cb(undefined,true)
  }
});
var upload = multer({ storage: storage })

const ior_url = 'https://invoice-object-recommendation-trial.cfapps.eu10.hana.ondemand.com/api/v1/ivp/inference';
//const ior_auth = 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vODZlMmY2NzB0cmlhbC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktNTUyODAyNDA0IiwidHlwIjoiSldUIn0.eyJqdGkiOiI5NjExMGQwNGQ2ZjY0M2E4YmJkZWVmMWUxNTRjOGQ0MSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJlZDAxMjNjNS04NzdjLTRmNjctODBhMy0yOTI1NjNmYzM5OTciLCJ6ZG4iOiI4NmUyZjY3MHRyaWFsIiwic2VydmljZWluc3RhbmNlaWQiOiI1YTc1MjEzNy0wNTZiLTQ0MjgtYWQ2NS1mN2ZiZTA4OGJhOGUifSwic3ViIjoic2ItNWE3NTIxMzctMDU2Yi00NDI4LWFkNjUtZjdmYmUwODhiYThlIWI5NTc1OHxpb3ItdHJpYWwhYjUxMjEzIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIiwiaW9yLXRyaWFsIWI1MTIxMy5kZWZhdWx0Il0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImlvci10cmlhbCFiNTEyMTMuZGVmYXVsdCJdLCJjbGllbnRfaWQiOiJzYi01YTc1MjEzNy0wNTZiLTQ0MjgtYWQ2NS1mN2ZiZTA4OGJhOGUhYjk1NzU4fGlvci10cmlhbCFiNTEyMTMiLCJjaWQiOiJzYi01YTc1MjEzNy0wNTZiLTQ0MjgtYWQ2NS1mN2ZiZTA4OGJhOGUhYjk1NzU4fGlvci10cmlhbCFiNTEyMTMiLCJhenAiOiJzYi01YTc1MjEzNy0wNTZiLTQ0MjgtYWQ2NS1mN2ZiZTA4OGJhOGUhYjk1NzU4fGlvci10cmlhbCFiNTEyMTMiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjhhZDk3ZTgiLCJpYXQiOjE2Mjg3Mzg5ODgsImV4cCI6MTYyODc4MjE4OCwiaXNzIjoiaHR0cHM6Ly84NmUyZjY3MHRyaWFsLmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiJlZDAxMjNjNS04NzdjLTRmNjctODBhMy0yOTI1NjNmYzM5OTciLCJhdWQiOlsiaW9yLXRyaWFsIWI1MTIxMyIsInNiLTVhNzUyMTM3LTA1NmItNDQyOC1hZDY1LWY3ZmJlMDg4YmE4ZSFiOTU3NTh8aW9yLXRyaWFsIWI1MTIxMyIsInVhYSJdfQ.eKFtv6YMVpAIIRDESsH6orWzZ8HH6kBIijb-aqo-ugwtzEXzJ3q4dIMcdvD1JNvWNYKgb_bWcRMm_jK_RfnhLepF4H_XI8yX_9MlH25ck6R9qZ0_MVJje2NORU1LBMyt2Rz81aBcpvb_ZzqBFc6zXgoWEtM1hvXDJJL1lDyNWNthWXGi6TeKc89jYS2nL7qax3i3T2ak-H1Hb_L4iJCvW9l0NyAuNjJW-ryYqDqojZdg-RFnrgdCes2hm324RqzXNDwUlT5jrOwhzKIykycKsp35UBNB2DoRSDnitJ85KVKm87Lyum3w0dPhKtv_96sYTisLeRVGxzxA-soCaJgFqw';
const clientID = 'sb-5a752137-056b-4428-ad65-f7fbe088ba8e!b95758|ior-trial!b51213';
const clientSecret = 'Z5WwyNU7Hmxl/GKQE2esUSsl0Fk=';
const url = 'https://86e2f670trial.authentication.eu10.hana.ondemand.com/oauth/token';

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

var obj = {message: 'SSM'};
obj.message;

var objmsg = {message: 'Uploaded'};
objmsg.message;

var objfail = {message: 'Failed'};
objmsg.message;

app.post('/ml/file',  upload.single('upload'),  (req,res) => { 
  //const filbin = req.file.buffer ;
  console.log(req.file.filename)
  const filename = path.join(__dirname, req.file.filename);
  console.log('file path - '+filename)
//console.log(contentType);
//Get Token
 request({
  url: url,
  method: 'POST',
  auth: {
    user: clientID,
    pass: clientSecret
  },
  form: {
    'grant_type': 'client_credentials'
  }
}, function (error, response) {
 var json = JSON.parse(response.body);
  
 var ior_auth = 'Bearer' + ' ' + json.access_token;
   
// var options = { method: 'POST',
//   url: ior_url,
//   headers: 
//    { 
//     'Content-Type': 'multipart/form-data',
//     'Authorization': ior_auth,
//     'accept': 'application/json' },
//   formData: 
//    { file:  
//       { value: fs.createReadStream(filename), 
//         options: { name: 'Inference-Sample.csv', contentType: null } }
//       } };
  
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   resultml = response.body;
//   console.log(resultml);
// });

res.send(objmsg)
res.status(200).end()
})
});

app.listen(PORT, HOST, function () {
  console.log('listening on', HOST, ':', PORT);
});
