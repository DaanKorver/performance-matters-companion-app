const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))
const baseUrl = 'https://mijnhva.api.fdnd.nl/v1'

async function getPage(slug) {
	return await fetchApi(`${baseUrl}/page/slug/${slug}`)
}

async function getFaq() {
	const faq = await fetchApi(`${baseUrl}/faq`)
	return Object.entries(groupBy(faq.data, 'faq_category_id'))
}

async function getTip() {
	return await fetchApi(`${baseUrl}/tip`)
}

async function getTipById(id) {
	return await fetchApi(`${baseUrl}/tip/${id}`)
}

async function fetchApi(endpoint) {
	try {
		const res = await fetch(endpoint)
		const json = await res.json()
		return json
	} catch (err) {
		console.log(err)
	}
}

const groupBy = (items, key) =>
	items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{}
	)

module.exports = { getPage, getFaq, getTip, getTipById }
