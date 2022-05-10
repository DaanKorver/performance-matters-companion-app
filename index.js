const express = require('express')
const compression = require('compression')
const { getPage, getTip, getFaq, getTipById } = require('./api')

const app = express()
const PORT = process.env.PORT || 8000

app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
	Promise.all([getPage('over'), getTip(), getFaq()]).then(data => {
		const [tabs, tips, faq] = data
		res.render('index', {
			tabs,
			tips,
			faq,
		})
	})
})

app.get('/detail', (req, res) => {
	const id = req.query.id
	getTipById(id).then(data => {
		res.render('detail', { data: data.data[0] })
	})
})

app.get('/offline', (req, res) => {
	res.render('offline')
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
