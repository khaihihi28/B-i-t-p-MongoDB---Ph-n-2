const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
// const db = "mongodb+srv://khaitqph25638:1234@cluster1.fevxhlz.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to database')
    } catch (erro) {
        console.log("lỗi")
        process.exit(1)
    }
}

module.exports = connectDB