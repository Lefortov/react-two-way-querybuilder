var React = require('react');
var TreeHelper = require('./TreeHelper');
var Rule = require('./Rule');

class Condition extends React.Component{
	constructor(props){
		super(props);
		this.treeHelper = new TreeHelper(this.props.data);
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		this.state = {
			childAmount: 0,
			data: node
		};
		this.addRule = this.addRule.bind(this);
		this.addCondition = this.addCondition.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChildUpdate = this.handleChildUpdate.bind(this);
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

	handleDelete(nodeName){
		this.treeHelper.removeNodeByName(nodeName); 
		this.props.onChange();
	}

	handleChildUpdate(){
		let node = this.treeHelper.getNodeByName(this.props.nodeName);
		this.setState({data:node});
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
			{this.props.nodeName !== '1' ? 
				<button onClick={() => this.handleDelete(this.props.nodeName)}>{this.props.buttonsText.delete}</button>
				: null}
			{this.state.data.rules.map((rule, index) => {
				if (rule.field){ 
					return (<Rule key={index}
					buttonsText={this.props.buttonsText}
					fields={this.props.fields}
					operators={this.props.config.operators}
					nodeName = {rule.nodeName}
					data = {this.props.data}
					onChange={this.handleChildUpdate}/>);
				}
				else {
					return (<Condition key={index}
					config={this.props.config} 
					buttonsText={this.props.buttonsText}
					fields={this.props.fields}
					nodeName = {rule.nodeName}
					data={this.props.data}
					onChange={this.handleChildUpdate}/>);
				}
			})}
		</div>);
	}
}

Condition.propTypes = {
	buttonsText : React.PropTypes.object.isRequired,	
	config : React.PropTypes.object.isRequired,
	data: React.PropTypes.object.isRequired,	
	fields : React.PropTypes.array.isRequired,
	nodeName: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func
};

export default Condition;
