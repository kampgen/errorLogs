const axios = require('axios');

setInterval(() => {
	axios
		.post(
			'http://prd-online-analytics-elastic01-poa.rbs.com.br:9200/nossalog-2019.11.01/_search',
			{
				query: {
					match_all: {}
				},
				sort: [{ date: { order: 'desc' } }],
				size: 1000
			}
		)
		.then(response => {
			let date = new Date();
			console.log(`--------${date.getHours()}:${date.getMinutes()}-------`);
			let data = response.data.hits.hits;

			data = data.filter(log => {
				if (
					log._source.code === '555' ||
					log._source.code === '554' ||
					log._source.code === '553'
				)
					return true;
			});

			console.log(data);
		})
		.catch(function(error) {
			console.log('erro', error);
		});
}, 60000 * 10);
