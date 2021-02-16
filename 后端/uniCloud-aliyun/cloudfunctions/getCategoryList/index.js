'use strict';
exports.main = async (event, context) => {
	let categoryDB = uniCloud.database().collection('category')
	if(event.type == 'all'){
		let categoryList = categoryDB.get()
		
		return categoryList
	}else{
		let categoryList = categoryDB.where({
			type:event.type
		}).get()
		
		return categoryList
	}
	
	
};
