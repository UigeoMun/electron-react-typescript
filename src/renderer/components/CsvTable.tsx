import * as React from 'react';
import * as R from 'ramda';
import { Button, Table, TableBody, TableCell, TableHead, Paper, TableRow } from '@material-ui/core';
import { CsvFormat } from '../containers/CsvKeyGenContainer';

type Props = {
    csvDatas: CsvFormat[];
};

const CsvTable: React.SFC<Props> = ({ csvDatas }) => {
    const renderHeadCell = (label: string) => (
        <TableCell key={label} align="left">
            {label}
        </TableCell>
    );

    const renderBodyRow = (csvRow: CsvFormat) => {
        return (
            <TableRow key={R.values(csvRow).join('-')}>
                {R.values(csvRow).map(v => (
                    <TableCell key={v} align="right">
                        {v}
                    </TableCell>
                ))}
            </TableRow>
        );
    };
    const renderBodyRows = R.map(renderBodyRow);

    return (
        <Paper>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {R.pipe(
                            R.keys,
                            R.map(renderHeadCell)
                        )(csvDatas[0])}
                    </TableRow>
                </TableHead>
                <TableBody>{renderBodyRows(csvDatas)}</TableBody>
            </Table>
        </Paper>
    );
};

export default CsvTable;
