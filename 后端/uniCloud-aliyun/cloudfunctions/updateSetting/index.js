'use strict';
exports.main = async (event, context) => {
	let setting = uniCloud.database().collection('setting')
	let res = await setting.update({
		logo:event.logo,
		submitMethod:event.submitMethod
	})
	
	return res
};
