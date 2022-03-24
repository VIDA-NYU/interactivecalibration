// react
import React, { useState } from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';
import Featurehistogram from './components/histogram/Featureshistogram';
import Instanceview from './components/instanceview/Instanceview';



const Calibration = ( props ) => {

    const mockheader = ['Age', 'Education-Num', 'Sex', 'Capital Gain', 'Capital Loss','Hours per week'];
    const mockbody = 
    [[ 3.000,  1.130,  1.000,  2.174,  0.000, 4.000],
    [ 8.400,  1.130,  1.000,  0.000,  0.000, 2.220],
    [4.000, 4.200,  1.000,  0.000,  0.000, 4.000],
    [1.060, 1.200,  1.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    [1.200,  1.520,  0.000,  0.000,  0.000, 4.000]];

    const reliability_diagram_brushed = (brushrange) => {

        console.log('brushed');
        console.log('brushrange: ', brushrange);

    }
 
    const configuration_changed = (configuration) => {

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
                    <Header  onConfigurationChanged={configuration_changed} />
                </div>
                <div className='plot-wrapper'>
                    <div className='calibration-container'>
                        <ClassicCalibrationPlot chartdata={chartdata} onDiagramBrushed={reliability_diagram_brushed}></ClassicCalibrationPlot>
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
                <div className='footer-container'>
                    <div className='instance-view-wrapper'>
                        <Instanceview 
                            tableheader={mockheader}
                            tablebody={mockbody} />
                    </div>
                    <div className='confusion-matrix-wrapper'></div>
                </div>
            </div>
        </div>
    );
}

export default Calibration;