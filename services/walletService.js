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

   async updateByWalletAddr(WalletData){
      const walletExists = await WalletModel.exists({walletAddr: WalletData.walletAddr});
      if (!walletExists)
         return null;
      return await WalletModel.patchUpdate({symbol: WalletData.symbol}, WalletData);
   }

   async getByWalletAddr({symbol}){
      return await WalletModel.findOne({symbol}).lean();
   }

   async getAll(query) {
      return await WalletModel.find(query).sort({walletAddr:1}).lean();

   }

   async deleteByWalletAddr({walletAddr}) {
      let walletExists = await WalletModel.exists({walletAddr});
      if (!walletExists)
         return null;
      return await WalletModel.deleteOne({symbol});
   }
}

const walletServiceInstance = new WalletService;
module.exports = walletServiceInstance;
