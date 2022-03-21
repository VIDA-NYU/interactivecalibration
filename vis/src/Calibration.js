// react
import React from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';

const Calibration = ( props ) => {

    return (
        <div>
            <div className='calibration-wrapper'>
                <div className='header-container'>
                    <Header/>
                </div>
                <div className='plot-container'>
                    <ClassicCalibrationPlot chartdata={props.chartdata}></ClassicCalibrationPlot>
                </div>
                <div className='footer-container'></div>
            </div>
        </div>
    );
}

export default Calibration;