import React from 'react';

class AboutComponent extends React.Component{

	render(){
		return (
			<div className="panel panel-default">
			  	<div className="panel-heading">About</div>
			  	<div className="panel-body">
			  		This is a simple CRUD tutorial result, this project using : 
			  		<ul>
			  			<li>NodeJS</li>
			  			<li>Express JS</li>
			  			<li>MySQL</li>
			  			<li>Webpack</li>
			  			<li>Babel</li>
			  			<li>React</li>
			  			<li>Axios</li>
			  			<li>jQuery</li>
			  			<li>Bootstrap</li>
			  			<li>Toastr</li>
			  		</ul>
			  	</div>
			</div>
		);
	}

}

export default AboutComponent;