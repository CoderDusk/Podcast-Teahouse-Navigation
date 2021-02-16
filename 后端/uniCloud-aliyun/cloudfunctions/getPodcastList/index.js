'use strict';
exports.main = async (event, context) => {
	let podcastDB = uniCloud.database().collection('podcast')
	let podcastList = podcastDB.get()
	
	return podcastList
};
