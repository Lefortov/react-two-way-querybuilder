var React = require('react');
var TreeHelper = require('./TreeHelper');

class Condition extends React.Component{
	constructor(props){
		super(props);
		this.treeHelper = new TreeHelper(this.props.data);
	}

	render () {
		return <div>I am a condition!</div>;
	}
}

Condition.propTypes = {
	buttonsText : React.PropTypes.isRequired,	
	config : React.PropTypes.object.isRequired,
	data: React.PropTypes.object.isRequired,	
	fields : React.PropTypes.array.isRequired,
	nestIndex: React.PropTypes.number.isRequired,
};

export default Condition;
