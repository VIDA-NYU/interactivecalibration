// react
import React from 'react';

// styles
import './Header.css';

// bootstrap
// import { Button, Dropdown } from 'react-bootstrap';

function recomputechart(nbins){
    
    const incomingdata = (data) => { 
        console.log('DATAAA', data);

    };
    let comm = new CommAPI("submit_trajectory", incomingdata)
  
    // Send data
    comm.call({'nbins': nbins})
}

const Header = () => {

    return (
        <div className='header-wrapper'>

            <div className='button-container'>
                <label for="bins">Bins:</label>
                <select name="bins" id="nbins">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
            </div>

            <div className='button-container'>
                <button onClick={() => recomputechart(10)}>Bins</button>
            </div>
            
        </div>)

}

export default Header;