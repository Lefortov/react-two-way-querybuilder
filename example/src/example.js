var React = require('react');
var ReactDOM = require('react-dom');
var TwoWayQuerybuilder = require('react-two-way-querybuilder');

var config = {};
var fields = [
	{name: 'firstName', label:'First Name', input: {type:'text'}},
	{name: 'lastName', label:'Last Name', input: {type:'text'}},
	{name: 'age', label:'Age', input: {type:'text'}},
	{name: 'birthDate', label:'Age', input: {type:'text'}}
];

class App extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(){}

	render(){
		return(
			<div>
				<TwoWayQuerybuilder config={config} fields={fields} onChange={this.handleChange}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
