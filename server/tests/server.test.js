const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('👯 Should create a new todo 👯', (done) => {
        var text = 'This is a test, yatta';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('😢 should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/')
            .send({})
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });
});


describe('GET /todos', () => {
    it('Should get all todos ✅', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('Should return a 404 error if todo not found', (done) => {
        var hexedId = new ObjectID().toHexString()
        request(app)
            .get(`/todos/${hexedId}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 error for non-object ids', (done) => {
        request(app)
            .get(`/todos/439ss92s`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done()
                }).catch((e) => done(e));
            })
    });

    it('Should return a 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 if object ID is invalid', (done) => {
        request(app)
            .delete('/todos/a93nkj')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('Should update the Todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        var text = "This is the new test string";

        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: true,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = "This is another new test string!";

        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    })
})
