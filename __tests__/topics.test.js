const db = require('../db/connection');
const seed = require('../db/seeds/seed'); 
const data = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../app');
const Test = require('supertest/lib/test')


beforeALl(() => seed(data));
afterALl(() => eb.end());




describe("GET /api/topics", () => {

    test('responding with 200 status code', function () {
        request(app)
        .get('/api/topics')
        .then((topics) =>{
            topics.forEach((topic) =>{
                console.log(topic)
            });
        })



    })


})