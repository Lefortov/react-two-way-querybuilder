var React = require('react');
var ReactDOM = require('react-dom');
var TwoWayQuerybuilder = require('react-two-way-querybuilder');

var config = {};
var fields = [
	{name: 'firstName', operators: 'all', label:'First Name', input: {type:'text'}},
	{name: 'lastName', operators: 'all', label:'Last Name', input: {type:'text'}},
	{name: 'age', operators: 'all', label:'Age', input: {type:'select',
	 options: [
		{value: '11', name: 'eleven'},
		{value: '12', name: 'twelve'}
	]}},
	{name: 'birthDate', operators: 'all', label:'Birth date', input: {type:'text'}}
];

class App extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			data: null
		};
	}

	handleChange(data){
		console.log('updated', data);
		this.setState({data: data});
	}

	render(){
		return(
			<div>
				<TwoWayQuerybuilder config={config} fields={fields} onChange={this.handleChange}/>
				<p>{JSON.stringify(this.state.data)}</p>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
