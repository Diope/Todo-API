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
        var text = "";

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
        })
    })
});