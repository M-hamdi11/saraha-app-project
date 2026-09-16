import mongoose from "mongoose";

export async function connectdb() {

    try {
        await mongoose.connect('mongodb://localhost:27017/saraha-app-db')
        console.log('mongo db connected succesfully')


    } catch (err) {
        console.log(err)
    }

}