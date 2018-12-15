import {MDBSelectOption} from 'mdbreact'
import React from 'react'
var languages = require('language-list')();
const ISO6391 = require('iso-639-1')


let languageCodes = languages.getData()


const getUserLocale = function(code) {
	let User = JSON.parse(localStorage.getItem("User"))
	if (!User){
		return false
	}
	return User.low_la === code
}

let options = languageCodes.map((lang) => (
	<MDBSelectOption key={lang.code} checked={getUserLocale(lang.code)} value={lang.code} >{lang.language}</MDBSelectOption>
))




export default options