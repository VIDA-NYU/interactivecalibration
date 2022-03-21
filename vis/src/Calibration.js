// react
import React, { useState } from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';

const Calibration = () => {


    const configurationChanged = (configuration) => {

        console.log(configuration);
        // setChartData(generate_data());

    }

    const generate_data = () => {

        const mockdata = [
            {'x': 0.02049036, 'y': Math.random()},
            {'x': 0.1447042,  'y': Math.random()},
            {'x': 0.24656793, 'y': Math.random()},
            {'x': 0.34570367, 'y': Math.random()},
            {'x': 0.44950147, 'y': Math.random()},
            {'x': 0.54758096, 'y': Math.random()},
            {'x': 0.648824,   'y': Math.random()},
            {'x': 0.74482655, 'y': Math.random()},
            {'x': 0.83570598, 'y': Math.random()},
            {'x': 0.99494154, 'y': Math.random()}];

        return mockdata;

    }

    // setting state
    const [chartdata, setChartData] = useState( generate_data() );


    return (
        <div>
            <div className='calibration-wrapper'>
                <div className='header-container'>
                    <Header  onConfigurationChanged={configurationChanged} />
                </div>
                <div className='plot-wrapper'>
                    <div className='calibration-container'>
                        <ClassicCalibrationPlot chartdata={chartdata}></ClassicCalibrationPlot>
                    </div>
                    <div className='histograms-container'>
                        
                    </div>
                </div>
                <div className='footer-container'></div>
            </div>
        </div>
    );
}

export default Calibration;