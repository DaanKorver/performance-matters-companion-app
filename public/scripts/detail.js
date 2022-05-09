import { getTipById } from "./modules/api.js"

const id = new URLSearchParams(window.location.search).get('id')
const tipTitle = document.querySelector('.tip-title')
const tipBody = document.querySelector('.tip-body')

if(!id) window.location.href = 'index.html'

render()

async function render() {
  const tip = await getTipById(id)
  if(tip.data.length === 0) window.location.href = 'index.html'
  tipTitle.innerText = tip.data.title
  tipBody.innerText = tip.data.body
}