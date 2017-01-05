import React from 'react';
import Condition from './Condition';
import QueryParser from './helpers/QueryParser';
import ASTree from './helpers/ASTree';

class TwoWayQuerybuilder extends React.Component {
  constructor(props) {
    super(props);
    buildDefaultConfig(props.config);
    fillDefaultButtonsText(props.buttonsText);
    this.state = {
      data: {
        combinator: this.props.config.combinators[0].combinator,
        nodeName: '1',
        rules: [],
      },
      query: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const queryObj = {};
    queryObj.data = data;
    queryObj.query = QueryParser.parseToQuery(data);
    this.setState({ query: queryObj.query });
    const query = "((Firstname='kek' AND Firstname='kek1') OR (Firstname='kek3' AND Firstname='kek4'))";
    console.log(ASTree.buildTree(QueryParser.getTokensArray(query, this.props.config.combinators, this.props.config.operators), this.props.config.combinators));
    if (this.props.onChange) {
      this.props.onChange(queryObj);
    }
  }

  render() {
    return (<div>
      <Condition
        config={this.props.config}
        buttonsText={this.props.buttonsText}
        fields={this.props.fields}
        nodeName="1"
        data={this.state.data}
        onChange={this.handleChange}
      />
    </div>);
  }
}

function buildDefaultConfig(config) {
  config.type = config.type ? config.type : 'SQL';
  config.query = config.query ? config.query : '()';
  config.operators = config.operators ? config.operators :
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
  config.combinators = config.combinators ? config.combinators :
  [
    { combinator: 'AND', label: 'And' },
    { combinator: 'OR', label: 'Or' },
    { combinator: 'NOT', label: 'Not' },
  ];
  config.animation = config.animation ? config.animation : 'none';
}

function fillDefaultButtonsText(buttonsText) {
  buttonsText.addRule = buttonsText.addRule ? buttonsText.addRule : 'Add rule';
  buttonsText.addGroup = buttonsText.addGroup ? buttonsText.addGroup : 'Add group';
  buttonsText.clear = buttonsText.clear ? buttonsText.clear : 'Clear';
  buttonsText.delete = buttonsText.delete ? buttonsText.delete : 'Delete';
}

TwoWayQuerybuilder.propTypes = {
  buttonsText: React.PropTypes.object,
  config: React.PropTypes.object.isRequired,
  fields: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
};

TwoWayQuerybuilder.defaultProps = {
  buttonsText: {},
};

export default TwoWayQuerybuilder;
