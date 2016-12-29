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

	GetTokensArray(query, combinators){
		let combinatorsIndexes = this.GetCombinatorsIndexes(query, combinators);
		let tokens = [];
		let token = '';
		for (let i = 0, length = query.length; i < length; i++){
			let combinatorIndexes = combinatorsIndexes.find(x => x.start===i);
			if (combinatorIndexes){
				let combinator = this.GetCombinatorByIndexes(query, combinatorIndexes.start, combinatorIndexes.end);
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

	PushTokenIfNotEmpty(token, array){
		if (token){
			array.push(token);
		}
		token = '';
	}

	GetCombinatorByIndexes(query, start, end){
		let combinator = '';
		for(let i = start; i <= end; i++){
			combinator+=query[i];
		}
		return combinator;
	}

	static GetCombinatorsIndexes(query, combinators){
		let combinatorsIndexes = [];
		let combinatorsPattern = '';
		for (let i = 0; i < combinators.length; i++){
			combinatorsPattern += `|${combinators[i].combinator}`;
		}
		//To remove first | character
		combinatorsPattern = combinatorsPattern.slice(1);
		combinatorsPattern = new RegExp(combinatorsPattern, 'gi');
		var match;
		while ((match = combinatorsPattern.exec(query)) !== null){
			combinatorsIndexes.push({start: match.index, end: combinatorsPattern.lastIndex});
		}
		return combinatorsIndexes;
	}
}
