import * as React from 'react';
import * as R from 'ramda';
import { Container, TextField, Grid, Paper, Button } from '@material-ui/core';

const textFieldStyle: React.CSSProperties = {
    margin: '20px 20px 20px 20px'
};

type Props = {
    onChangeInput(name: 'catNum' | 'lotNum' | 'expiryDate'): any;
    inputs: { catNum: string; lotNum: string; expiryDate: string };
    onClickKeyGen(): void;
    productkey: string;
};

const LiveKeyGenerator: React.SFC<Props> = ({
    onChangeInput,
    inputs,
    productkey,
    onClickKeyGen
}) => {
    const isAble = (inputs: { catNum: string; lotNum: string; expiryDate: string }) => {
        return (
            R.equals(5, inputs.catNum.length) &&
            R.equals(7, inputs.lotNum.length) &&
            R.equals(10, inputs.expiryDate.length)
        );
    };

    return (
        <Container>
            <h1> Live Key Generator </h1>
            <Paper style={{ padding: '40px 40px 40px 40px' }}>
                <Grid container={true} direction="column">
                    <h3> Product Info </h3>
                    <TextField
                        name="catNum"
                        label="catNum"
                        type="text"
                        value={inputs.catNum}
                        onChange={onChangeInput('catNum')}
                        style={textFieldStyle}
                    />
                    <TextField
                        name="rotNum"
                        label="lotNum"
                        type="text"
                        value={inputs.lotNum}
                        onChange={onChangeInput('lotNum')}
                        style={textFieldStyle}
                    />
                    <TextField
                        name="expiryDate"
                        label="expirtDate"
                        type="date"
                        value={inputs.expiryDate}
                        onChange={onChangeInput('expiryDate')}
                        style={textFieldStyle}
                    />
                    <Button disabled={!isAble(inputs)} onClick={onClickKeyGen} variant="outlined">
                        {' '}
                        Key Generate{' '}
                    </Button>
                    <TextField variant="outlined" value={productkey} />
                </Grid>
            </Paper>
        </Container>
    );
};

export default LiveKeyGenerator;
