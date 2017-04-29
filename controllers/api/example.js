exports.index = async ctx => {
	ctx.response.body = {
		"message": "Hello api!",
		"status": "200",
	}
}