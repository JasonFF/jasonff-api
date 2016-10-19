var router = require('express').Router();

router.get('/' ,function(req, res) {
    res.send({
      status:1,
      msg:'success',
      data: 'hello jasonff'
    })
})

module.exports = router;
