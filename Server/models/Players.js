const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    University:{
        type:String
    },
    Category:{
        type:String
    },
    TotalRuns:{
        type:Number
    },
    BallsFaced:{
        type:Number
    },
    InningsPlayed:{
        type:Number
    },
    Wickets:{
        type:Number
    },
    OversBowled:{
        type:Number
    },
    RunsConceded:{
        type:Number
    },


}
);

module.exports = mongoose.model('Players' ,playerSchema)