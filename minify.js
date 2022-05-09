const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const cssnano = require('cssnano')
const fs = require('fs')
const path = require('path')
const uglifyJS = require('uglify-js')
const inputCss = path.join(__dirname, '/public/styles/style.css')
const outputCss = path.join(__dirname, '/public/styles/style.min.css')

const jsFiles = ['modules/drag.js', 'modules/navigation.js', 'main.js']

fs.readFile(inputCss, (err, buffer) => {
	postcss([autoprefixer, cssnano])
		.process(buffer, { from: inputCss, to: outputCss })
		.then(result => {
			fs.writeFile(outputCss, result.css, () => true)
		})
})

jsFiles.forEach(file => {
	const inputPath = path.join(__dirname, `/public/scripts/${file}`)
	let outputName = file.split('.')
	outputName[1] = 'min'
	outputName[2] = 'js'
	outputName = outputName.join('.')
	const outputPath = path.join(__dirname, `/public/scripts/${outputName}`)
	//Minify JS here
	fs.readFile(inputPath, (err, buff) => {
		const code = buff.toString()
		const result = uglifyJS.minify(code)
		fs.writeFile(outputPath, result.code, () => true)
	})
})
