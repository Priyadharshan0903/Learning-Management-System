// import express, { Request, Response } from "express";

// const multer = require("multer");
// const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//         cb(null, "uploads/"); // Define the destination folder where files will be saved

//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });
// const fileFilter = function (req, file, cb) {
//   if (
//     file.mimetype === "application/pdf" ||
//     file.mimetype === "application/msword"
//   ) {
//     cb(null, true); // Accept PDF and DOC files
//   } else {
//     cb(
//       new Error("Invalid file format. Only PDF and DOC files are allowed."),
//       false
//     );
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// // Route for file upload
// app.post("/upload", upload.single("file"), function (req, res, next) {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   // File was successfully uploaded
//   res.send("File uploaded successfully.");
// });
