'use strict';
exports.main = async (event, context) => {
	let setting = uniCloud.database().collection('setting').get()
	return setting
};
