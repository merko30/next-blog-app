var mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB).then(() => {
    console.log('Connected')
}).catch(error => {
    console.log('Error')
})