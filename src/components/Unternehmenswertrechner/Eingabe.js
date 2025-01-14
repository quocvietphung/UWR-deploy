import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressSection from './ProgressSection';
import BasisInfo from './BasisInfo';
import Kennzahlen from './Kennzahlen';
import Bereinigung from './Bereinigung';
import EquityBridge from './EquityBridge';
import Quality from "./Quality";
import Anlass from "./Anlass";
import { Header } from 'semantic-ui-react';
import './Unternehmenswertrechner.scss';

import { setActiveSection, finishSection } from '../../redux/sectionsSlice';

const Eingabe = () => {
    const dispatch = useDispatch();
    const sectionData = useSelector((state) => state.sections.sectionData);

    const updateActiveSection = (section) => {
        dispatch(setActiveSection(section));
    };

    const handleZuruckClick = () => {
        const currentIndex = sectionData.sectionOrder.findIndex((section) => section === sectionData.activeSection);
        const previousIndex = currentIndex - 1;

        if (previousIndex >= 0) {
            const previousSection = sectionData.sectionOrder[previousIndex];
            dispatch(setActiveSection(previousSection));
        }
    };

    const handleWeiterClick = () => {
        const currentIndex = sectionData.sectionOrder.findIndex((section) => section === sectionData.activeSection);
        const nextIndex = currentIndex + 1;

        if (nextIndex < sectionData.sectionOrder.length) {
            const nextSection = sectionData.sectionOrder[nextIndex];
            dispatch(finishSection(sectionData.activeSection));
            dispatch(setActiveSection(nextSection));
        }
    };

    const handleAnlassFinish = () => {
        dispatch(finishSection(sectionData.activeSection));
    };

    useEffect(() => {
        console.log('Active Section:', sectionData.activeSection);
        console.log('Finished Sections:', sectionData.finishedSections);
    }, [sectionData]);

    return (
        <div className="Eingabe">
            <Header
                as="h1"
                style={{
                    color: '#008000',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}
            >
                Willkommen beim Unternehmenswertrechner
            </Header>

            <ProgressSection setActiveSection={updateActiveSection} activeSection={sectionData.activeSection} finishedSections={sectionData.finishedSections}/>
            <div className="unternehmenswertrechner-container">
                {sectionData.activeSection === 'basis' ? (
                    <BasisInfo
                        sectionName="basis"
                        onWeiterClick={handleWeiterClick}
                        className="shared-section"
                    />
                ) : sectionData.activeSection === 'kennzahlen' ? (
                    <Kennzahlen
                        sectionName="kennzahlen"
                        onZuruckClick={handleZuruckClick}
                        onWeiterClick={handleWeiterClick}
                        className="shared-section"
                    />
                ) : sectionData.activeSection === 'bereinigung' ? (
                    <Bereinigung
                        sectionName="bereinigung"
                        onZuruckClick={handleZuruckClick}
                        onWeiterClick={handleWeiterClick}
                        className="shared-section"
                    />
                ) : sectionData.activeSection === 'equity' ? (
                    <EquityBridge
                        sectionName="equity"
                        onZuruckClick={handleZuruckClick}
                        onWeiterClick={handleWeiterClick}
                        className="shared-section"
                    />
                ) : sectionData.activeSection === 'quality' ? (
                    <Quality
                        sectionName="quality"
                        onZuruckClick={handleZuruckClick}
                        onWeiterClick={handleWeiterClick}
                        className="shared-section"
                    />
                ) : sectionData.activeSection === 'anlass' ? (
                    <Anlass
                        sectionName="anlass"
                        onZuruckClick={handleZuruckClick}
                        onAnlassFinish={handleAnlassFinish}
                        className="shared-section"
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Eingabe;
