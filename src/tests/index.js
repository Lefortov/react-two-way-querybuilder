import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import assert from 'assert';
import Button from '../index';

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
    it('should return [18, 20]', function () {
      const query = "((Firstname='kek' AND Firstname ='kek1') OR Firstname='Kek3')";
      const combinators = [
				{ combinator: 'AND', label: 'And' },
				{ combinator: 'OR', label: 'Or' },
				{ combinator: 'NOT', label: 'Not' },
      ];
      const result = QueryParser.GetCombinatorsIndexes(query, combinators);
      const expectedResult = [
				{ start: 21, end: 23 },
				{ start: 46, end: 47 },
      ];
      assert.equal(expectedResult, result);
    });
  });

  describe('GetTokenObject', function () {
    it('should return token object', function () {
      const token = "Firstname='kek'";
      const expectedResult = {
        field: 'Firstname',
        operator: '=',
        value: "'kek'",
      };
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
      const result = QueryParser.CreateTokenObject(token, operators);
      assert.equal(expectedResult, result);
    });
  });
});
