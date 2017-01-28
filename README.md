# React Two Way Querybuilder

A simple react component that lets you build queries dynamically on UI. Doesn't depend on any 3-d party libraries.

![image](https://github.com/Lefortov/react-two-way-querybuilder/blob/master/blob/builder.jpg)

## Installing

```bash
npm i react-two-way-querybuilder --save
```

## Using

Two way query builder is flexible and configurable component with a set of possible options.

Simple usage:

```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from 'react-two-way-querybuilder';

    const fields = [
      { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
      { name: 'lastName', operators: 'all', label: 'Last Name', input: { type: 'text' } },
      { name: 'age', operators: 'all', label: 'Age', input: { type: 'text' } },
      { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
    ];

    class App extends Component {

        handleChange(event) {
          console.log('query', event.query);
        }

        render() {
            return (
                 <TwoWayQuerybuilder fields={fields} onChange={this.handleChange} />
            );
        }
    }

    export default App;
```

###Props:

- **`fields`**: your fields used to build a query
  * name: name of the field that would be used in a query
  * label: how your field name would be shown in the dropdown
  * operators: remove this property or set to 'all' if you want to use all operators for this field, else you can limit them by passing the array of the allowed operators `['=', '<', '>']`
  * input: type of the input, possible options are: `text`, `textarea`, `select`. If you are using `select` input type pass options to the object in the following way:
    `input: {type: 'select', options: [{value: '1', name: 'one'}, {value: '2', name: 'two'}]}`. Also, it supports validation by passing `pattern` property with regexp pattern and
    `errorText` property for validation error message text. 
  
- **`onChange`**: pass here your function that will be called when data was changed
- **`config`**: configuration object with possible options:
  * `query`: pass here prepared query, so UI will be built using it.
  * `operators`: array of operators, the default one is: 
      ```
      [
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
       ]
    ```
   * `combinators`: array of combinators, the default one is: 
    ```
    [
        { combinator: 'AND', label: 'And' },
        { combinator: 'OR', label: 'Or' },
        { combinator: 'NOT', label: 'Not' },
    ]
    ```  
  * `style`: use this object to redefine styles. Properties:
    * `primaryBtn`: used for primary button styles,
    * `deleteBtn`: delete button styles,
    * `rule`: rule styles,
    * `condition`: condition styles,
    * `select`: select styles,
    * `input`: input styles,
    * `txtArea`: text area styles :D
    * `error`: error message styling
    
- **`buttonsText`**: text of the buttons, you can redefine it for multilanguage support or because you just want. By default used following text:
    * addRule: `'Add rule'`,
    * addGroup: `'Add group'`,
    * clear: `'Clear'`,
    * delete: `'Delete'`

## Samples

Visit [DEMO](https://lefortov.github.io/react-two-way-querybuilder) storybook to take a look at basic usage cases: 

- **existing query**: 
  ```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from 'react-two-way-querybuilder';;

    const fields = [
      { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
      { name: 'lastName', operators: 'all', label: 'Last Name', input: { type: 'text' } },
      { name: 'age', operators: 'all', label: 'Age', input: { type: 'text' } },
      { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
    ];

    const config = {
      query: "((firstname='Jack' AND lastName='London') OR lastName='Smith')",
    };

    class App extends Component {

        handleChange(event) {
          console.log('query', event.query);
        }

        render() {
            return (
                 <TwoWayQuerybuilder config={config} fields={fields} onChange={this.handleChange} />
            );
        }
    }

    export default App;
  ```

- **changed input types**:
  ```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from 'react-two-way-querybuilder';;

    const changedFields = [
      { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
      { name: 'lastName', operators: 'all', label: 'Last Name', input: {
        type: 'select',
        options: [
          { value: 'Smith', name: 'Smith' },
          { value: 'London', name: 'London' },
        ] } },
      { name: 'age', operators: 'all', label: 'Age',
        input: {
        type: 'select',
        options: [
          { value: '28', name: 'twenty eight' },
          { value: '30', name: 'thirty' },
        ] } },
      { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
    ];

    class App extends Component {

        handleChange(event) {
          console.log('query', event.query);
        }

        render() {
            return (
                 <TwoWayQuerybuilder config={config} fields={changedFields} onChange={this.handleChange} />
            );
        }
    }

    export default App;
  ```
- **custom styles**
  ```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from 'react-two-way-querybuilder';;

    const fields = [
      { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
      { name: 'lastName', operators: 'all', label: 'Last Name', input: { type: 'text' } },
      { name: 'age', operators: 'all', label: 'Age', input: { type: 'text' } },
      { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
    ];

    const styles = {
      primaryBtn: 'customPrimaryBtn',
      deleteBtn: 'customDeleteBtn',
      rule: 'rule',
      condition: 'condition',
      select: 'querySelect',
      input: 'queryInput',
      txtArea: 'queryText',
    };

    const changedStyles = {
      styles,
    };

    class App extends Component {

        handleChange(event) {
          console.log('query', event.query);
        }

        render() {
            return (
                 <TwoWayQuerybuilder config={changedStyles} fields={fields} onChange={this.handleChange} />
            );
        }
    }

    export default App;
  ```
- **validation**
  ```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from 'react-two-way-querybuilder';;

    const validationFields = [
      { name: 'firstName', operators: 'all', label: 'First Name', input: { 
        type: 'text', errorText: 'Only letters allowed', pattern: new RegExp("[a-z]+", "gi") } },
      { name: 'lastName', operators: 'all', label: 'Last Name', input: {
        type: 'text', errorText: 'Only letters allowed', pattern: new RegExp("[a-z]+", "gi") } },
      { name: 'age', operators: 'all', label: 'Age', input: {
        type: 'text', errorText: 'Only nubmers allowed', pattern: new RegExp('[0-9]+', 'gi') } },
      { name: 'birthDate', operators: 'all', label: 'Birth date', input: { 
        type: 'text', errorText: 'Only nubmers allowed', pattern: new RegExp('[0-9]+', 'gi') }
      },
];

    class App extends Component {

        handleChange(event) {
          console.log('query', event.query);
        }

        render() {
            return (
                 <TwoWayQuerybuilder fields={validationFields} onChange={this.handleChange} />
            );
        }
    }

    export default App;
  ```

##License

React-two-way-quierybuidler is MIT licensed
