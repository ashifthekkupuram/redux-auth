import User from '../models/user.model.js'
import Note from '../models/note.model.js'

export const get_notes = async (req, res, next) => {
    try{
        const user = await User.findById(req._id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const notes = await Note.find({author: user}).sort('-updatedAt')

        return res.status(200).json({
            success: true,
            message: 'Notes retrieved',
            notes,
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}