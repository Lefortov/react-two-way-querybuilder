import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import assert from 'assert';
import QueryParser from '../helpers/QueryParser';
import ASTree from '../helpers/ASTree';

const { describe, it } = global;

// describe('Button', () => {
//   it('should show the given text', () => {
//     const text = 'The Text';
//     const wrapper = shallow(<Button>{text}</Button>);
//     expect(wrapper.text()).to.be.equal(text);
//   });

//   it('should handle the click event', () => {
//     const clickMe = sinon.stub();
//     // Here we do a JSDOM render. So, that's why we need to
//     // wrap this with a div.
//     const wrapper = mount(
//       <div>
//         <Button onClick={ clickMe }>ClickMe</Button>
//       </div>
//     );

//     wrapper.find('button').simulate('click');
//     expect(clickMe.callCount).to.be.equal(1);
//   });
// });

describe('Query Parser', function () {
  describe('GetCombinatorsIndexes', function () {
    it('should return AND and OR substrings', function () {
      const query = "((Firstname='kek' AND Firstname='kek1') OR Firstname='Kek3')";
      const combinators = [
        { combinator: 'AND', label: 'And' },
        { combinator: 'OR', label: 'Or' },
        { combinator: 'NOT', label: 'Not' },
      ];
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
      const result = QueryParser.createTokenObject(token, operators);
      assert.equal(result.field, 'Firstname');
      assert.equal(result.operator, '=');
      assert.equal(result.value, "'kek'");
    });
  });

  describe('Get tokens array', function () {
    it('should return token array', function () {
      const query = "((Firstname='kek' AND Firstname='kek1') OR (Firstname='kek3' AND Firstname='kek4')";
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
      const result = QueryParser.getTokensArray(query, combinators, operators);
      const expectedResult = [
        '(',
        '(',
        { field: 'Firstname', operator: '=', value: "'kek'" },
        'AND',
        { field: 'Firstname', operator: '=', value: "'kek1'" },
        ')',
        'OR',
        { field: 'Firstname', operator: '=', value: "'kek3'" },
        ')',
      ];
      assert.deepEqual(result, expectedResult);
    });
  });

  // describe('Build ASTree', function () {
  //   it('should return AST', function () {
  //     const query = "((Firstname='kek' AND Firstname='kek1') OR Firstname='kek3')";
  //     const combinators = [
  //       { combinator: 'AND', label: 'And' },
  //       { combinator: 'OR', label: 'Or' },
  //       { combinator: 'NOT', label: 'Not' },
  //     ];
  //     const operators = [
  //       { operator: '=', label: '=' },
  //       { operator: '<>', label: '<>' },
  //       { operator: '<', label: '<' },
  //       { operator: '>', label: '>' },
  //       { operator: '>=', label: '>=' },
  //       { operator: '<=', label: '<=' },
  //       { operator: 'IS NULL', label: 'Null' },
  //       { operator: 'IS NOT NULL', label: 'Not Null' },
  //       { operator: 'IN', label: 'In' },
  //       { operator: 'NOT IN', label: 'Not In' },
  //     ];
  //     const tokens = QueryParser.getTokensArray(query, combinators, operators);
  //     const treeResult = ASTree.buildTree(tokens, combinators);
      
  //   });
  // });
});
