const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoApi', (err, db) => {
    if (err) {
       return console.log('Unable to connect to server');
    }
    console.log ('Connected to server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: "Ain't tryna be nobody's hero"}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: "Else"}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.close();
});