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
		let initData = {
				combinator: config.combinators[0].combinator,
				nodeName: '1',
				rules: []
				};
		if (query === '()'){
			return initData; 		
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

	static GetTokensArray(query, combinators){
		let combinatorsIndexes = this.GetCombinatorsIndexes(query, combinators);
		let tokens = [];
		let token = '';
		for (let i = 0, length = query.length; i < length; i++){
			let combinatorIndexes = combinatorsIndexes.find(x => x.start===i);
			if (combinatorIndexes){
				let combinator = query.substring(combinatorIndexes.start, combinatorIndexes.end);				
				this.PushTokenIfNotEmpty(token, tokens);
				tokens.push(combinator);
				i=combinatorIndexes.end;
			}
			else if(query[i] === '(' || query[i] === ')'){
				this.PushTokenIfNotEmpty(token, tokens);
				tokens.push(query[i]);
			}
			else{
				token += query[i];
			}
		}
		return tokens;
	}

	PushTokenIfNotEmpty(token, array, operators){
		if (token){
			array.push(CreateTokenObject(operators, operators));
		}
		token = '';
	}

	static CreateTokenObject(token, operators){
		let operatorsPattern = this.GetSearchPattern(operators, 'operator');
		let match = operatorsStack.exec(query);
		return {
			field: query.substring(0, match.index),
			operator: query.substring(match.index, match.lastIndex),
			value: query.substring(match.lastIndex, query.length)
		};
	}

	static GetCombinatorsIndexes(query, combinators){
		let combinatorsIndexes = [];
		let combinatorsPattern = this.GetSearchPattern(combinators, 'combinator');
		var match;
		while ((match = combinatorsPattern.exec(query)) !== null){
			combinatorsIndexes.push({start: match.index, end: combinatorsPattern.lastIndex});
		}
		return combinatorsIndexes;
	}

	GetSearchPattern(searchValues, name){
		let pattern;
		for (let i = 0; i < searchValues.length; i++){
			pattern += `|${searchValues[i][name]}`;
		}
		//To remove first | character
		pattern = pattern.slice(1);
		return new RegExp(pattern, 'gi');
	}
}
