// react
import React, { useState } from 'react';

// third-party
import * as d3 from 'd3';

// styles
import './Confusionmatrix.css';

const Confusionmatrix = ( props ) => {

    // getting max count
    const maxCount = d3.max( props.matrixdata, row => {
        return d3.max(row)
    });

    // creating color scale
    const cScale = d3.scaleSequential(d3.interpolateBlues).domain([0, maxCount])

    return(
        <div className='confusion-matrix-container'>
            <div className='confusion-matrix-header'>
                <p>Confusion Matrix</p>
            </div>
            <div className='confusion-matrix-body'>

                { props.matrixdata.map( (row, rowindex) => 
                    <div className='matrix-row'>
                        { props.matrixdata[rowindex].map( (column, columnindex) => 
                            <div className='matrix-column' style={{backgroundColor: cScale(column)}}></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}

export default Confusionmatrix;