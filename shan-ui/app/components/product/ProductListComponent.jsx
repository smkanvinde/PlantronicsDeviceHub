import React from 'react';
import axios from 'axios';

import TableClass from '../../classes/TableClass.jsx';

class ProductListComponent extends React.Component{

	constructor(props) {
		super(props);
		this.getProductList();

		this.state = {
			cols : [
			    {key:'dataHeaderId',label:'id'},
			    {key:'dataHeaderMid',label:'Mongo ID'},
			    {key:'dataHeaderVid',label:'Vendor ID'},
			    {key:'dataHeaderPid',label:'Product ID'},
			    {key:'dataHeaderUid',label:'User ID'},
			    {key:'dataHeaderComp',label:'User Company'},
			    {key:'dataHeaderSer',label:'Serial Number'},
			    {key:'dataHeaderManu',label:'Manufacturer'},
			    {key:'dataHeaderProd',label:'Product'},
			    {key:'dataHeaderRel',label:'Release'},
			    {key:'dataHeaderIntr',label:'Interface'},
			    {key:'dataHeaderUPage',label:'Usage Page'},
			    {key:'dataHeaderUsage',label:'Usage'}
			],
			data : [
				
			]
		};
	}

	getProductList(){
		toastr.info('Fetching device list...');
		var self = this;
		axios.get('products').then(function(response){
			toastr.clear();
			self.setState({
				cols : self.state.cols,
				data : response.data
			});
		}).catch(function(error){
			toastr.clear();
			toastr.error(error);
		});
	}

	updateProduct(data){
		var id = $(data.target).data('id');
		location.href='#/product/edit/'+id;
	}


	render(){
		return (
			<div>
				<TableClass cols={this.state.cols} data={this.state.data} onUpdate={this.updateProduct}	/>		
            </div>
		);
	}

}

export default ProductListComponent;
