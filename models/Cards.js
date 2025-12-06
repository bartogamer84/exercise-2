import mongoose from 'mongoose';

const cardShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        like: {
            type: Boolean,
            default: false,
        }
    },
    {
        timeStamps: true,
    }
);

export const Card = mongoose.model('Card', cardShema);