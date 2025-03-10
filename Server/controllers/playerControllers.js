const Player = require("../models/Players")
const csv = require('csvtojson')


const importPlayers = async(req,res)=>{
    try{
        var playerData = [];

        csv()
        .fromFile(req.file.path)
        .then(async(respone)=>{
        
            
            
            for(var x=0;x<respone.length;x++){
                playerData.push({
                    Name: respone[x].Name,
                    University: respone[x].University,
                    Category: respone[x].Category,
                    TotalRuns: respone[x].TotalRuns,
                    BallsFaced: respone[x].BallsFaced,
                    InningsPlayed: respone[x].InningsPlayed,
                    Wickets: respone[x].Wickets,
                    OversBowled: respone[x].OversBowled,
                    RunsConceded: respone[x].RunsConceded,

                });
            }

            await Player.insertMany(playerData);
            
        })

        res.send({
            status:200,
            success:true,
            msg:"Csv Imported"
        });
    }catch(err){
res.send({
    status:400,
    success:false,
    msg:err.message
});
    }
}


const getAllUsers = async (req, res, next) => {
  let players;

  //get all users
  try {
    players = await Player.find();
  } catch (err) {
    console.log(err);
  }

  //not found
  if (!players) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //display all users
  return res.status(200).json({ players});
};




module.exports = {
    importPlayers,
    getAllUsers
}