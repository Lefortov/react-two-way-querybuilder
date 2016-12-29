var QueryParser = require('../src/QueryParser');
var assert = require('assert');

describe('Query Parser', function () {
	describe('GetCombinatorsIndexes', function () {
		it('should return [18, 20]', function () {
			let query = "((Firstname='kek' AND Firstname ='kek1') OR Firstname='Kek3')";
			let combinators = [
				{ combinator: 'AND', label: 'And' },
				{ combinator: 'OR', label: 'Or' },
				{ combinator: 'NOT', label: 'Not' }
			];
			let result = QueryParser.GetCombinatorsIndexes(query, combinators);
			let expectedResult = [
				{ start: 21, end: 23 },
				{ start: 46, end: 47 }
			];
			assert.equal(expectedResult, result);
		});
	});

	describe('GetTokenObject', function () {
		it('should return token object', function () {
			let token = "Firstname='kek'";
			let expectedResult = {
				field: 'Firstname',
				operator: '=',
				value: "'kek'"
			};
			let operators = [
				{ operator: '=', label: '=' },
				{ operator: '<>', label: '<>' },
				{ operator: '<', label: '<' },
				{ operator: '>', label: '>' },
				{ operator: '>=', label: '>=' },
				{ operator: '<=', label: '<=' },
				{ operator: 'IS NULL', label: 'Null' },
				{ operator: 'IS NOT NULL', label: 'Not Null' },
				{ operator: 'IN', label: 'In' },
				{ operator: 'NOT IN', label: 'Not In' }
			];
			let result = QueryParser.CreateTokenObject(token, operators);
			assert.equal(expectedResult, result);
		});
	});
});
