import React from 'react'
import ReactDOM from 'react-dom'
import { Feeles } from '@hackforplay/ide/umd/index'

fetch('https://storage.googleapis.com/hackforplay-assets/beta-2')
	.then(function(response) {
		return response.text()
	})
	.then(function(text) {
		var rootElement = document.querySelector('.h4p__app')
		ReactDOM.render(
			React.createElement(Feeles, {
				jsonURL: './index.json',
				asset: JSON.parse(text),
				rootElement: rootElement
			}),
			rootElement
		)
	})
