const chai = require('chai');
const server = require('./app.js');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('API Testing', () => {

    it('Non-Object Value', (done) => {
        chai.request(server)
            .post('/create/value/{"new":"val"/40')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Value type should be Object, Invlid value type');
                done();
            });
    });

    it('Create with more than 32 Characters in Key', (done) => {
        chai.request(server)
            .post('/create/qwertyuiopasdfghjklzxcvbnm12345678000/{"new":"val"}/40')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key lenght is capped at 32 Characters, Invalid Length of Key');
                done();
            });
    });

    it('Create with TTL', (done) => {
        chai.request(server)
            .post('/create/value/{"new":"val"}/40')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key-Value pair successfully inserted');
                done();
            });
    });
    it('Create Already Existing Key', (done) => {
        chai.request(server)
            .post('/create/value/{"new":"val"}/40')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key already Exists, Invalid Query');
                done();
            });
    });
    it('Read Key (With TTL)', (done) => {
        chai.request(server)
            .get('/read/value')
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('{"new":"val"}');
                done();
            });
    });
    it('Delete Key (With TTL)', (done) => {
        chai.request(server)
            .post('/delete/value')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key-Value pair successfully Deleted');
                done();
            });
    });
    it('Create Key (No TTL)', (done) => {
        chai.request(server)
            .post('/create/val/{"new":"val"}')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key-Value pair successfully inserted');
                done();
            });
    });
    it('Read Key (No TTL)', (done) => {
        chai.request(server)
            .get('/read/val')
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('{"new":"val"}');
                done();
            });
    });
    it('Delete Key (No TTL)', (done) => {
        chai.request(server)
            .post('/delete/val')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key-Value pair successfully Deleted');
                done();
            });
    });
    it('Read on Key Unavailable', (done) => {
        chai.request(server)
            .get('/read/value')
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key entered does not exist');
                done();
            });
    });
    it('Delete a Key which is Unavailable', (done) => {
        chai.request(server)
            .post('/delete/value')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Key entered does not exist');
                done();
            });
    });
    it('Invalid Route', (done) => {
        chai.request(server)
            .post('/')
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('Invalid Route<br> Valid Routes are: <br> 1.POST /create/key/value <br> 2.GET /read/key <br> 3.POST /delete/key');
                done();
            });
    });
    it('Key Expiry Test TTL value', (done) => {
        chai.request(server)
            .post('/create/value/{"new":"val"}/40')
            .send()
            .end((err, response) => {
                setTimeout(()=>{
                    chai.request(server)
                    .get('/read/value')
                    .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.a('string');
                    response.text.should.equal('Key Expired , You cannot perform Read or Delete Operations.')
                    })},500000)
                done();
            });
    });
    it('Key Expiry Test TTL value', (done) => {
        chai.request(server)
            .post('/create/v/{"new":"val"}/40')
            .send()
            .end((err, response) => {
                setTimeout(()=>{
                    chai.request(server)
                    .post('/delete/value')
                    .send()
                    .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.a('string');
                    response.text.should.equal('Key Expired , You cannot perform Read or Delete Operations.')
                    })},500000)
                done();
            });
    });
    it('Cleaning the DataBase', (done) => {
        chai.request(server)
            .post('/clearDB')
            .send()
            .end((err, response) => {
                response.should.have.status(200);
                response.text.should.be.a('string');
                response.text.should.equal('DB Cleared');
                done();
            });
    });
});
