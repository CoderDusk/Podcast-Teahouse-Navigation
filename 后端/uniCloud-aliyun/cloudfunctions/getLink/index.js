'use strict';
exports.main = async (event, context) => {
	let linkDB = uniCloud.database().collection('link')
	let link = linkDB.doc(event.id).get()
	
	return link
};
