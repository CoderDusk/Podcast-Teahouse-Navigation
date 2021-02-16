'use strict';
exports.main = async (event, context) => {
	let linkDB = uniCloud.database().collection('link')
	let result = await linkDB.add({
		name: event.name,
		logo: event.logo,
		categoryID: event.categoryID,
		categoryName: event.categoryName,
		description: event.description,
		link: event.link,
		sort: event.sort
	})
};
