const mongoose = require('mongoose')


const connectDB = (uri) => {
    return mongoose.connect(uri, {
        // useNewUrlParser: true,  // uses by default parameter or options but it changes by time to time.
    })
}

module.exports = connectDB