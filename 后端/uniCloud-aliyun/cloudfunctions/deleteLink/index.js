'use strict';
exports.main = async (event, context) => {
	let linkDB = uniCloud.database().collection('link')
	let result = linkDB.doc(event.id).remove()
	
	return result
};
