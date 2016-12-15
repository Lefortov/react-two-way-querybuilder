var React = require('react');

class Rule extends React.Component{
	constructor(props){
		super(props);
	}

	render () {
		return(
			<div>
				<select>
					{this.props.fields.map((field, index) => 
						<option value={field.name} key={index}>{field.label}</option>
					)}
				</select>
				<select>
					{this.props.operators.map((operator, index) =>
						<option value={operator.operator} key={index}>{operator.label}</option>
					)}
				</select>
			</div>
		); 
		<div>I am a rule!</div>;
	}
}

Rule.propTypes = {
	fields : React.PropTypes.array.isRequired,
	nodeName: React.PropTypes.string.isRequired,
	operators: React.PropTypes.array.isRequired
};

export default Rule;
