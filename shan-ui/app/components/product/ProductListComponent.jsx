import React from 'react';
import axios from 'axios';

import TableClass from '../../classes/TableClass.jsx';

class ProductListComponent extends React.Component{

	constructor(props) {
		super(props);
		this.getProductList();

		this.state = {
			cols : [
			    {key:'dataHeaderId',label:'Id'},
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
		toastr.info('Fetching product list...');
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

	deleteProduct(data){
		var id = $(data.target).data('id');
		$("#deleteConfirmationModal").modal('show');
		$("#deleteButton").attr('data-id',id);
	}

	doDeleteProduct(data){
		var id = $(data.target).data('id');
		toastr.info('Deleting product...');
		axios.delete('products/'+id).then(function(response){
			toastr.clear();
			$(".data-row[data-id='"+id+"']").slideUp();
		}).catch(function(error){
			toastr.clear();
			toastr.error(error);
		});
	}

	render(){
		return (
			<div>
				<TableClass cols={this.state.cols} data={this.state.data} onDelete={this.deleteProduct} onUpdate={this.updateProduct}/>
				<div className="modal fade" id="deleteConfirmationModal" role="dialog">
				    <div className="modal-dialog">
				        <div className="modal-content">
				            <div className="modal-header">
				                <button type="button" className="close" data-dismiss="modal">&times;</button>
				                <h4 className="modal-title">Delete Item</h4>
				            </div>
				            <div className="modal-body">
				                <p>Are you sure want to delete this item?</p>
				            </div>
				            <div className="modal-footer">
				                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
				                <button type="button" className="btn btn-danger" 
				                		id="deleteButton" 
				                		onClick={this.doDeleteProduct.bind(this)} 
				                		data-dismiss="modal">Delete Item</button>
				            </div>
				        </div>
				    </div>
				</div>
			</div>
		);
	}

}

export default ProductListComponent;
