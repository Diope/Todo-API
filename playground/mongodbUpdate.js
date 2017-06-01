const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApi', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('592f74a1883d0b47668c0282')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('User').findOneAndUpdate({
        _id: new ObjectID('592f69780e4c393eb442e0cc')
    }, {
        $set: {
            name: "Kalani"
        },
        $inc: {
            age: 4
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    // db.close();

});