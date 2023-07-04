const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/contact',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact.html'));
    
})

// /admin/add-product =>POST
router.post('/contact',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/success');
})

module.exports = router;