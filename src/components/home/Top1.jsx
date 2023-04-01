import React, {Component} from 'react'
import './Top1.css'

export default class Top1 extends Component {
	render() {
		return (
			<div className="Top1">
				
				<div className="column left t"><span>
					Companies
				</span></div> 
				<div className="column middle t">
					<span>Loyalty Schemes</span>
				</div>
				<div className="column right t">
					<span>Our Solution</span>
				</div>
				
				<div className="column left">
					<span>
						<img className="img" src="../../images/shop1.jpg" alt="shop" />
						<img className="img" src="../../images/shop2.jpg" alt="shop" />
					</span>
				</div>
				<div className="column middle">
					<span>
						<img className="img" src="../../images/loyalty1.jpg" alt="card" />
						<img className="img" src="../../images/loyalty2.jpg" alt="card" />
					</span>
				</div>
				<div className="column right">
					<span>
						<img className="img" src="../../images/logo.png" alt="what a gr8t logo" />
						<br />
						<h2>One loyalty card to rule them all</h2>
					</span>
				</div>
			</div>
		)
	}
}