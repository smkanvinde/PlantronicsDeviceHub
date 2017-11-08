import React from 'react';

const TableClass = React.createClass({

	bindHeader:function(){
		var cols = this.props.cols;
		var elements = cols.map(function(colHeader){
			return <th key={colHeader.key}>{colHeader.label}</th>
		});
		//action column
		elements.push(<th key="dataHeaderAction">Action</th>);
		return elements;
	},

	bindData:function(){
		var data = this.props.data;
		var self = this;
		return data.map(function(colData){
			var rowElement = [];
			$.each(colData,function(key,val){
				rowElement.push(<td key={key}>{val}</td>);				
			});
			//action column
			rowElement.push(
				<td key="actionColumn">
					<div className="col-md-2">
						<button className="btn btn-xs btn-primary" onClick={self.props.onUpdate} data-id={colData.id}>Edit</button>
					</div>
				</td>
			);
			return <tr className='data-row' data-id={colData.id} key={colData.id}>{rowElement}</tr>;
		});
	},

    render:function(){

    	var tableHeader = this.bindHeader();
        var tableData = this.bindData();

        return (
        	<table className='table table-hover table-striped table-bordered'>
        		<thead>
        			<tr>{tableHeader}</tr>
        		</thead>
        		<tbody>
        			{tableData}
        		</tbody>
        	</table>
        );
    }

});

export default TableClass;
