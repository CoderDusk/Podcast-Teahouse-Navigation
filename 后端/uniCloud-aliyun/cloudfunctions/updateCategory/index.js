'use strict';
exports.main = async (event, context) => {
	let categoryDB = uniCloud.database().collection('category')
	let result = await categoryDB.doc(event.id).update({
		name:event.name,
		type:event.type,
		sort:event.sort
	})
	
	return result
};
