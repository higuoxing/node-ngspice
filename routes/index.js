const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',  async (req, res, next) => {
  // passing socket config to template file
  const socket_conf = require('../configs/default').socket_conf;
  return res.render('index', { socket_conf: socket_conf });
});

module.exports = router;
