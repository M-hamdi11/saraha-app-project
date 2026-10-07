import mongoose from "mongoose";

export async function connectdb() {

    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION)
        console.log('mongo db connected succesfully')


    } catch (err) {
        console.log(err)
    }

}