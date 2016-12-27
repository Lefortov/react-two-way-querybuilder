export default class QueryParser{
	static ParseToQuery(data, query){
		query = '(';
		for (let i = 0, length = data.rules.length; i < length; i++){
			if (!data.rules[i].combinator){
				query += `${data.rules[i].field} ${data.rules[i].operator} '${data.rules[i].value}'`;
				if (i !== length - 1 && !data.rules[i+1].combinator){
					query += data.combinator + ' ';
				}
			}
			else{
				query += ` ${data.combinator} ${this.ParseToQuery(data.rules[i], query)}`;
			}
		}
		return query + ')';
	}

	static ParseToData(query, config){
		if (query === '()'){
			return {
				combinator: config.combinators[0].combinator,
				nodeName: '1',
				rules: []
				};		
		}

	}

	CreateOutputStack(query, config){
		let operatorsStack = [];
		let outputStack = [];
		let separators = '';
		for (let i = 0, length = config.combinators.length; i < length; i++){
			separators += config.combinators[i];
		}
		for (let i = 0, length = query.length; i < length; i++){
			// if (query.)
		}
	}
}
