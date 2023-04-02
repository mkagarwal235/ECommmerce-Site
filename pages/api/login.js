import user from "@/models/users";
import connectDB from "../middleware/mongooes";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let users = await user.findOne({ "email": req.body.email })
        const bytes=CryptoJS.AES.decrypt(users.password,process.env.AES_SECRET);
        let decryptedPass=bytes.toString(CryptoJS.enc.Utf8);
        if (users) {

            if (req.body.email == users.email && req.body.password == decryptedPass) {
                var token = jwt.sign({email: users.email, name: users.name }, process.env.JWT_SECRET, {expiresIn: '2d'} );
                res.status(200).json({success: true,token})

            }
            else {

                res.status(200).json({ success: false, error: "Invalid Credential" })
            }

        }
        else {

            res.status(200).json({ success: false, error: "No User Found" })
        }

    }
    else {
        res.status(404).json({ error: "Method Not Allowed" })
    }

}
export default connectDB(handler);