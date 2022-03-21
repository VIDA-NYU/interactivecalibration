// react
import React, { useState } from 'react';

// styles
import './Header.css';
import './Dropdown.css';

const Header = ( props ) => {

    // setting state
    const [nbins, setNBins] = useState('10');
    const [currentClass, setCurrentClass] = useState('0');

    const nBinsChanged = (event) => {
        const newNBins = event.target.value;
        setNBins( newNBins );
        props.onConfigurationChanged({'nbins': newNBins, 'currentClass': currentClass});
    }

    const currentClassChanged = (event) => {
        const newClass = event.target.value;
        setCurrentClass( newClass );
        props.onConfigurationChanged({'nbins': nbins, 'currentClass': newClass});
    }

    return (
        <div className='header-wrapper'>

            <div className='button-container'>
                <select name='bins' id='nbins' value={nbins} onChange={nBinsChanged}>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='30'>30</option>
                    <option value='40'>40</option>
                </select>
            </div>

            <div className='button-container'>
                <select name='classes' id='classname' value={currentClass} onChange={currentClassChanged}>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                </select>
            </div>
            
        </div>)

}

export default Header;