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
		res.render('index', {
			data,
		})
	})
})

app.get('/detail', (req, res) => {
	const id = req.query.id
	getTipById(id).then(data => {
		res.render('detail', { data: data.data[0] })
	})
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
