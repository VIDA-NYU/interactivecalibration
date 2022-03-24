// react
import React, { useState } from "react";

// styles
import './Instanceview.css'

const Instanceview = (props) => {

    console.log(props.tableheader);

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
                        {props.tablebody.map( (row, index) => 
                            <tr key={index}>
                                { row.map( (value, index) => 
                                    <td key={index}>{value}</td>    
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