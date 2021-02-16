'use strict';
exports.main = async (event, context) => {
	let podcastDB = uniCloud.database().collection('podcast')
	let recommendPodcast = podcastDB.where({
		isRecommended:true
	}).get()
	
	return recommendPodcast
};
