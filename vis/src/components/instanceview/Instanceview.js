// react
import React, { useState } from "react";

// styles
import './Instanceview.css'

const Instanceview = (props) => {

    return (
        <div className='instance-view-table-wrapper'>
            
            <div className='instance-view-table-scrollable'>
                <table className="instance-table">
                    <thead>
                        <tr>
                            {props.tableheader.map( (name, index) => 
                                <th key={index}>{name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.tablebody.map( (row, rowindex) => 
                            <tr key={rowindex} className={ props.classifications[rowindex] === 1  ? 'positive-instance' : 'negative-instance' }>
                                { row.map( (value, columnindex) => 
                                    <td key={columnindex} >{value}</td>    
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Instanceview;