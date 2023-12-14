const fs = require("fs");
const express = require("express");
const { log } = require("console");
const morgan = require("morgan");
const app = express();
app.use(express.json());
const nftsRouter = require("./routes/nftsRoutes");
const usersRouter = require("./routes/usersRoute");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  console.log(`It is ${process.env.NODE_ENV}server`);
}

//-----------Serving Template Also--------------------------

app.use(express.static(`${__dirname}/nft-data/img`)); //For surf images or static files

//--------------Custom MiddelWare----------------------------

app.use((req, res, next) => {
  console.log("This is middelware");
  next();
});

app.use((req, res, next) => {
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
  };
  req.requestTime = new Date().toLocaleString("en-IN", options);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welocome to API Testing", api: "NFT API" });
});

//-------------------------------Router Section---------------------------------------------------

// app.get("/api/v1/nfts", getAllNfts);                 //................................We can also use this method
// app.post("/api/v1/nfts", createNfts);
// app.get("/api/v1/nfts/:id", getSingleNft);
// app.patch("/api/v1/nfts/:id", updateNfts);
// app.delete("/api/v1/nfts/:id", deleteNfts);

//------------------------User Router------------------------------------------

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
