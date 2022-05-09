const express = require('express')
const compression = require('compression')
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))
const app = express()
const PORT = process.env.PORT || 8000

app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
	Promise.all([getPage('over'), getTip(), getFaq()]).then(data => {
		console.log(data)
		res.render('index', {
			data,
		})
	})
})

app.listen(PORT, () => {
	console.log(`Listening on http://[::]:${PORT}`)
})

async function fetchApi(endpoint) {
	try {
		const res = await fetch(endpoint)
		const json = await res.json()
		return json
	} catch (err) {
		console.log(err)
	}
}

const baseUrl = 'https://mijnhva.api.fdnd.nl/v1'

async function getAllPages() {
	return await fetchApi(`${baseUrl}/page`)
}

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

async function getSection() {
	return await fetchApi(`${baseUrl}/section`)
}

const groupBy = (items, key) =>
	items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{}
	)
