var express = require('express');
var app = express();
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://rprashanth1211:Pr%40%24h%40nth1211@cluster0.cp00gz8.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
let dbCollection;

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function dbConnection(collectionName) {
    client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('DB Connected');
            console.log(dbCollection);
        } else {
            console.log(err);
        }
    });
}

function insert(beach, callback) {
    dbCollection.insertOne(beach, callback);
}

function remove(beach, callback) {
    dbCollection.deleteOne(beach, callback);
}

function getAllbeaches(callback) {
    dbCollection.find().toArray(callback);
}

app.get('/api/beaches',(req,res) => {
    getAllbeaches((error, result) => {
        if (error) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Successfully'});
        }
    });
    //res.json({statusCode: 200, data: cardList, message:"Success"})
});

app.post('/api/beaches', (req, res) => {
    let cat = req.body;
    insert(cat, (err, result) => {
        if (err) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Cat successfully added'});
        }
    });
});

app.delete('/api/beaches', (req, res) => {
    let cat = req.body;
    remove(cat, (err, result) => {
        if (err) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Cat successfully Deleted'});
        }
    });
});

var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log('App listening to: ' + port);
    dbConnection('Cats');
})
