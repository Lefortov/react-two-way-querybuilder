import React from 'react';
import ReactDOM from 'react-dom';
import TwoWayQuerybuilder from './TwoWayQuerybuilder';

const config = {
  query: "((firstname='kek' AND firstname='kek1') OR lastName='zalupka')",
};
const fields = [
  { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
  { name: 'lastName', operators: 'all', label: 'Last Name', input: { type: 'text' } },
  { name: 'age', operators: 'all', label: 'Age',
    input: {
      type: 'select',
      options: [
        { value: '11', name: 'eleven' },
        { value: '12', name: 'twelve' },
      ] } },
  { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: null,
    };
  }

  handleChange(data) {
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <TwoWayQuerybuilder config={config} fields={fields} onChange={this.handleChange} />
        <p>{JSON.stringify(this.state.data)}</p>
      </div>
    );
  }
}

export default App;
