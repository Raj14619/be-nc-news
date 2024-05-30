const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const endpoints = require('../endpoints.json')

beforeEach(() => seed(testData))

afterAll(() =>db.end())



describe('/api/topics', () => {
    test('GET:200 sends an object of topics to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) =>{
            //console.log(body)
            expect(body.topics).toHaveLength(3)
            body.topics.forEach((topic) => {
               // console.log(topic)

                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })

        });
    })
})


// I think we should have had api call all other
describe('/api/', () => {
    test('GET:200 sends an object with API endpoints to the client', async () => {
      const response = await request(app).get('/api/').expect(200);
      const body = response.body;
  
     // console.log(body);

      expect(body).toBeInstanceOf(Object);
  
      expect(body).toHaveProperty('GET /api');
      expect(body).toHaveProperty('GET /api/articles');
      expect(body).toHaveProperty('GET /api/articles/:article_id');
      expect(body).toHaveProperty('GET /api/topics');
  
      expect(body['GET /api']).toMatchObject({
        description: expect.any(String),
      });
  
      expect(body['GET /api/articles']).toMatchObject({
        description: expect.any(String),
        exampleResponse: expect.any(Object),
        queries: expect.any(Array),
      });

      //console.log(body['GET /api/articles/:article_id'])
  
      expect(body['GET /api/articles/:article_id']).toMatchObject({
        article_id: expect.any(String),
        article_img_url: expect.any(String),
        author: expect.any(String),
        created_at: expect.any(String),
        title: expect.any(String),
        topic: expect.any(String),
        votes: expect.any(Number),
      });
  
        //console.log(body['GET /api/topics'])

      expect(body['GET /api/topics']).toMatchObject({
        description: expect.any(String),
        exampleResponse: expect.any(Object),
        queries: expect.any(Array),
      });
  
      expect(body['GET /api/topics'].exampleResponse.topics).toBeInstanceOf(Array);
      body['GET /api/topics'].exampleResponse.topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  }
);


// fix this later - doesnt work
describe('/api/articles/:articles_id', () => {
    test('GET:200 sends an object of topics to the client when making a valid request', () => {
        return request(app)
        .get('/api/articles/')
        .expect(200)
        .then(({body}) =>{
            let obj = body[0]
          //  console.log(obj)

            expect(obj).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number)
            })
            //expect(body.topics).toHaveLength(3)
      

        });
    })


    test('GET:200 sends undefined to the client when making an invalid number request for the articles', () => {
      return request(app)
      .get('/api/articles/9999')
      .expect(200)
      .then(({body}) =>{
          let obj = {body}

          let obj2 = obj[0];

        //  console.log(obj2)

         expect(obj2).toBe(undefined)
      });
  })
})




describe('/api/articles/', () => {
  test('GET:200 sends an object of topics to the client when making a valid request', () => {
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) =>{
          let obj = body

          let obj2 = obj[0]

        //  console.log(obj2)

         // console.log({body})

          expect(obj2).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String)
          })
          //expect(body.topics).toHaveLength(3)
    

      });
  })
})




describe('/api/articles/:article_id/comments', () => {
  test('GET:200 sends an object of topics to the client when making a valid request', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) =>{
          let obj = body

          let obj2 = obj[0]

          console.log(obj2)

         // console.log({body})

          expect(obj2).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          })
      });
  })


  test('sends status code 404 and undefined to the client when making an invalid article_id number request', () => {
    return request(app)
    .get('/api/articles/50000/comments')
    .expect(404)
    .then(({body}) =>{
        let obj = body

        let obj2 = obj[0]

        console.log(obj2)

       // console.log({body})

        expect(obj2).toBe(undefined)
    });
})


test('sends status code 404 and an empty object of topics to the client when making an invalid article_id request', () => {
  return request(app)
  .get('/api/articles/raj/comments')
  .expect(400)
  .then(({body}) =>{
      let obj = body

      let obj2 = obj[0]

      console.log(obj2)

     // console.log({body})

      expect(obj2).toBe(undefined)
  });
})


})



//q7 to do


//q8 test cases

describe('PATCH /api/articles/:article_id', () => {
  it('should update an article with valid inc_votes', async () => {
    const articleId = 1;
    const newVotes = 10;

    const response = await request(app)
        .patch(`/api/articles/${articleId}`)
        .send({ inc_votes: newVotes })
        .expect(200);

    // check that the response body contains the updated article
    expect(response.body).toHaveProperty('article_id', articleId);
    expect(response.body).toHaveProperty('votes', newVotes);
})

  it('should return 400 if inc_votes is not provided', async () => {
      const articleId = 1;

      await request(app)
          .patch(`/api/articles/${articleId}`)
          .expect(400);
  });

  it('should return 400 if inc_votes is not a number', async () => {
      const articleId = "1";

      await request(app)
          .patch(`/api/articles/${articleId}`)
          .send({ inc_votes: 'not_a_number' })
          .expect(400);
  });

  it('should return 404 if article_id does not exist', async () => {
      const articleId = 999;

      await request(app)
          .patch(`/api/articles/${articleId}`)
          .send({ inc_votes: 10 })
          .expect(404);
  });
});



// q9
describe('DELETE /api/comments/:comment_id', () => {
  it('should delete a comment by comment_id', async () => {
    // 
    const commentIdToDelete = 1;

    // Send a DELETE request to the endpoint
    const response = await request(app)
      .delete(`/api/comments/${commentIdToDelete}`)
      .expect(204); // Expect a 204 No Content response
  });
});



describe('GET /api/users', () => {
  test('should get all users', async () => {
    const response = await request(app).get('/api/users').expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach(user => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('avatar_url');
    });
  });
});

