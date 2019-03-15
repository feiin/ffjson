const ffjson = require('../index');
const should = require('should');

describe('ffjson tests', () => {

    describe('filterFormatJSON()', () => {
        it('should fitler and format success 1', (done) => {

            let str = '{"a":1,"b":2,"c":[1,2,3],"d":{"e":3,"f":3}}aaa[1,2,3,5]';
            let results = ffjson.filterFormatJSON(str);
            results.length.should.be.equal(3);
            results[0].isJson.should.be.true()
            results[1].isJson.should.be.false()
            results[2].isJson.should.be.true()
            results[0].content.should.be.an.Object();
            results[1].content.should.be.equal('aaa');
            results[2].content.should.be.an.Array();
            done();
        })

        it('should fitler and format success 1', (done) => {

            let str = '{"a":a,"b":2,"c":[1,2,3],"d":{"e":3,"f":3}}aaa[1,2,3,5]';
            let results = ffjson.filterFormatJSON(str);
            results[0].isJson.should.be.false()
            results[1].isJson.should.be.false()
            results[2].isJson.should.be.true()
            done();
        })
    })
})