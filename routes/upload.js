const express = require('express');
const router = express.Router();
const tmp_file_path = require('../configs/default').tmp_file_path;
const process_upload_file = require('../utils/upload').process_upload_file;
const upload = require('multer')({ dest: tmp_file_path });

router.post('/', upload.single('lib'), async (req, res, next) => {
  let data = await process_upload_file(req.file);
  res.send(data);
});

module.exports = router;
