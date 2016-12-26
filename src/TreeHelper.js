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
						if (data.rules[i].nodeName === name){
							data.rules.splice(i, 1);
							return;
						} else if (data.rules[i].combinator){
							this.removeNode(data.rules[i], name);							
						}
					}
				}
			}
		}
	}

	getNode(treeData, name){
		if (name === '1'){
			return treeData;
		}
		for(var property in treeData){
			if (treeData.hasOwnProperty(property)){
				if (property === 'rules'){
					var node = null;
					for (var i = 0; i < treeData.rules.length; i++){
						if (treeData.rules[i].nodeName === name){
							node = treeData.rules[i];
						} else if(treeData.rules[i].combinator && node === null){
							node = this.getNode(treeData.rules[i], name);							
						}
					}
					return node;
				}
			}
		}
	}
}
