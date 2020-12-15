const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 80;
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
app.use(helmet());

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/wallet',walletController);
app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));
app.use('/', (req,res,next)=> {
   res.status(400).send("Seja bem vindo à API do exame de CES-27 dos alunos: Luís Eduardo e Italo Rennan")
})