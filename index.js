
var express = require('express');
var app = express();








var bodyParser = require('body-parser');
app.use(express.static('public'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: false
//   }));
const cors = require('cors');
app.use(cors({origin: process.env.CLIENT_URL})); 
app.use(cors({
    origin:["http://localhost:3000","https://thriving-mandazi-2580ba.netlify.app"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true
}));
app.use(function(req, res, next) {
  const originDomain = req.get('origin');
  console.log('Origin Domain:', originDomain);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'https://thriving-mandazi-2580ba.netlify.app');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  // app.use(bodyParser.json({ limit: '10mb' }));
  // app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const data_base = require("./config/db");
data_base.Connect_db();
 const authRoutes = require("./routes/authRoute");
 const categoryRoutes = require("./routes/categoryRoutes");
 const brandsRoutes = require("./routes/brandsRoute");
 const productRoutes = require("./routes/productRoute");
 const cartRoutes = require("./routes/cartRoute");
 const sizeRoutes = require("./routes/sizeRoute");
 const webhookRoutes = require("./routes/webhookRoute");
 app.use("/api/v1/auth/",webhookRoutes.router);

app.use(express.json());
app.use("/api/v1/auth/",authRoutes.router);
app.use("/api/v1/auth/",categoryRoutes.router);
app.use("/api/v1/auth/",brandsRoutes.router);
app.use("/api/v1/auth/",productRoutes.router);
app.use("/api/v1/auth/",cartRoutes.router);
app.use("/api/v1/auth/",sizeRoutes.router);

app.listen(5000);








