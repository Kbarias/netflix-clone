const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
//async means that before saving the user, it gets the answer first. makes the saving process wait
router.post("/register", async (req,res) => {
    //uses the crypto library for hashing the password
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
    });

    try{
        //*takes time to save the user
        const user = await newUser.save();
        //*before saving tries to access the user
        res.status(201).json(user);
    } catch {
        res.status(500).json(err);
    }

});

//LOGIN
router.post("login", async (req,res) => {
    try{
        //check that the user exists
        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("Wrong password or username");

        //decrypts the hashed user password to determine if matching with what user entered to login
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        //check if passwords match
        originalPassword !== req.body.password && res.status(401).json("Wrong password or username");

        //hides the user id and isadmin info in the token
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin}, 
            process.env.SECRET_KEY, {expiresIn:"5d"}
        );

        //saves the password information in local storage and just returns the other user info so password is not seen
        const {password, ...info} = user._doc;

        //sends all the user information and the access token
        res.status(200).json({...info, accessToken});

    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;