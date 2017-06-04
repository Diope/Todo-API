const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "password@123";

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// });

var hashedPassword = '$2a$10$BROhSNUbAyInctwRTqQQoeCPT8AQFrdeVgUkTePD0SXwY4gN2htmy'

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'password');
// console.log(token)

// var decoded = jwt.verify(token, "password");
// console.log(`decoded:`, decoded)

// var message = "This is a user string"
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`)

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed! Yatta! 😍');
// } else {
//     console.log('Data compromised 🙍🏾‍')
// }
