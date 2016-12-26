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
		this.handleDelete = this.handleDelete.bind(this);
		this.treeHelper = new TreeHelper(this.props.data);
		this.node = this.treeHelper.getNodeByName(this.props.nodeName);
		this.state = {
			currField: this.generateRuleObject(this.props.fields[0], this.node)
		};
	}

	getFieldByName(name) {
		for(var i = 0, length = this.props.fields.length; i < length; i++){
			if (this.props.fields[i].name === name){
				return this.props.fields[i];
			}
		}
		return null;
	}

	generateRuleObject(field, node){
		let rule = {};
		rule.input = field.input;
		node = node ? node : this.treeHelper.getNodeByName(this.props.nodeName);
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
		return rule;
	}

	handleDelete(){
		this.treeHelper.removeNodeByName(this.props.nodeName); 
		this.props.onChange();
	}

	onFieldChanged(event){
		this.node[field] = event.target.value;
		let field = this.getFieldByName(event.target.value);
		let rule = this.generateRuleObject(field, this.node);
		this.setState({currField: rule});
		this.props.onChange();
	}

	onOperatorChanged(event){
		this.node.operator = event.target.value;
		let field = this.getFieldByName(this.node.field);
		let rule = this.generateRuleObject(field, this.node);
		this.setState({currField: rule});
		this.props.onChange();
	}

	onInputChanged(event){
		this.node.value = event.target.value;
		let field = this.getFieldByName(this.node.field);
		let rule = this.generateRuleObject(field, this.node);
		this.setState({currField: rule});
		this.props.onChange();
	}

	componentWillReceiveProps(nextProps){
		this.node = this.treeHelper.getNodeByName(nextProps.nodeName);
	}

	getInputTag(inputType){
		switch(inputType){
			case 'textarea': return (<textarea className="form-control" onChange={this.onInputChanged}>
			{this.node.value ? this.node.value : ''}
			</textarea>);
			case 'select': return (<select className="form-control" onChange={this.onInputChanged}>
				{this.state.currField.input.options.map((option, index) => 
					<option value={option.value} key={index}>{option.name}</option>
				)}
			</select>);
			default: return (<input type = {this.state.currField.input.type}
				 value = {this.node.value}
				 onChange={this.onInputChanged} className="form-control"/>);
		}
	}

	render () {
		return(
			<div className="rule">
				<select className="form-control" onChange={this.onFieldChanged}>
					{this.props.fields.map((field, index) => 
						<option value={field.name} key={index}>{field.label}</option>
					)}
				</select>
				<select className="form-control" onChange={this.onOperatorChanged}>
					{this.state.currField.operators.map((operator, index) =>
						<option value={operator.operator} key={index}>{operator.label}</option>
					)}
				</select>
				{this.getInputTag(this.state.currField.input.type)}
				<button className="button button-delete" onClick={this.handleDelete}>{this.props.buttonsText.delete}</button>
			</div>
		);
	}
}

Rule.propTypes = {
	buttonsText : React.PropTypes.object,
	data: React.PropTypes.object.isRequired,
	fields : React.PropTypes.array.isRequired,
	nodeName: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
	operators: React.PropTypes.array.isRequired
};

export default Rule;
