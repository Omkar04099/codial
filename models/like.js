const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    // Defines object Id of liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // Defines type of liked object
    onModel:{
        type: String,
        retuire: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;