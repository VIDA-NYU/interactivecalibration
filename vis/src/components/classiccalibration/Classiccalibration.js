// react
import React from 'react';

// styles
import './Classiccalibration.css';

// hooks
import { renderD3 } from '../../hooks/render.hook';

// third-party


const ClassicCalibrationPlot = () => {

    const ref = renderD3( 
        (svgref) => {
            console.log(svgref);
        });

    return (
        <div className='plot-container'>
            <svg ref={ref}></svg>
        </div>
    );
}

export default ClassicCalibrationPlot;