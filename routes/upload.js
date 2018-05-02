const express = require('express');
const router = express.Router();
const tmp_file_path = require('../configs/default').tmp_file_path;
const upload = require('multer')({ dest: tmp_file_path });

router.post('/', upload.single('lib'), async (req, res, next) => {
  console.log(req.body);
  res.send('success');
});

module.exports = router;
