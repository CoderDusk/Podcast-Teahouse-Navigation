'use strict';
exports.main = async (event, context) => {
	let categoryDB = uniCloud.database().collection('category')
	let category = categoryDB.doc(event.id).get()
	
	return category
};
