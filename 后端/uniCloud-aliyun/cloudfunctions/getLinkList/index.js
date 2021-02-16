'use strict';
exports.main = async (event, context) => {
	let linkDB = uniCloud.database().collection('link')
	let linkList = linkDB.get()
	
	return linkList
};
