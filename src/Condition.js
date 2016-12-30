import React from 'react';
import TreeHelper from './TreeHelper';
import Rule from './Rule';

class Condition extends React.Component {
  constructor(props) {
    super(props);
    this.treeHelper = new TreeHelper(this.props.data);
    const node = this.treeHelper.getNodeByName(this.props.nodeName);
    this.state = {
      childAmount: 0,
      data: node,
    };
    this.addRule = this.addRule.bind(this);
    this.addCondition = this.addCondition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChildUpdate = this.handleChildUpdate.bind(this);
    this.combinatorChange = this.combinatorChange.bind(this);
  }

  addRule() {
    const data = this.treeHelper.getNodeByName(this.props.nodeName);
    const childAmount = this.state.childAmount + 1;
    const nodeName = this.treeHelper.generateNodeName(this.props.nodeName, childAmount);
    data.rules.push({
      field: this.props.fields[0].name,
      operator: this.props.config.operators[0].operator,
      value: '',
      nodeName });
    this.setState({ data, childAmount });
    this.props.onChange(this.props.data);
  }

  addCondition() {
    const data = this.treeHelper.getNodeByName(this.props.nodeName);
    const childAmount = this.state.childAmount + 1;
    const nodeName = this.treeHelper.generateNodeName(this.props.nodeName, childAmount);
    data.rules.push({
      combinator: this.props.config.combinators[0].combinator,
      nodeName,
      rules: [] });
    this.setState({ data, childAmount });
    this.props.onChange(this.props.data);
  }

  handleDelete(nodeName) {
    this.treeHelper.removeNodeByName(nodeName);
    this.props.onChange(this.props.data);
  }

  handleChildUpdate() {
    const node = this.treeHelper.getNodeByName(this.props.nodeName);
    this.setState({ data: node });
    this.props.onChange(this.props.data);
  }

  combinatorChange(event) {
    const node = this.treeHelper.getNodeByName(this.props.nodeName);
    node.combinator = event.target.value;
    this.props.onChange(this.props.data);
  }

  render() {
    return (
      <div className="condition">
        <select className="form-control" onChange={this.combinatorChange}>
          {this
            .props
            .config
            .combinators
            .map((combinator, index) => {
              return <option value={combinator.combinator} key={index}>{combinator.label}</option>;
            })}
        </select>
        <button className="button button-primary" onClick={this.addCondition}>
          {this.props.buttonsText.addGroup}
        </button>
        <button className="button button-primary" onClick={this.addRule}>
          {this.props.buttonsText.addRule}
        </button>
        {this.props.nodeName !== '1'
          ? <button
            onClick={() => this.handleDelete(this.props.nodeName)}
            className="button button-delete">{this.props.buttonsText.delete}</button>
          : null}
        {this
          .state
          .data
          .rules
          .map((rule, index) => {
            if (rule.field) {
              return (<Rule
                key={index}
                buttonsText={this.props.buttonsText}
                fields={this.props.fields}
                operators={this.props.config.operators}
                nodeName={rule.nodeName}
                data={this.props.data}
                onChange={this.handleChildUpdate} />);
            } else {
              return (<Condition
                key={index}
                config={this.props.config}
                buttonsText={this.props.buttonsText}
                fields={this.props.fields}
                nodeName={rule.nodeName}
                data={this.props.data}
                onChange={this.handleChildUpdate} />);
            }
          })}
      </div>
    );
  }
}

Condition.propTypes = {
  buttonsText: React.PropTypes.object.isRequired,
  config: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  fields: React.PropTypes.array.isRequired,
  nodeName: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

export default Condition;
