const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');

const WalletSchema = new mongoose.Schema({

    ///Falta adicionar: bid (vetor de objetos que é usado para comunicar com o contrato)
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },

   walletAddr:{
       type:mongoose.Schema.Types.String,
       auto:false,
       descrpition:"Endereço da carteira"
   },

   contractAddr:{
      type:mongoose.Schema.Types.String,
      required:true,
      description: "Endereço do contrato que controla o acesso à carteira"
   },

   name:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Nome do dono da carteira"
   },

   age: {
       type:mongoose.Schema.Types.Number,
       required:true,
       descrption:"Idade do dono da carteira"
   },

   weight: {
        type:mongoose.Schema.Types.Number,
        required:true,
        description: "Peso do dono da carteira"
   },

   height:{
       type:mongoose.Schema.Types.Number,
       required:true,
       description:"Altura do dono da carteira"
   },

   abi:{
        type:mongoose.Schema.Types.Array,
        default: [],
        description: "vetor de objetos que é utilizdo para comunicação com o contrato"
   }

}, {
   timestamps: true
});

///Index Creation
WalletSchema.index({createdAt: 1});
WalletSchema.index({createdAt: -1});

//Defining sortable attributes
const sortableAttributes = [
   'createdAt',
   'name',
   'walletAddr',
   'contractAddr'
];

const protectedAttributes = [
    'walletAddr',
    'contractAddr'
];

//Creating the Schema BoilerPlate
WalletSchema.statics.getSortableAttributes = () => sortableAttributes;
WalletSchema.plugin(mongoosePaginate);
WalletSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('WalletSchema',WalletSchema);
