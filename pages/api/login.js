import user from "@/models/users";
import connectDB from "../middleware/mongooes";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        let users = await user.findOne({ "email": req.body.email })
        if (users) {

            if (req.body.email == users.email && req.body.password == users.password) {
                res.status(200).json({ success: true, email: users.email, name: users.name })

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