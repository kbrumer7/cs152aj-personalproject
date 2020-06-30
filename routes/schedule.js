/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* add the value in the body to the list associated to the key */
router.post('/',
  isLoggedIn,
  async (req, res, next) => {
      const schedule = new Schedule(
        {name:req.body.name,
         time:req.body.time,
         days:req.body.days,
         link:req.body.link,
         userId: req.user._id
        })
      await schedule.save();
      res.redirect('/schedule')
});

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /schedule/remove/:itemId")
      await Schedule.remove({_id:req.params.itemId});
      res.redirect('/schedule')
});


// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await Schedule.find({userId:req.user._id})
      res.render('schedule');
});


module.exports = router;
