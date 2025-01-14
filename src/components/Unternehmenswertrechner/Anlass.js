import React, { useEffect } from 'react';
import { Grid, Header, Divider, Form, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAnlass } from '../../redux/anlassSlice';
import { setError, setValidity } from "../../redux/reducers";
import { useNavigate } from 'react-router-dom';

const Anlass = (props) => {
    const radioOptions = [
        {
            value: 'Unternehmensverkauf',
            icon: 'dollar sign',
            label: 'Unternehmensverkauf',
        },
        {
            value: 'Unternehmenskauf',
            icon: 'shopping cart',
            label: 'Unternehmenskauf',
        },
        {
            value: 'Nachfolgeplanung',
            icon: 'users',
            label: 'Nachfolgeplanung',
        },
        {
            value: 'Aus Interesse / Akademische Nutzung',
            icon: 'graduation cap',
            label: 'Aus Interesse / Akademische Nutzung',
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isValid = useSelector(state => state.validation.isValid);
    const anlassData = useSelector((state) => state.anlass.anlassData);

    const handleRadioChange = (e, { value }) => {
        const selectedOption = radioOptions.find(option => option.value === value);
        dispatch(setAnlass({ selectedOption }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValid) {
            return;
        }

        props.onAnlassFinish();
        navigate('/result');
    };

    useEffect(() => {
        // console.log('anlassData:', anlassData);
        checkValidity();
    }, [anlassData]);

    const checkValidity = () => {
        let errors = [];

        if (!anlassData.selectedOption) {
            errors.push("Bitte wählen Sie eine Option aus.");
        }

        dispatch(setError(errors));

        const valid = errors.length === 0;
        dispatch(setValidity(valid));

        return valid;
    };

    return (
        <Grid padded className="shared-section anlass">
            <Grid.Column>
                <Header as="h2">6. Anlass für den Unternehmenswertrechner</Header>
                <Divider />
                <Form>
                    <Header as="h3">
                        Bitte wählen Sie den Anlass der Bewertung aus:
                        <span className="required-mark">*</span>
                    </Header>
                    <Form.Field className="anlass-wrapper">
                        <Grid columns={2}>
                            <Grid.Row>
                                {radioOptions.map((option) => (
                                    <Grid.Column key={option.value}>
                                        <Button
                                            fluid
                                            icon
                                            labelPosition="left"
                                            className={"option-button " + (anlassData.selectedOption.value === option.value ? "selected-option" : "")}
                                            onClick={() => handleRadioChange(null, { value: option.value })}
                                            value={option.value}
                                        >
                                            <Icon name={option.icon} />
                                            {option.label}
                                        </Button>
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>
                        <p className="required-fields-hint">
                            <span className="required">*</span>Diese Eingaben sind Pflichtfelder
                        </p>

                        <div className="button-container">
                            <Button className="click-back" onClick={props.onZuruckClick}>
                                Zurück
                            </Button>
                            <Button primary type="submit" onClick={handleSubmit}>
                                Bewertung abschließen
                            </Button>
                        </div>
                    </Form.Field>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Anlass;