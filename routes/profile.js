
const isAuthenticated = require('../passport/auth.js')
const express = require("express");
const db = require("../models/index");
module.exports = (jsonParser, urlencoded) => {
    const router = express.Router();

router.post('/', isAuthenticated, async (req,res)=>{

    const userProfile = await db.User.findAll({ where: { id: req.session.passport.user } }).then(
      (result) => result[0]["dataValues"]
    );
    const currentGames = await db.Session.findAll({ where: { users_id: req.session.passport.user } }).then(
      (result) =>{
        if(result.session == undefined){
          return []
        }
        
        return result[0]["dataValues"]
      }
      );

      


      delete userProfile.password
      
  
  
/*       console.log('babanas: ',req.session.passport)
 */  
      res.status(200).json(userProfile)
  })
  return router
}