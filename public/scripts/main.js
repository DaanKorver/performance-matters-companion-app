// 🚀 Imports
import {
	startDragging,
	stopDragging,
	dragHandler,
	instructionSlider,
} from './modules/drag.min.js'
import { mobileMenu } from './modules/navigation.min.js'

// 🍉 Variables
const hamburger = document.querySelector('.hamburger')
const accordion = document.getElementsByClassName('faq-question')

// 📚 Story
hamburger.addEventListener('click', mobileMenu)
instructionSlider.addEventListener('mousemove', dragHandler, false)
instructionSlider.addEventListener('mousedown', startDragging, false)
instructionSlider.addEventListener('mouseup', stopDragging, false)
instructionSlider.addEventListener('mouseleave', stopDragging, false)

const tabItems = document.querySelectorAll('.tabs li')
const tabContent = document.querySelectorAll('.tab-panel')
let currentTab = tabContent[0]

tabItems.forEach(tab => {
	tab.addEventListener('click', function () {
		for (let i = 0; i < tabItems.length; i++) {
			tabItems[i].classList.remove('active')
		}
		this.classList.add('active')
	})
})

for (let i = 0; i < tabItems.length; i++) {
	tabItems[i].addEventListener('click', function () {
		currentTab = tabContent[i]
		for (let j = 0; j < tabContent.length; j++) {
			if (tabContent != currentTab) {
				tabContent[j].classList.remove('active')
			}
		}
		currentTab.classList.add('active')
	})
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/scripts/sw.js')
}
