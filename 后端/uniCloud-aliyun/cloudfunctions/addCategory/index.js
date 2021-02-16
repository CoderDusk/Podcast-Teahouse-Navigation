'use strict';
exports.main = async (event, context) => {
	let categoryDB = uniCloud.database().collection('category')
	let res = await categoryDB.add({
		name:event.name,
		sort:event.sort,
		type:event.type
	})
	
	return res
};
