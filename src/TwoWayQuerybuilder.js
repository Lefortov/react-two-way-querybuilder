var React = require('react');
var Rule = require('./Rule');
var Condition = require('./Condition');


class TwoWayQuerybuilder extends React.Component{
	constructor(props){
		super(props);
		buildDefaultConfig(props.config);
		fillDefaultButtonsText(props.buttonsText);
		console.log('default config', props.config);
		this.state = {
			data: {
				combinator: 'And',
				rules: [{
					field:this.props.fields[0],
					operator:this.props.config.operators[0],
					value:'Ivan'}]
			},
			nestIndex: 0
		};
		this.addRule = this.addRule.bind(this);
		this.addCondition = this.addCondition.bind(this);
	}

	addRule(){
		console.log('rule added');
		let data = this.state.data;
		data.rules.push({field:'lastName', operator:'=', value:'Saloed'});
		this.setState({data:data});
		console.log('state', this.state);
	}

	addCondition(){
		console.log('condition added');
		let data = this.state.data;
		data.rules.push({combinator:'AND', rules:[]});
		this.setState({data:data});
		console.log('state', this.state);		
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
			{this.state.data.rules.map((rule, index) => {
				if (rule.field){ 
					return <Rule key={index} fields={this.props.fields} operators={this.props.config.operators}/>;
				}
				else{
					return <Condition key={index} config={this.props.config} 
					buttonsText={this.props.buttonsText} fields={this.props.fields} nestIndex={this.state.nestIndex + 1}
					data={this.state.data}/>;
				}
			})}
			<p>{JSON.stringify(this.state.data)}</p>
		</div>);
	}
}

function buildDefaultConfig(config) {
	console.log('buildDefaultConfig');
	config.type = config.type ? config.type : 'SQL';
	config.query = config.query ? config.query : '()';
	config.operators = config.operators ? config.operators : 
	[
		{operator: '=', label: '='},
		{operator: '<>', label: '<>'},
		{operator: '<', label: '<'},
		{operator: '>', label: '>'},
		{operator: '>=', label: '>='},
		{operator: '<=', label: '<='},
		{operator: 'IS NULL', label: 'Null'},
		{operator: 'IS NOT NULL', label: 'Not Null'},
		{operator: 'IN', label: 'In'},
		{operator: 'NOT IN', label: 'Not In'}
	];
	config.combinators = config.combinators ? config.combinators :
	[
		{combinator:'AND', label:'And'},
		{combinator:'OR', label:'Or'},
		{combinator:'Not', label:'Not'}
	];
	config.animation = config.animation ? config.animation : 'none';
}

function fillDefaultButtonsText(buttonsText){
	buttonsText.addRule = buttonsText.addRule ? buttonsText.addRule : 'Add rule';
	buttonsText.addGroup = buttonsText.addGroup ? buttonsText.addGroup : 'Add group';
	buttonsText.clear = buttonsText.clear ? buttonsText.clear : 'Clear';
	buttonsText.delete = buttonsText.delete ? buttonsText.delete : 'Delete';
}

TwoWayQuerybuilder.propTypes = {
	buttonsText : React.PropTypes.object,	
	config : React.PropTypes.object.isRequired,
	fields : React.PropTypes.array.isRequired,	
	onChange : React.PropTypes.func.isRequired
};

TwoWayQuerybuilder.defaultProps = {
	buttonsText: {}
};

export default TwoWayQuerybuilder;
