class WalletService{

   toObject(WalletModel){
      return WalletModel ? WalletModel.toObject() : null;
   }

   async create(WalletData){
      let walletExists = await WalletModel.exists({walletAddr: WalletData.walletAddr});
      if (walletExists)
         return null;
      const Wallet = new WalletModel(WalletData);
      
      return this.toObject(await Wallet.save())
   }

   async updateByWalletAddr({walletAddr}){
      const walletExists = await WalletModel.exists({walletAddr});
      if (!walletExists)
         return null;
      return await WalletModel.patchUpdate({walletAddr}, WalletData);
   }

   async getByWalletAddr({walletAddr}){
      return await WalletModel.findOne({walletAddr}).lean();
   }

   async deleteByWalletAddr({walletAddr}) {
      let walletExists = await WalletModel.exists({walletAddr});
      if (!walletExists)
         return null;
      return await WalletModel.deleteOne({walletAddr});
   }
}

const walletServiceInstance = new WalletService;
module.exports = walletServiceInstance;
