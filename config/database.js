var mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(() => {
    console.log('Connected')
}).catch(error => {
    console.log('Error')
})