// react
import React from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';

const Calibration = () => {
    return (
        <div>
            <div className='calibration-wrapper'>
                <div className='header-container'></div>
                <div className='plot-container'>
                    <ClassicCalibrationPlot></ClassicCalibrationPlot>
                </div>
                <div className='footer-container'></div>
            </div>
        </div>
    );
}

export default Calibration;