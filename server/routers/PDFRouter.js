const express = require('express');
const PDFRouter = express.Router();
const multer = require('multer');
const PDF = require('../schemas/PDFSchema');

// Set up multer storage options
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file upload form submission
PDFRouter.post('/upload', upload.single('pdf'), (req, res) => {
    // Extract PDF file data from form submission
    const { originalname, mimetype, buffer } = req.file;
    const ref = JSON.parse(req.body.userRef);
  
    // Create new PDF object with extracted data
    const newPDF = new PDF({
      user: ref._id, // set user to the logged in user's id
      filename: originalname,
      contentType: mimetype,
      data: buffer,
      subject: req.body.subject,
      classNumber: req.body.classNumber,
      professor: req.body.professor
    });
  
    // Save the new PDF object to MongoDB
    newPDF.save()  
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
  });

// Get all PDFs
PDFRouter.get('/get-all-PDFs', (req, res) => {
    PDF.find()
      .then((PDFs) => {
        res.send(PDFs)
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

module.exports = PDFRouter;
