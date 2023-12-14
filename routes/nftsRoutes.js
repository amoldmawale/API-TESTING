const express = require("express");
const app = express();
const nftControllers = require("../controllers/nftController");

const router = express.Router();

// router.param("id", nftControllers.checkId);
router
  .route("/")
  .get(nftControllers.getAllNfts)
  // .post(nftControllers.checkBody, nftControllers.createNfts);
  .post(nftControllers.createNfts);
router
  .route("/:id")
  .get(nftControllers.getSingleNft)
  .patch(nftControllers.updateNfts)
  .delete(nftControllers.deleteNfts);

module.exports = router;
