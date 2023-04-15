import {Component} from 'react'
import React from 'react'
import './ImgBanner.css'

export default class ImgBanner extends Component {
	render() {
		return (
			<div className="cont">
  			<img src="../../../images/cafe.jpg" alt="Cafe" style={{width:"100%"}} />
			  <div className="top-left" style={{width:"30%"}}>
					<h1>Meet Gr8t, the modern solution for loyalty schemes</h1>
				</div>
			</div>
		)
	}
}