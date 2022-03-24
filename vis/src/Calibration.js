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

    // setting state
    const [chartdata, setChartData] = useState( [] );
    const [tableHeader, setTableHeader] = useState( [] );
    const [tableBody, setTableBody] = useState( [] );

    const reliability_diagram_brushed = (brushrange) => {

        const instance_table = ( data ) => {
            setTableHeader( data.tableheader );
            setTableBody( data.tablebody );
       };
       let comm_instance_table = new CommAPI('filter_by_pred_range', instance_table);

       // Send data
       comm_instance_table.call({'params': { 'rangestart': brushrange.start, 'rangeend': brushrange.end  }  });

    }
 
    const configuration_changed = (configuration) => {

        const reliability_diagram = ( data ) => {
             setChartData( data.chartdata );
        };
        let comm_configuration_changed = new CommAPI('get_reliability_diagram', reliability_diagram);

        // Send data
        comm_configuration_changed.call({'params': { nbins: parseInt(configuration.nbins), currentclass: parseInt(configuration.currentClass) }  });

    }

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
                            {props.histdata.map( (histogram, index) => 
                                <div key={index} className='histogram-container'>
                                    <Featurehistogram histdata={histogram} />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className='footer-container'>
                    <div className='instance-view-wrapper'>
                        <Instanceview 
                            tableheader={tableHeader}
                            tablebody={tableBody} />
                    </div>
                    <div className='confusion-matrix-wrapper'></div>
                </div>
            </div>
        </div>
    );
}

export default Calibration;