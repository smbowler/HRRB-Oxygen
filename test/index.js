// --------- API test ------------------ //
// ------------------------------------- //

'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server/server.js');

var server = request.agent("http://localhost:3000");

//test user
var user = {
  displayName: "user2",
  emailAddress: "user1@google.com1",
  profileImageURL: "http://myur:users1",
  destination: "Streetcar Depot1-2",
  favorites : ["des11", "dest21"],
  contacts: {
    name: 'mom',
    phoneNumber : '347-123-1111',
    message: "almost there.yo."
  }
};

var userUpdate = {
  destination: "new dest1",
  favorites : ["newdes", "newdes2"],
  contacts: {
    name: 'papa',
    phoneNumber : '347-123-1111',
    message: "almost there.yo."
  }
}


test('All users returned', function (t) {
  server
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      console.log(res.body);

      t.error(err, 'No error');
      // t.same(res.body, expectedUsers, 'Users as expected');
      t.end();
    });
});

test('Get a single user', function (t) {
  server
    .get('/api/users/565e1cac918003082bb0ef06')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      console.log(res.body);

      t.error(err, 'No error');
      t.same(res.body._id, '565e1cac918003082bb0ef06', 'Users as expected');
      t.end();
    });
});

test('user creation test', function (t) {
  server
    .post('/api/users')
    .send(user)
    .expect(200)
    .end(function (err, res) {
      console.log(res.body);
      t.error(err, 'No error');
      t.end();
    });
});

test('user update test', function (t) {
  server
    .put('/api/users/565e1cac918003082bb0ef06')
    .send(user)
    .expect(200)
    .end(function (err, res) {
      console.log(res.body);
      t.error(err, 'No error');
      t.end();
    });
});
