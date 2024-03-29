const express = require('express');
const PDFRouter = express.Router();
const multer = require('multer');
const PDF = require('../schemas/PDFSchema');

// Set up multer storage options
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');
const { default: mongoose } = require('mongoose');

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
        term: {
          quarter: req.body.termQuarter,
          year: req.body.termYear,
        },
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

//TODO DEAL WITH CS130 vs CS 130
PDFRouter.post('/search-pdfs', (req, res) => {
  const queryData = req.body.queryData;

  const query = {};
  Object.entries(queryData).forEach(([key, val]) => {
    if (val !== '') {
      if (key === 'termQuarter') {
        query['term.quarter'] = val;
      } else if (key === 'termYear') {
        query['term.year'] = val;
      } else if (key === 'professor') {
        query['professor'] = { $regex: val, $options: 'i' };
      } else {
        query[key] = val;
      }
    }
  });

  PDF.find(query)
    .sort([
      ['subject', 1],
      ['classNumber', 1],
    ])
    .skip(req.body.batchSize * (req.body.batchNum - 1))
    .limit(req.body.batchSize)
    .then((PDFs) => {
      res.send(PDFs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not search pdfs in database');
    });
});

PDFRouter.post('/update-pdf', (req, res) => {
  const updatedData = req.body.updatedData;

  const updates = {};
  Object.entries(updatedData).forEach(([key, val]) => {
    if (key !== 'id' && val !== '') {
      if (key === 'termQuarter') {
        updates['term.quarter'] = val;
      } else if (key === 'termYear') {
        updates['term.year'] = val;
      } else {
        updates[key] = val;
      }
    }
  });

  PDF.findByIdAndUpdate(updatedData.id, updates)
    .then((updatedPDF) => {
      res.send(updatedPDF);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not update pdf');
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
      res.status(500).send('Could not retrieve pdf by id from database');
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

// When we delete a PDF by ID, the underlying Cloudinary file is not being deleted.
// I tried doing what we did in UserRouter, but I was having trouble figuring
// out how to delete the pdf from Mongo and Cloudinary atomically
// Since we don't have a million PDFs, deleting the pdf just from Mongo should be
// fine for now
PDFRouter.post('/delete-pdf-by-id', (req, res) => {  
    PDF.findByIdAndRemove(req.body.pdfId)
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
