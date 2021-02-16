'use strict';
exports.main = async (event, context) => {
	let podcastDB = uniCloud.database().collection('podcast')
	let result = await podcastDB.doc(event.id).update({
		name:event.name,
		logo:event.logo,
		categoryID:event.categoryID,
		categoryName:event.categoryName,
		host:event.host,
		description:event.description,
		rssLink:event.rssLink,
		xiaoyuzhouLink:event.xiaoyuzhouLink,
		sort:event.sort,
		isRecommended:event.isRecommended
	})
	
	return result
};
