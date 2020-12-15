const express = require('express');
const walletService = require('../services/walletService');
const router = express.Router();
const Web3 = require('web3');
let web3 = undefined


router.put('/updateWallet',
    async(req,res,next) => {
        try{
            console.log(req.body);
            if(req.body.myWalletAddr == req.body.walletAddr){
                const updatedWallet = await walletService.updateByWalletAddr(req.body)
                if(updatedWallet)
                    res.status(200).send();
                else
                    res.status(400).send(); 
            }else
               res.status(400).send({error: "You can't update a wallet that is not yours"});
        }catch(error){
            res.status(400).send({error});
        }
        next();
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
      const wallet = await walletService.getByWalletAddr(req.query);
      if (wallet == null)
        res.status(204).send("Wallet not found");
        else{
                res.status(201).json({wallet});
        }
        } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});

router.delete('/deleteWallet', async(req,res,next) => {
   try{
      const deletedWallet = await walletService.deleteByWalletAddr(req.query);
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