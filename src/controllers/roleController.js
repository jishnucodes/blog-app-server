import Role from "../models/roleModel.js"

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({}).exec();
        if (!roles) {
            return res.status(400).json({
                status: false,
                error: "No active roles"
            })
        }

        res.status(200).json({
            status: true,
            responseObject: roles
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: "server error occured in getting roles"
        })
    }
}

export {getRoles}