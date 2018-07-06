function wait(params, req, res) {
	return new Promise(function (resolve, reject) {
		Company.create({
			name: params.name,
			city: params.city,
			address: params.address
		}, (err, result) => {
			if (err) {
				return reject(res.serverError());
			}
			console.log("xong!!")
			return resolve(res.ok(result));
		})
	});
}

async function main(params, req, res) {
	await wait(params, req, res)
	console.log("done")
}

module.exports = {
	async create(req, res) {
		let params = req.allParams();
		// req.file('file').upload(function (err, uploadedFiles){
		// 	if (err) return res.serverError(err);
		// 	return res.json({
		// 		message: uploadedFiles.length + ' file(s) uploaded successfully!',
		// 		files: uploadedFiles
		// 	});
		// });
		if (!params.name) {
			res.badRequest({
				err: 'Name is required field!'
			})
		} else {
			let company = await Company.create({
				name: params.name,
				city: params.city,
				address: params.address
			})
			return res.ok(company)
			// main(params, req, res)
		}
	},

	async find(req, res) {
		try {
			let company = await Company.find().populate('jobs')
			return res.ok(company)
		} catch (err) {
			res.serverError(err)
		}
	},

	async findOne(req, res) {
			let company = await Company.findOne({
				id: req.params.id
			})
			if (!company) {
				return res.serverError()
			}
			return res.ok(company)
	},

	async update(req, res) {
		let params = req.allParams();
		var updatedCompany = await Company.update({id: req.params.id})
		.set({
			name: params.name,
			city: params.city,
			address: params.address})
		.fetch();
		
		if (!updatedCompany.length) {
			res.serverError()
		} else {
			res.ok(updatedCompany)
		}
	},

	async delete(req, res) {
		var deletedCompany = await Company.destroy({id: req.params.id}).fetch();
		
		if (!deletedCompany.length) {
			res.serverError()
		} else {
			res.ok(deletedCompany)
		}
	}
}