import React from 'react';
import Eingabe from './Eingabe';
import Ausgabe from './Ausgabe';
import './Unternehmenswertrechner.scss';

const Unternehmenswertrechner = () => {
    return (
        <div className="Unternehmenswertrechner">
            <Ausgabe />
            <Eingabe />
        </div>
    );
};
export default Unternehmenswertrechner;
