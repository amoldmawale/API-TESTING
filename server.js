const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./index");

const DB = process.env.MONGO_URL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("database connected successfully");
  });
// console.log(process.env);

// const testNFT = new NFT({
//   name: "The Lion King",
//   rating: 4.2,
//   price: 567,
// });
// testNFT
//   .save()
//   .then((docNft) => {
//     console.log(docNft);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
