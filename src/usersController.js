const Users = require('./models/UsersModel.js');
const validate = require('./validateUserData.js');

exports.addUser = (req, res) => {
    console.log("working")
}

exports.getUserById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).json({ message: "It's not a valid Id." });

    const user = await Users.findById(req.params.id);

    if (!user) 
        return res.status(404).json({ message: "No data related to this id." });

    return res.json({ message: "Success" });
}