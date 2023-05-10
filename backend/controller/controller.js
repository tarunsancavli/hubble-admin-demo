require('dotenv').config();

const { getDB } = require('../config/db');

const createUser = async (req,res) => {
    const db = getDB();
    let data = JSON.parse(JSON.stringify(req.body));
    const userData = JSON.parse(data["data"]);
    if(userData){
        db.collection('users').insertOne(userData);
        res.status(200).json({

            "response": "User created successfully"
        })
    }
    else {
        res.status(400).json({
            "response": "Bad Request"
        })
    }
}

const getUserList = async (req,res) => {
    
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const search = req.query.search;
    let users,total_count;
    let query = [
        {$match: { $or: [{first_name: {
            $regex: ".*" + `${search}` + ".*",
            $options: "i"
        }},{email: {
            $regex: ".*" + `${search}` + ".*",
            $options: "i"
        }}]}},
      { $sort: { updated_at: -1 } },
      { $skip: page * limit },
      { $limit: limit },
    ];

    
    const db = getDB();

    
    
    users = await db.collection('users').aggregate(query).toArray();

    total_count = await db.collection('users').countDocuments();
    
    return res.json({
        total: total_count,
        page: page,
        pageSize: users.length,
        Users: users,
        total_pageCount: Math.ceil(total_count / limit),
      });
}

module.exports = {createUser, getUserList};