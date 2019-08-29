import * as React from 'react';
import { Container, Grid, Tab, Tabs } from '@material-ui/core';
import MainApp from '../components/MainApp/MainApp';
import CsvKeyGenContainer from './CsvKeyGenContainer';
import LiveKeyGenContainer from './LiveKeyGenContainer';

type Props = {};

const AppContainer: React.FunctionComponent<Props> = ({}) => {
    const [tabIndex, setTab] = React.useState(0);

    return (
        <MainApp
            tabIndex={tabIndex}
            handleTab={setTab}
            tabs={[
                { label: 'CSV Import', panel: <CsvKeyGenContainer /> },
                { label: 'Type Input', panel: <LiveKeyGenContainer /> }
            ]}
        />
    );
};

export default AppContainer;
