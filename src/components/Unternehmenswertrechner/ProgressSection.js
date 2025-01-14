import React from 'react';
import { Grid } from 'semantic-ui-react';

const sections = [
    { key: 'basis', name: 'Basis-Infos' },
    { key: 'kennzahlen', name: 'Kennzahlen' },
    { key: 'bereinigung', name: 'Bereinigung' },
    { key: 'equity', name: 'Equity Bridge' },
    { key: 'quality', name: 'Qualität' },
    { key: 'anlass', name: 'Anlass' },
];

const ProgressSection = ({ setActiveSection, activeSection, finishedSections }) => {
    const handleItemClick = (target) => {
        if (activeSection === target || finishedSections.includes(target)) {
            setActiveSection(target);
        }
    };

    return (
        <div className="nav-wrapper">
            <Grid columns={6}>
                <Grid.Row>
                    {sections.map(section => (
                        <Grid.Column
                            key={section.key}
                            className={`nav-item ${finishedSections.includes(section.key) ? 'finished' : activeSection === section.key ? 'active' : 'inactive'}`}
                            data-target={section.key}
                            onClick={() => handleItemClick(section.key)}
                        >
                            <div className="nav-border"></div>
                            <div className="heading">{section.name}</div>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default ProgressSection;
