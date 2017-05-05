import PropTypes from 'prop-types';
import React from 'react';
import Condition from './Condition';
import QueryParser from './helpers/QueryParser';
import '../styles.css';

function buildDefaultConfig(config) {
  const defConfig = config || {};
  defConfig.query = defConfig.query ? defConfig.query : '()';
  defConfig.operators = defConfig.operators ? defConfig.operators :
  [
    { operator: '=', label: '=' },
    { operator: '<>', label: '<>' },
    { operator: '<', label: '<' },
    { operator: '>', label: '>' },
    { operator: '>=', label: '>=' },
    { operator: '<=', label: '<=' },
    { operator: 'IS NULL', label: 'Null' },
    { operator: 'IS NOT NULL', label: 'Not Null' },
    { operator: 'IN', label: 'In' },
    { operator: 'NOT IN', label: 'Not In' },
  ];
  defConfig.combinators = defConfig.combinators ? defConfig.combinators :
  [
    { combinator: 'AND', label: 'And' },
    { combinator: 'OR', label: 'Or' },
    { combinator: 'NOT', label: 'Not' },
  ];
  defConfig.animation = defConfig.animation ? defConfig.animation : 'none';
  defConfig.styles = defConfig.styles ? defConfig.styles : {
    primaryBtn: 'queryButtonPrimary',
    deleteBtn: 'queryButtonDelete',
    rule: 'rule',
    condition: 'condition',
    select: 'querySelect',
    input: 'queryInput',
    txtArea: 'queryText',
    error: 'error',
  };
  return defConfig;
}

function fillDefaultButtonsText(buttonsText) {
  const defBtnText = buttonsText || {};
  defBtnText.addRule = defBtnText.addRule ? defBtnText.addRule : 'Add rule';
  defBtnText.addGroup = defBtnText.addGroup ? defBtnText.addGroup : 'Add group';
  defBtnText.clear = defBtnText.clear ? defBtnText.clear : 'Clear';
  defBtnText.delete = defBtnText.delete ? defBtnText.delete : 'Delete';
  return defBtnText;
}

class TwoWayQuerybuilder extends React.Component {
  constructor(props) {
    super(props);
    this.config = buildDefaultConfig(props.config);
    this.buttonsText = fillDefaultButtonsText(props.buttonsText);
    const defaultData = {
      combinator: this.config.combinators[0].combinator,
      nodeName: '1',
      rules: [],
    };
    this.state = {
      data: this.config.query === '()' ? defaultData : QueryParser.parseToData(this.config.query, this.config),
      query: this.config.query === '()' ? null : this.config.query,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const queryObj = {};
    queryObj.data = data;
    queryObj.query = QueryParser.parseToQuery(data);
    this.setState({ query: queryObj.query });
    if (this.props.onChange) {
      this.props.onChange(queryObj);
    }
  }

  render() {
    return (<div>
      <Condition
        config={this.config}
        buttonsText={this.buttonsText}
        fields={this.props.fields}
        nodeName="1"
        data={this.state.data}
        onChange={this.handleChange}
      />
    </div>);
  }
}

TwoWayQuerybuilder.propTypes = {
  buttonsText: PropTypes.object,
  config: PropTypes.object,
  fields: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

TwoWayQuerybuilder.defaultProps = {
  buttonsText: {},
};

export default TwoWayQuerybuilder;
