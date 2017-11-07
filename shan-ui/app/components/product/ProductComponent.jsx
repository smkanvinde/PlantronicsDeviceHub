import React from 'react';
import { Link } from 'react-router'

class ProductComponent extends React.Component{

	render(){
		return (
			<div className="panel panel-default">
			  	<div className="panel-heading">Device Management</div>
			  	<div className="panel-body">
					<ul className="nav nav-tabs">
					    <li><Link activeClassName="active" to="product/list">Device List</Link></li>
					</ul>
					<br />
					{this.props.children}
			  	</div>
			</div>
		);
	}

}

export default ProductComponent;
