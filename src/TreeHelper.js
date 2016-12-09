class TreeHelper{
	constructor(data){
		this.data = data;
	}

	static insertNodeByIndex(node, index){
		var gotNode = getNode(this.data, index, 0);
		gotNode.push(node);
		return this.data;
	}

	static removeNodeByIndex(index){
		removeNode(this.data, index, 0);
		return this.data;
	}

	static getNodeByIndex(index){
		return getNode(this.data, index, 0);
	}

	removeNode(data, index, currIndex){
		for(var property in data){
			if (data.hasOwnProperty(property)){
				if (property === 'rules'){
					currIndex++;
					for (var i =0; i<data.rules.length;i++){
						if (data.rules[i].combinator){
							delete data.rules[i].combinator;
						}
					}
				}
			}
		}		
	}

	getNode(data, index, currIndex){
		if (index === currIndex){
			return data.rules;
		}
		for(var property in data){
			if (data.hasOwnProperty(property)){
				if (property === 'rules'){
					currIndex++;
					for (var i =0; i<data.rules.length;i++){
						if (data.rules[i].combinator){
							getNode(data.rules[i].combinator, index, currIndex);
						}
					}
				}
			}
		}
	}
}
