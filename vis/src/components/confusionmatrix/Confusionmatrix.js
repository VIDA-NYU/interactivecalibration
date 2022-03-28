// react
import React, { useState } from 'react';

// styles
import './Confusionmatrix.css';

const Confusionmatrix = ( props ) => {

    return(
        <div className='confusion-matrix-container'>
            <div className='confusion-matrix-header'>
                <p>Confusion Matrix</p>
            </div>
            <div className='confusion-matrix-body'>

                { props.matrixdata.map( (row, rowindex) => 
                    <div className='matrix-row'>
                        { props.matrixdata[rowindex].map( (column, columnindex) => 
                            <div className='matrix-column' style={{backgroundColor: column}}></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}

export default Confusionmatrix;