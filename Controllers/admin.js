const con = require('../db_connect');
const getAllUser = async (req, res, next) => {
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
    con.query("SELECT * FROM users",(err,results)=>{
      res.render('admin',{
        active5: true,
        admin,
        results,
        name:req.session.name,
    })
    }) 
   
  };
  
  // Get single user (admin)
const getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    
  
    res.status(200).json({
      success: true,
      user,
    });
  };

  
// Delete User --Admin
const deleteUser =async (req, res, next) => {
  let admin;
  if(req.session.isadmin == 1)
  {
      admin = true;   
  }
  else{
      admin = false;
  }
  var sql = "DELETE FROM users WHERE id= ?";
    con.query(sql,[req.params.id],function(err,result){
        if(err) throw err;
        res.redirect('/admin/users')
    })
};

module.exports  = {getAllUser,getSingleUser,deleteUser}