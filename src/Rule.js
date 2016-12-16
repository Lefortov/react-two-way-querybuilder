var React = require('react');
var TreeHelper = require('./TreeHelper');

class Rule extends React.Component{
	constructor(props){
		super(props);
		this.getFieldByName = this.getFieldByName.bind(this);
		this.generateRuleObject = this.generateRuleObject.bind(this);
		this.onFieldChanged = this.onFieldChanged.bind(this);
		this.onOperatorChanged = this.onOperatorChanged.bind(this);
		this.onInputChanged = this.onInputChanged.bind(this);
		this.getInputTag = this.getInputTag.bind(this);
		this.treeHelper = new TreeHelper(this.props.data);
		this.state = {
			currField: this.generateRuleObject(this.props.fields[0])
		};
		console.log('state', this.state);
	}

	getFieldByName(name) {
		for(var i = 0, length = this.props.fields.length; i < length; i++){
			if (this.props.fields[i].name === name){
				return this.props.fields[i];
			}
		}
		return null;
	}

	generateRuleObject(field){
		let rule = {};
		rule.input = field.input;
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		console.log('node', node);
		rule.input.value = node.value;	
		if(!field.operators || typeof(field.operators) === 'string'){
			rule.operators = this.props.operators;
			return rule;
		}
		let ruleOperators = [];
		for (var i = 0, length = field.operators.length; i < length; i++){
			for (var opIndex = 0, opLength = this.props.operators.length; opIndex < opLength; opLength++){
				if (field.operators[i] === this.props.operators[opIndex].operator){
					ruleOperators.push(this.props.operators[opIndex]);
				}
			}
		}
		rule.operators = ruleOperators;
	}

	onFieldChanged(event){
		let field = this.getFieldByName(event.target.value);
		let rule = this.generateRuleObject(field);
		this.setState({currField: rule});
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		node[field] = event.target.value;
	}

	onOperatorChanged(event){
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		node.operator = event.target.value;
	}

	onInputChanged(event){
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		node.value = event.target.value;
	}

	getInputTag(inputType){
		switch(inputType){
			case 'textarea': return (<textarea onChange={this.onInputChanged}>
			{this.state.currField.input.value ? this.state.currField.input.value : ''}
			</textarea>);
			case 'select': return (<select onChange={this.onInputChanged}>
				{this.state.currField.input.options.map((option, index) => 
					<option value={option.value} key={index}>{option.name}</option>
				)}
			</select>);
			default: return (<input type = {this.state.currField.input.type}
				 value = {this.state.currField.input.value ? this.state.currField.input.value : ''}
				 onChange={this.onInputChanged}/>);
		}
	}

	render () {
		return(
			<div>
				<select onChange={this.onFieldChanged}>
					{this.props.fields.map((field, index) => 
						<option value={field.name} key={index}>{field.label}</option>
					)}
				</select>
				<select onChange={this.onOperatorChanged}>
					{this.state.currField.operators.map((operator, index) =>
						<option value={operator.operator} key={index}>{operator.label}</option>
					)}
				</select>
				{this.getInputTag(this.state.currField.input.type)}
			</div>
		);
	}
}

Rule.propTypes = {
	data: React.PropTypes.object.isRequired,
	fields : React.PropTypes.array.isRequired,
	nodeName: React.PropTypes.string.isRequired,
	operators: React.PropTypes.array.isRequired
};

export default Rule;
