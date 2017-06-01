// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoApi', (err, db) => {
    if (err) {
       return console.log('Unable to connect to server');
    }
    console.log ('Connected to server');

    db.collection('Todos').insertOne({
        text: 'Else',
        completed: true
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('User').insertOne({
    //     name: "Diamond Glass",
    //     age: 26,
    //     location: {
    //         lat: 23.454334553,
    //         lng: -234.343233,
    //         address: "Springton, Hell"
    //     }
    // }, (err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert information', err)
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});