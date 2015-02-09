var assert = require('assert'),
    error = require('../../../lib/error/index'),
    math = require('../../../index'),
    approx = require('../../../tools/approx'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    sinh = math.sinh;

describe('sinh', function() {
  it('should return the sinh of a boolean', function () {
    approx.equal(sinh(true), 1.1752011936438014);
    approx.equal(sinh(false), 0);
  });

  it('should return the sinh of a null', function () {
    approx.equal(sinh(null), 0);
  });

  it('should return the sinh of a number', function() {
    approx.equal(sinh(0), 0);
    approx.equal(sinh(pi), 11.548739357257748);
    approx.equal(sinh(1), 1.1752011936438014);
  });

  it('should return the sinh of very small numbers (avoid returning zero)', function() {
    // If sinh returns 0, that is bad, so we are using assert.equal, not approx.equal
    assert.equal(sinh(-1e-10), -1e-10);
    assert.equal(sinh(1e-50), 1e-50);
  })

  it('should return the sinh of a bignumber', function() {
    var bigmath = math.create({number: 'bignumber', precision: 20});
    var Big = bigmath.bignumber;

    assert.deepEqual(sinh(Big(-1)), Big('-1.1752011936438014569'));
    assert.deepEqual(sinh(Big(0)), Big(0));
    assert.deepEqual(sinh(bigmath.pi).toString(), '11.548739357257748378');
    assert.deepEqual(sinh(Big(1)), Big('1.1752011936438014569'));
    assert.deepEqual(sinh(Big(-1e-10)), Big(-1e-10));

    bigmath.config({precision: 50});
    assert.deepEqual(sinh(Big(1e-50)), Big(1e-50));
  });

  it('should return the sinh of a complex number', function() {
    approx.deepEqual(sinh(complex('1')), complex(1.1752011936438014, 0));
    approx.deepEqual(sinh(complex('i')), complex(0, 0.8414709848079));
    approx.deepEqual(sinh(complex('2 + i')), complex(1.9596010414216, 3.1657785132162));
  });

  it('should return the sinh of an angle', function() {
    approx.equal(sinh(unit('90deg')), 2.3012989023073);
    approx.equal(sinh(unit('-45deg')), -0.86867096148601);
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {sinh(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {sinh('string')});
  });

  var sinh123 = [1.1752011936438014, 3.626860407847, 10.01787492741];

  it('should return the sinh of each element of an array', function() {
    approx.deepEqual(sinh([1,2,3]), sinh123);
  });

  it('should return the sinh of each element of a matrix', function() {
    approx.deepEqual(sinh(matrix([1,2,3])), matrix(sinh123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {sinh()}, error.ArgumentsError);
    assert.throws(function () {sinh(1, 2)}, error.ArgumentsError);
  });
});
