import React from 'react';

class AboutComponent extends React.Component{

	render(){
		return (
			<div className="panel panel-default">
			  	<div className="panel-heading">About</div>
			  	<div className="panel-body">
			  		Our project uses the following technologies: 
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
                        <li>Node Package Manager</li>
                        <li>Electron</li>
                        <li>Chromium</li>
                        <li>MongoDB</li>
                        <li>Python</li>
                        <li>PHP</li>
                        <li>Amazon Web Services</li>
                        <li>Ubuntu 16.04 Server</li>
			  		</ul>
                    Special thanks to:
                    <ul>
                        <li>Dr. Earl Swartzlander, faculty mentor</li>
                        <li>Dr. Bob Ascott, faculty mentor</li>
                        <li>Prof. Jim Wiley, EE 464</li>
                        <li>Ramesh Theivendran, Plantronics liaison</li>
                        <li>Charles Cameron, Plantronics liaison</li>
                        <li>Henry Chang, Technical TA</li>
                        <li>Department of Electrical and Computer Engineering, the University of Texas at Austin</li>
                    </ul>
                    Team members:
                    <ul>
                        <li>David Hernandez</li>
                        <li>Shantanu Kanvinde</li>
                        <li>Jason Thai</li>
                        <li>Travis Dinh</li>
                        <li>Gulcan Nelson</li>
                        <li>Justin Rubio</li>
                    </ul>
			  	</div>
			</div>
		);
	}

}

export default AboutComponent;
