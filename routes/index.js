const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',  async (req, res, next) => {
  // passing socket config to template file
  const deploy_domain = require('../configs/default').deploy_domain;
  const port = require('../configs/default').port;
  return res.render('index', { socket_conf: deploy_domain + ':' + port });
});

module.exports = router;
