const mysql = require('mysql')

//Mysql
const con = mysql.createPool({
    connectionLimit:10,
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME
});

exports.view = (req,res)=>{

    // check database connection
    con.getConnection((err,connection)=> {
        if(err) throw err
        //console.log("Connection success");
        connection.query('select * from users',(err,rows)=>{
            connection.release();
            if(!err){
                //console.log("good");
                res.render('home',{rows});
            }else{
                console.log("Error has occured " + err);
            }
        })
    });

}

// if mysql not connect type and execute => alter user 'root'@'localhost' identified with mysql_native_password by 'root';

exports.adduser = (req,res)=>{
    res.render('adduser');
}

exports.save = (req,res)=>{
    con.getConnection((err,connection)=> {
        if(err) throw err
        
        const {name,age,city} = req.body;

        connection.query('insert into users (NAME,AGE,CITY) values (?,?,?)',[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                //console.log("good");
                res.render('adduser',{msg: 'student details added success!'});
            }else{
                console.log("Error has occured " + err);
            }
        })
    });
}

exports.edituser = (req,res)=>{

    con.getConnection((err,connection)=> {
        if(err) throw err

        let id = req.params.id;
        connection.query('select * from users where id=?',[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edituser',{rows});
            }else{
                console.log("Error has occured " + err);
            }
        })
    });
    
}

exports.edit = (req,res)=>{
    con.getConnection((err,connection)=> {
        if(err) throw err
                
        const {name,age,city} = req.body;
        let id = req.params.id;

        connection.query('update users set NAME=?,AGE=?,CITY=? where ID=?',[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){

                con.getConnection((err,connection)=> {
                    if(err) throw err
            
                    let id = req.params.id;
                    connection.query('select * from users where id=?',[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('edituser',{rows,msg:"user details updated success"});
                        }else{
                            console.log("Error has occured " + err);
                        }
                    })
                });

            }else{
                console.log("Error has occured " + err);
            }
        })

    });
}

exports.delete = (req,res)=>{

    con.getConnection((err,connection)=>{
        if(err) throw err;

        let id = req.params.id;
        connection.query('delete from users where id=?',[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect('/')
            }else{
                console.log("Error has occured " + err);
            }
        })
    })

}