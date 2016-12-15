export default class TreeHelper{
	constructor(data){
		this.data = data;
	}

	generateNodeName(prevNodeName, childNumber){
		return `${prevNodeName}/${childNumber}`;
	}

	removeNodeByName(index){
		this.removeNode(this.data, index, 0);
		return this.data;
	}

	getNodeByName(name){
		return this.getNode(this.data, name);
	}

	removeNode(data, name){
		for(var property in data){
			if (data.hasOwnProperty(property)){
				if (property === 'rules'){
					for (var i =0; i<data.rules.length; i++){
						if (data.rules[i].combinator && data.rules[i].nodeName === name){
							delete data.rules[i];
						}
						this.removeNode(data.rules[i].combinator, name);
					}
				}
			}
		}
	}

	getNode(data, name){
		if (name === '1'){
			return data;
		}
		for(var property in data){
			if (data.hasOwnProperty(property)){
				if (property === 'rules'){
					for (var i =0; i<data.rules.length;i++){
						if (data.rules[i].combinator && data.rules[i].nodeName === name){
							return data.rules[i];
						}
						this.getNode(data.rules[i].combinator, name);
					}
				}
			}
		}
	}
}
