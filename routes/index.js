const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',  async (req, res, next) => {
  // passing socket config to template file
  const socket_url = require('../configs/default').socket_url;
  return res.render('index', { socket_conf: socket_url });
});

module.exports = router;
