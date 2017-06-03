const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

Todo.remove({}).then((result) => {
    console.log(result);
});

Todo.findOneAndRemove({_id:'example id'}).then((result) =>{
    console.log(result);
})

Todo.findByIdAndRemove({'exampleid'}).then((result) =>{
    console.log(result);
})