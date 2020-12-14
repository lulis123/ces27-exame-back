const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const mongoosePatchUpdate = require('mongoose-patch-update');
const walletController = require('./controllers/walletController');

//Setting-up Mongoose
mongoose.plugin(mongoosePatchUpdate);
mongoose.Promise = global.Promise;

//Connecting to mongoose
mongoose.connect("mongodb+srv://db_user:QduvOWN5umKNTX6X@ces27-exame.wenge.mongodb.net/ces27-exame?retryWrites=true&w=majority",{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then( connection => {
   console.log('Successfully connected to Mongodb')
}).catch( err => {
   console.log('error connecting to MongoDB');
   console.log(err);
   process.exit();
}); 

//Setting up morgan
app.use(morgan('combined'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/wallet',walletController);

app.listen();
