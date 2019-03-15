/**
* @desc Response object function
* @param {string} code - The code of the response.
* @param {string} msg - The message of the respones.
* @param {string} data - The data of the response.
* @returns {object} response object
*/
global.responseObject = function (code, msg, data = {}) {
	return {
		"response_code": code,
		"response_message": msg,
		"response_data": data,
	};
};

/**
* @desc Response boolean function
* @param {key} code - The code of the response.
* @returns {boolean} response object
*/
global.is_key_existed = function (paramKey) {
	return paramKey !== undefined && paramKey !== "" && paramKey !== null;
};


