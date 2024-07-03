import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    note: {
        type: String,
        minLength: 3,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Note', NoteSchema)