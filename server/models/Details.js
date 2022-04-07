const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    },
    description: {
        type: String,
        required: 'This fild is required.'
    },
    phone: {
        type: String,
        required: 'This fild is required.'  
    },
    category: {
        type: String,
        enum: ['Quan 2', 'Quan 3', 'Quan 4', 'Quan 5', 'Quan 6'],
        required: 'This fild is required.'
    },
    image: {
        type: String,
        required: 'This fild is required.'
    },
}); 

detailsSchema.index({name: 'text', description: 'text', category: 'text'});




module.exports = mongoose.model('Details', detailsSchema);