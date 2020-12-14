const express = require('express');
const walletService = require('../services/walletService');
const router = express.Router();

router.put('/updateWallet',
    async(req,res,next) => {
        try{
            if(req.body.myWalletAddr == req.body.walletAddr)
                const updatedWallet = await walletService.updateByWalletAddr(req.body)

            else
               res.status(200).send({error: "You can't update a wallet that is not yours"});

        }
    }
)

router.post('/createWallet',
  async(req,res,next) => {
      try{
         const createdWallet = await walletService.create(req.body);
         if (createdWallet != null){
            res.status(200).send({createdWallet});
            res.locals.createdOk = true;
            console.log(res.locals);
         }
         else
            res.status(403).send({ error: "wallet already exists!" });
      }catch(error){
         console.log(error);
         res.status(400).send();
      }
      next();
   },
   );

router.get('/getWallet', async (req,res,next) => {
   try {
    ///ADICIONAR CÓDIGO QUE CHEGA COM O CONTRATO
	  console.log(req.query)
      const wallet = await walletService.getBySymbol(req.query);
      if (wallet != null)
         res.status(201).json({wallet});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});

router.delete('/deleteWallet', async(req,res,next) => {
   try{
      const deletedWallet = await walletService.deleteBySymbol(req.query);
      if (deletedWallet != null){
         res.locals.deletedOk = true;
         res.status(200).send({deletedWallet});
      }
      else
         res.status(202).send({ error: "Wallet doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});

module.exports = router;