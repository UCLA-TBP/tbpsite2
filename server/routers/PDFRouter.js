const express = require('express');
const PDFRouter = express.Router();
const multer = require('multer');
const PDF = require('../schemas/PDFSchema');

// Set up multer storage options
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle file upload form submission
PDFRouter.post('/upload', upload.single('pdf'), (req, res) => {
  // Extract PDF file data from form submission
  const { originalname, mimetype, buffer } = req.file;
  const ref = JSON.parse(req.body.userRef);
  let cloudinaryUploadStream = cloudinary.uploader.upload_stream(
    { folder: 'TestPDFs' },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: { msgBody: 'Error uploading PDF', msgError: true },
        });
        return;
      }
      const newPDF = new PDF({
        user: ref._id,
        filename: originalname,
        contentType: mimetype,
        cloudinaryURL: result.secure_url,
        subject: req.body.subject,
        classNumber: req.body.classNumber,
        professor: req.body.professor,
        testType: req.body.testType,
        testNum: req.body.testNum,
      });
      newPDF
        .save()
        .then((savedPDF) => {
          res.status(201).json({
            message: {
              msgBody: 'PDF successfully uploaded',
              msgError: false,
            },
            pdfId: savedPDF._id,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: { msgBody: 'Error uploading PDF', msgError: true },
          });
        });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(cloudinaryUploadStream);
});

// Get all PDFs
PDFRouter.post('/get-all-pdfs', (req, res) => {
  console.log('getting');
  PDF.find()
    .sort([
      ['subject', 1],
      ['classNumber', 1],
    ])
    // PDF.aggregate([
    //   // { $group: { _id: '$subject', classNumbers: { $push: '$classNumber' } } },
    //   // { $sort: { _id: 1 } },
    //   { $sort: { subject: 1 } },
    // ])
    // PDF.find()
    .skip(req.body.batchSize * (req.body.batchNum - 1))
    .limit(req.body.batchSize)
    .then((PDFs) => {
      console.log('stuck');
      res.send(PDFs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not retrieve PDFs');
    });
});

// Get PDF by ID
PDFRouter.get('/get-pdf/:id', (req, res) => {
  PDF.findById(req.params.id)
    .then((pdf) => {
      res.send(pdf);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not retrieve user by id from database');
    });
});

// Download PDF byID
PDFRouter.get('/download/:id', async (req, res) => {
  try {
    const pdf = await PDFSchema.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }
    const filePath = path.join(__dirname, '../uploads', pdf.filename);
    res.download(filePath, pdf.filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

PDFRouter.get('/delete-bad-pdf', (req, res) => {
  // PDF.findByIdAndRemove('6438f6268150e65ba49793c4')
  // PDF.findByIdAndRemove('6438f62a8150e65ba49793ce')
  // PDF.findByIdAndRemove('6438f62b8150e65ba49793d3')
  // PDF.findByIdAndRemove('6438f6298150e65ba49793c8')
  // PDF.findByIdAndRemove('6438f6288150e65ba49793c6')
  // PDF.findByIdAndRemove('6438f6298150e65ba49793ca')
  PDF.findByIdAndRemove('6438f62b8150e65ba49793d1')
    .then((pdf) => {
      console.log(pdf);
      res.status(200).send('successful deletion');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not remove');
    });
});

module.exports = PDFRouter;
