var React = require('react');

class Rule extends React.Component{
	constructor(props){
		super(props);
	}

	render () {
		return <div>
		I am a rule!
		
		</div>;
	}
}

Rule.propTypes = {
	fields : React.PropTypes.array.isRequired,
	operators: React.PropTypes.array.isRequired
}

export default Rule;
