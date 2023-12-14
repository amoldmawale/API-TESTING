//-------------This is for MongoDB database-------------------
const mongoose = require("mongoose");
const NFT = require("../models/nftModel");

exports.getAllNfts = async (req, res) => {
  try {
    //Methods to apply filters and we are building query
    // const allNFT = await NFT.find({
    //   maxGroupSize: 8,
    //   priceDiscount: 15,
    // });
    //-------------------------------------------------

    // const allNFT = await NFT.find()
    //   .where("maxGroupSize")
    //   .equals(8)
    //   .where("priceDiscount")
    //   .equals(15);
    //-------------------------------------------------------------------
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limits", "fields"];
    excludedFields.forEach((eL) => delete queryObj[eL]);
    //Advance Filtering Query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // console.log(req.query, queryObj);
    //Executing query
    let query = await NFT.find(JSON.parse(queryStr));

    //Applying SORT method
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    }

    const allNFT = await query;
    //Send response
    res.status(200).json({
      status: "success",
      results: allNFT.length,
      data: {
        allNFT,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.createNfts = async (req, res) => {
  //const newNFT = new NFT({}) ................................................This is old method
  //newNFT.save();
  try {
    const newNFT = await NFT.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        nft: newNFT,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.getSingleNft = async (req, res) => {
  try {
    const singleNFT = await NFT.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        singleNFT,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.updateNfts = async (req, res) => {
  try {
    const updateNFT = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      nft: updateNFT,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.deleteNfts = async (req, res) => {
  try {
    await NFT.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Data deleated successfully.",
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

// ----------------This is for Local database---------------------

// const fs = require("fs");

// const nfts = JSON.parse(
//   fs.readFileSync(`${__dirname}/../nft-data/data/simple.json`)
// );
// exports.checkId = (req, res, next, value) => {
//   console.log(`Id from NFT is ${value}`);
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Fail",
//       Message: "Invalid Id",
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.age || !req.body.city) {
//     res.status(400).json({
//       status: "fail",
//       Message: "Please complete all fields",
//     });
//   }
//   next();
// };

// exports.getAllNfts = (req, res) => {
//   console.log(`you hit to get all requests on ${req.requestTime}`);
//   res.status(200).json({
//     status: "success",
//     requestTime: req.requestTime,
//     results: nfts.length,
//     data: {
//       nfts,
//     },
//   });
// };

// //-----------------------POST METHOD-----------------------------------------------------------
// exports.createNfts = (req, res) => {
//   // console.log(req.body);
//   const newId = nfts[nfts.length - 1].id + 1;
//   const newNFTS = Object.assign({ id: newId }, req.body);
//   nfts.push(newNFTS);
//   fs.writeFile(
//     `${__dirname}/nft-data/data/simple.json`,
//     JSON.stringify(nfts),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         // requestTime: req.requestTime,
//         nfts: newNFTS,
//       });
//     }
//   );
// };

// //------------------------GET DATA-------------------------------
// // app.get("/api/v1/nfts/:id/:a/:b?", (req, res) => {               //................................For Multiple Ids
// exports.getSingleNft = (req, res) => {
//   // console.log(req.params);
//   const id = req.params.id * 1;
//   const nft = nfts.find((eL) => eL.id === id);
//   // if (id > nfts.length) {                                       //........................This is also validator
//   if (!nft) {
//     return res.status(404).json({
//       status: "Fail",
//       Message: "Invalid Id",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: { nft },
//   });
// };

// //---------------------PATCH DATA---------------------
// exports.updateNfts = (req, res) => {
//   if (req.params.id * 1 > nfts.length) {
//     return res.status(404).json({
//       status: "Fail",
//       Message: "Invalid Id",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       nft: "Updating nfts",
//     },
//   });
// };

// //---------------------DELETE DATA---------------
// exports.deleteNfts = (req, res) => {
//   res.status(204).json({
//     status: "success",
//     data: {
//       nft: null,
//     },
//   });
// };
