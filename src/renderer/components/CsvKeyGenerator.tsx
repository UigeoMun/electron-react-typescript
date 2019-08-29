import * as React from 'react';

import * as R from 'ramda';
import { Container, Button, ButtonGroup } from '@material-ui/core';
import CsvTable from './CsvTable';

type Props = {
    onClickOpen(): void;
    onClickExport(): void;
    csvDatas: { catNum: string; lotNum: string; expiryDate: string; key: string }[];
};

const isLengthNot0 = (list: any[]) => R.gt(R.length(list), 0);
const isLength0 = (list: any[]) => R.equals(R.length(list), 0);

const CsvKeyGenerator: React.SFC<Props> = ({ onClickOpen, onClickExport, csvDatas }) => {
    return (
        <Container>
            <h1> CSV Import KeyGenerator </h1>
            <ButtonGroup variant="contained" size="small" style={{ marginBottom: '20px' }}>
                <Button variant="outlined" onClick={onClickOpen}>
                    {' '}
                    Open{' '}
                </Button>
                <Button onClick={onClickExport} disabled={isLength0(csvDatas)} variant="outlined">
                    {' '}
                    Export{' '}
                </Button>
            </ButtonGroup>
            {isLengthNot0(csvDatas) && <CsvTable csvDatas={csvDatas} />}
        </Container>
    );
};

export default CsvKeyGenerator;
