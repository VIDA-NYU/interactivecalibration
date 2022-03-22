// react
import React, { useState } from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';
import Featurehistogram from './components/histogram/Featureshistogram';


const Calibration = ( props ) => {

    const configurationChanged = (configuration) => {

        const reliability_diagram = ( data ) => {
             setChartData( data.chartdata );
        };
        let comm = new CommAPI('get_reliability_diagram', reliability_diagram)

        // Send data
        comm.call({'params': { nbins: parseInt(configuration.nbins), currentclass: parseInt(configuration.currentClass) }  })

    }

    // getting histograms data
    const histograms = props.histdata.map( element => element.values );

    // setting state
    const [chartdata, setChartData] = useState( [] );

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
                    <div className='histograms-wrapper'>
                        <div className='histograms-wrapper-scrollable'>
                            {histograms.map( (histogram, index) => 
                                <div key={index} className='histogram-container'>
                                    <Featurehistogram histdata={histogram}/>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className='footer-container'></div>
            </div>
        </div>
    );
}

export default Calibration;