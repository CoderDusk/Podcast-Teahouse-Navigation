'use strict';
exports.main = async (event, context) => {
	let categoryDB = uniCloud.database().collection('category')
	let result = categoryDB.doc(event.id).remove();
	
	return result
};
