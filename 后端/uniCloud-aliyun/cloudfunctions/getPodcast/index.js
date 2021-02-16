'use strict';
exports.main = async (event, context) => {
	let podcastDB = uniCloud.database().collection('podcast')
	let result = podcastDB.doc(event.id).get()
	
	return result
};
