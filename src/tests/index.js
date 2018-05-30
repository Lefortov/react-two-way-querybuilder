import assert from 'assert';
import QueryParser from '../helpers/QueryParser';
import ASTree from '../helpers/ASTree';

const { describe, it } = global;

const combinators = [
  { combinator: 'AND', label: 'And' },
  { combinator: 'OR', label: 'Or' },
  { combinator: 'NOT', label: 'Not' },
];

const operators = [
  { operator: '=', label: '=' },
  { operator: '<>', label: '<>' },
  { operator: '<', label: '<' },
  { operator: '>', label: '>' },
  { operator: '>=', label: '>=' },
  { operator: '<=', label: '<=' },
  { operator: 'IS NULL', label: 'Null' },
  { operator: 'IS NOT NULL', label: 'Not Null' },
  { operator: 'IN', label: 'In' },
  { operator: 'NOT IN', label: 'Not In' },
];

describe('Query Parser', function () {
  describe('GetCombinatorsIndexes', function () {
    it('should return AND and OR substrings', function () {
      const query = "((Firstname='kek' AND Firstname='kek1') OR Firstname='Kek3')";
      const result = QueryParser.getCombinatorsIndexes(query, combinators);
      const expectedFirstOeprator = query.substr(result[0].start, result[0].end - result[0].start);
      const expectedSecondOperator = query.substr(result[1].start, result[1].end - result[1].start);
      assert.equal(expectedFirstOeprator, 'AND');
      assert.equal(expectedSecondOperator, 'OR');
    });
  });

  describe('GetTokenObject', function () {
    it('should return token object', function () {
      const token = "Firstname='kek'";
      const result = QueryParser.createTokenObject(token, operators);
      assert.equal(result.field, 'Firstname');
      assert.equal(result.operator, '=');
      assert.equal(result.value, "kek");
    });
    it('should return token object without extra space', function () {
      const token = "Firstname IN 'kek, john'";
      const result = QueryParser.createTokenObject(token, operators);
      assert.equal(result.field, 'Firstname');
      assert.equal(result.operator, 'IN');
      assert.equal(result.value, "kek, john");
    });
  });


  describe('Get tokens array', function () {
    it('should return token array', function () {
      const query = "((Firstname='kek' AND Firstname='kek1') OR Firstname='kek3')";
      const result = QueryParser.getTokensArray(query, combinators, operators);
      const expectedResult = [
        '(',
        '(',
        { field: 'Firstname', operator: '=', value: "kek" },
        'AND',
        { field: 'Firstname', operator: '=', value: "kek1" },
        ')',
        'OR',
        { field: 'Firstname', operator: '=', value: "kek3" },
        ')',
      ];
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('get first combinator', function () {
    it('should return AND', function () {
      const query = "((Firstname='kek' AND Firstname='kek1'))";
      const tokens = QueryParser.getTokensArray(query, combinators, operators);
      const tree = ASTree.buildTree(tokens, combinators);
      const expectedResult = 'AND';
      const result = QueryParser.getFirstCombinator(tree, combinators);
      assert.equal(result.value, expectedResult);
    });
  });
});
