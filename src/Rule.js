import PropTypes from 'prop-types';
import React from 'react';
import TreeHelper from './helpers/TreeHelper';

const defaultErrorMsg = 'Input value is not correct';

const isValueCorrect = (pattern, value) => {
  const newPattern = new RegExp(pattern);
  const match = newPattern.exec(value);
  return match === null;
};

class Rule extends React.Component {
  constructor(props) {
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
    this.styles = this.props.styles;
    this.state = {
      currField: this.generateRuleObject(this.props.fields[0], this.node),
      validationError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.node = this.treeHelper.getNodeByName(nextProps.nodeName);
  }

  onFieldChanged(event) {
    this.node.field = event.target.value;
    const field = this.getFieldByName(event.target.value);
    const rule = this.generateRuleObject(field, this.node);
    this.setState({ currField: rule });
    this.props.onChange();
  }

  onOperatorChanged(event) {
    this.node.operator = event.target.value;
    const field = this.getFieldByName(this.node.field);
    const rule = this.generateRuleObject(field, this.node);
    this.setState({ currField: rule });
    this.props.onChange();
  }

  onInputChanged(event) {
    const pattern = this.state.currField.input.pattern;
    if (pattern) {
      this.setState({ validationError: isValueCorrect(pattern, event.target.value) });
    }
    this.node.value = event.target.value;
    const field = this.getFieldByName(this.node.field);
    const rule = this.generateRuleObject(field, this.node);
    this.setState({ currField: rule });
    this.props.onChange();
  }

  getFieldByName(name) {
    return this.props.fields.find(x => x.name === name);
  }

  getInputTag(inputType) {
    const errorText = this.state.currField.input.errorText;

    switch (inputType) {
      case 'textarea': return (
        <div className={this.styles.txtArea}>
          <textarea
            className="input" onChange={this.onInputChanged}
            value={this.node.value ? this.node.value : ''}
          />
          {
            this.state.validationError
            ? <p className={this.styles.error}>{errorText || defaultErrorMsg}</p>
            : null
          }
        </div>);
      case 'select': return (
        <select className={this.styles.select} onChange={this.onInputChanged}>
          {this.state.currField.input.options.map((option, index) =>
            <option value={option.value} key={index}>{option.name}</option>)}
        </select>);
      default: return (
        <div>
          <input
            type={this.state.currField.input.type}
            value={this.node.value}
            onChange={this.onInputChanged} className={this.styles.input}
          />
          {
            this.state.validationError
            ? <p className={this.styles.error}>{errorText || defaultErrorMsg}</p>
            : null
          }
        </div>);
    }
  }

  generateRuleObject(field, node) {
    const rule = {};
    rule.input = field.input;
    node = node ? node : this.treeHelper.getNodeByName(this.props.nodeName);
    rule.input.value = node.value;
    if (!field.operators || typeof (field.operators) === 'string') {
      rule.operators = this.props.operators;
      return rule;
    }
    const ruleOperators = [];
    for (let i = 0, length = field.operators.length; i < length; i += 1) {
      for (let opIndex = 0, opLength = this.props.operators.length; opIndex < opLength; opIndex += 1) {
        if (field.operators[i] === this.props.operators[opIndex].operator) {
          ruleOperators.push(this.props.operators[opIndex]);
        }
      }
    }
    rule.operators = ruleOperators;
    return rule;
  }

  handleDelete() {
    this.treeHelper.removeNodeByName(this.props.nodeName);
    this.props.onChange();
  }

  render() {
    return (
      <div className={this.styles.rule}>
        <select
          value={this.node.field}
          className={this.styles.select}
          onChange={this.onFieldChanged}
        >
          {this.props.fields.map((field, index) =>
            <option value={field.name} key={index}>{field.label}</option>
          )}
        </select>
        <select
          value={this.node.operator}
          className={this.styles.select}
          onChange={this.onOperatorChanged}
        >
          {this.state.currField.operators.map((operator, index) =>
            <option value={operator.operator} key={index}>{operator.label}</option>
          )}
        </select>
        {this.getInputTag(this.state.currField.input.type)}
        <button
          className={this.styles.deleteBtn}
          onClick={this.handleDelete}
        >{this.props.buttonsText.delete}</button>
      </div>
    );
  }
}

Rule.propTypes = {
  buttonsText: PropTypes.object,
  data: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  nodeName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  operators: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired,
};

export default Rule;
