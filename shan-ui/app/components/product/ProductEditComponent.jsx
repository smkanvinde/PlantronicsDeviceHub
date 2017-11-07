import React from 'react';
import axios from 'axios';

class ProductEditComponent extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			id : this.props.params.productId,
           // mid : '',
			vid : '',
			pid : '',
            uid : '',
            comp : '',
            ser : '',
            manu : '',
            prod : '',
            rel : '',
            intr : '',
            upage : '',
            usage : ''
		}
		this.getData(this);
	}

	getData(self){
		toastr.info("Fetching device data...");
		axios.get('/products/'+self.props.params.productId).then(function(response){
			toastr.clear();
			//$("#productId").val(response.data.id);//response.data.id
			//$("#deviceMid").val(response.data.mongoId);
			$("#deviceVid").val(response.data.vendorId);
			$("#devicePid").val(response.data.productId);
			$("#deviceUid").val(response.data.userId);
			$("#deviceComp").val(response.data.userCompany);
			$("#deviceSer").val(response.data.serialNumber);
			$("#deviceManu").val(response.data.manufacturer);
			$("#deviceProd").val(response.data.product);
			$("#deviceRel").val(response.data.release);
			$("#deviceIntr").val(response.data.interface);
			$("#deviceUPage").val(response.data.usagePage);
			$("#deviceUsage").val(response.data.usage);
			self.setState({
				//id : response.data.id,
                //mid : response.data.mongoId,
				vid : response.data.vendorId,
				pid : response.data.productId,
				uid : response.data.userId,
				comp : response.data.userCompany,
				ser : response.data.serialNumber,
				manu : response.data.manufacturer,
				prod : response.data.product,
				rel : response.data.release,
				intr : response.data.interface,
				upage : response.data.usagePage,
				usage : response.data.usage
			});
		}).catch(function(error){
			toastr.clear();
			toastr.error(error);
		});
	}

	submitForm(event){
		event.preventDefault();
		var data = $(event.target).serialize();
		toastr.clear();
		var isError = false;
		if(this.state.vid===""){
			toastr.error("Vendor ID must be filled!");
			isError=true;
		}
		if(this.state.pid===""){
			toastr.error("Product ID must be filled!");
			isError=true;
		}
		if(this.state.uid===""){
			toastr.error("User ID must be filled!");
			isError=true;
		}
		if(this.state.comp===""){
			toastr.error("User Company must be filled!");
			isError=true;
		}
		if(this.state.ser===""){
			toastr.error("Serial Number must be filled!");
			isError=true;
		}
		if(this.state.manu===""){
			toastr.error("Manufacturer must be filled!");
			isError=true;
		}
		if(this.state.prod===""){
			toastr.error("Product name must be filled!");
			isError=true;
		}
		if(this.state.rel===""){
			toastr.error("Release must be filled!");
			isError=true;
		}
		if(this.state.intr===""){
			toastr.error("Interface must be filled!");
			isError=true;
		}
		if(this.state.upage===""){
			toastr.error("Usage Page must be filled!");
			isError=true;
		}
		if(this.state.usage===""){
			toastr.error("Usage must be filled!");
			isError=true;
		}

		if(!isError){
			toastr.info("Updating product data...");
			axios.put('/products/'+this.props.params.productId,{
				vid : this.state.vid,
				pid : this.state.pid,
				uid : this.state.uid,
				comp : this.state.comp,
				ser : this.state.ser,
				manu : this.state.manu,
				prod : this.state.prod,
				rel : this.state.rel,
				intr : this.state.intr,
				upage : this.state.upage,
				usage : this.state.usage
			}).then(function(response){
				toastr.clear();
				location.href = "#/product/list";
			}).catch(function(error){
				toastr.clear();
				toastr.error(error);
			});
		}
	}


	onProductVidChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : e.target.value.trim(),
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductPidChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : e.target.value.trim(),
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductUidChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : e.target.value.trim(),
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductCompChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : e.target.value.trim(),
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductSerChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : e.target.value.trim(),
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductManuChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : e.target.value.trim(),
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductProdChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : e.target.value.trim(),
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductRelChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : e.target.value.trim(),
			intr : this.state.intr,
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductIntrChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : e.target.value.trim(),
			upage : this.state.upage,
			usage : this.state.usage
		});
	}
	onProductUPageChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : e.target.value.trim(),
			usage : this.state.usage
		});
	}
	onProductUsageChange(e){
		this.setState({
			//id : this.state.id,
            //mid : this.state.mid,
			vid : this.state.vid,
			pid : this.state.pid,
			uid : this.state.uid,
			comp : this.state.comp,
			ser : this.state.ser,
			manu : this.state.manu,
			prod : this.state.prod,
			rel : this.state.rel,
			intr : this.state.intr,
			upage : this.state.upage,
			usage : e.target.value.trim()
		});
	}


	render(){
		return (
			<div>
				<form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>         
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceVid">Vendor ID : </label>
                        <div className="col-sm-10">
                            <input type="number" name="deviceVid"
                                onChange={this.onProductVidChange.bind(this)}
                                id="deviceVid" className="form-control" placeholder="Vendor ID" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="devicePid">Product ID : </label>
                        <div className="col-sm-10">
                            <input type="number" name="devicePid"
                                onChange={this.onProductPidChange.bind(this)}
                                id="devicePid" className="form-control" placeholder="Product ID" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceUid">User ID : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceUid"
                                onChange={this.onProductUidChange.bind(this)}
                                id="deviceUid" className="form-control" placeholder="User ID" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceComp">User Company : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceComp"
                                onChange={this.onProductCompChange.bind(this)}
                                id="deviceComp" className="form-control" placeholder="User Company" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceSer">Serial Number : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceSer"
                                onChange={this.onProductSerChange.bind(this)}
                                id="deviceSer" className="form-control" placeholder="Serial Number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceManu">Manufacturer : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceManu"
                                onChange={this.onProductManuChange.bind(this)}
                                id="deviceManu" className="form-control" placeholder="Manufacturer" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceProd">Product : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceProd"
                                onChange={this.onProductProdChange.bind(this)}
                                id="deviceProd" className="form-control" placeholder="Product" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceRel">Release : </label>
                        <div className="col-sm-10">
                            <input type="number" name="deviceRel"
                                onChange={this.onProductRelChange.bind(this)}
                                id="deviceRel" className="form-control" placeholder="Release" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceIntr">Interface : </label>
                        <div className="col-sm-10">
                            <input type="number" name="deviceIntr"
                                onChange={this.onProductIntrChange.bind(this)}
                                id="deviceIntr" className="form-control" placeholder="Interface" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceUPage">Usage Page : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceUPage"
                                onChange={this.onProductUPageChange.bind(this)}
                                id="deviceUPage" className="form-control" placeholder="Usage Page" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deviceUsage">Usage : </label>
                        <div className="col-sm-10">
                            <input type="text" name="deviceUsage"
                                onChange={this.onProductUsageChange.bind(this)}
                                id="deviceUsage" className="form-control" placeholder="Usage" />
                        </div>
                    </div>


				    <div className="form-group">
				        <div className="col-sm-offset-2 col-sm-10">
				            <button type="submit" className="btn btn-default">Save</button>
				        </div>
				    </div>
				</form>

			</div>
		);
	}

}

export default ProductEditComponent;
