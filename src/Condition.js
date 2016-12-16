var React = require('react');
var TreeHelper = require('./TreeHelper');
var Rule = require('./Rule');

class Condition extends React.Component{
	constructor(props){
		super(props);
		this.treeHelper = new TreeHelper(this.props.data);
		this.state = {
			childAmount: 0
		};
		this.addRule = this.addRule.bind(this);
		this.addCondition = this.addCondition.bind(this);
		this.OnDelete = this.OnDelete.bind(this);
	}

	addRule(){
		let data = this.treeHelper.getNodeByName(this.props.nodeName);
		let childAmount = this.state.childAmount+1;
		let nodeName = this.treeHelper.generateNodeName(this.props.nodeName, childAmount);
		data.rules.push(
			{
				field: this.props.fields[0].name,
			 	operator: this.props.config.operators[0].operator,
				value: 'Saloed',
				nodeName: nodeName
			});
		this.setState({data: data, childAmount: childAmount});
	}

	addCondition(){
		let data = this.treeHelper.getNodeByName(this.props.nodeName);
		let childAmount = this.state.childAmount+1;
		let nodeName = this.treeHelper.generateNodeName(this.props.nodeName, childAmount);
		data.rules.push({
			combinator: this.props.config.combinators[0].combinator,
			nodeName: nodeName,
			rules: []
		});
		this.setState({data:data, childAmount: childAmount});		
	}

	OnDelete(){
		console.log('clicked');
	}

	ComponentWillReceiveProps(){
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		this.setState({data:node});	
	}

	render () {
		return (<div>
			<select>
				{this.props.config.combinators.map((combinator, index)=>{
					return <option value={combinator.combinator} key={index}>{combinator.label}</option>;
				})}
			</select>
			<button onClick={this.addCondition}>{this.props.buttonsText.addGroup}</button>
			<button onClick={this.addRule}>{this.props.buttonsText.addRule}</button>
			{this.props.data.rules.map((rule, index) => {
				if (rule.field){ 
					return (<Rule key={index}
					fields={this.props.fields}
					operators={this.props.config.operators}
					nodeName = {this.treeHelper.generateNodeName(this.props.nodeName, this.state.childAmount)}
					data = {this.props.data}/>);
				}
				else {
					return (<Condition key={index}
					config={this.props.config} 
					buttonsText={this.props.buttonsText}
					fields={this.props.fields}
					nodeName = {this.treeHelper.generateNodeName(this.props.nodeName, this.state.childAmount)}
					data={this.props.data}/>);
				}
			})}
			<button onClick={this.OnDelete}>X</button>
		</div>);
	}
}

Condition.propTypes = {
	buttonsText : React.PropTypes.object.isRequired,	
	config : React.PropTypes.object.isRequired,
	data: React.PropTypes.object.isRequired,	
	fields : React.PropTypes.array.isRequired,
	nodeName: React.PropTypes.string.isRequired,
};

export default Condition;
