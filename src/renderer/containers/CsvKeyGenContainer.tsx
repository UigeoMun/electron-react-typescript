import * as React from 'react';
import * as Elect from 'electron';
import * as fs from 'fs';
import * as R from 'ramda';
import CsvKeyGenerator from '../components/CsvKeyGenerator';
import { genKey } from '../../util/keyGenerate';

export type CsvFormat = {
    catNum: string;
    lotNum: string;
    expiryDate: string;
};

type Props = {};

const CsvKeyGenContainer: React.FC<Props> = () => {
    const [csvDatas, setDate] = React.useState<
        {
            catNum: string;
            lotNum: string;
            expiryDate: string;
            key: string;
        }[]
    >([]);

    const dataPostProcess = (files: string[]) => {
        try {
            const csvContent = fs.readFileSync(files[0]).toString();
            const keyAssoc = R.map((v: CsvFormat) => R.assoc('key', genKey(v), v));
            R.pipe(
                convertToJSON,
                keyAssoc,
                setDate
            )(csvContent);
        } catch (err) {
            alert(err);
        }
    };

    const dataSaveProcess = (path: string, content: string) => {
        try {
            fs.writeFileSync(path, content, 'utf-8');
        } catch (error) {
            alert(error);
        }
    };

    const convertToJSON = R.pipe(
        R.trim,
        R.split('\n'),
        R.map(R.split(',')),
        R.map((row: string[]) => ({
            catNum: row[0],
            lotNum: row[1],
            expiryDate: row[2]
        }))
    );

    const convertToCSV = R.pipe(
        R.map(Object.values),
        R.map(R.join(',')),
        R.join('\n')
    );

    const onClickOpenButton = () => {
        Elect.remote.dialog.showOpenDialog({ properties: ['openFile'] }, dataPostProcess);
    };

    const onClickExport = (): void => {
        Elect.remote.dialog.showSaveDialog(
            {
                title: 'save',
                defaultPath: '~' + '/keys.csv'
            },
            (path: string) => {
                const content = convertToCSV(csvDatas);
                dataSaveProcess(path, content);
            }
        );
    };

    return (
        <CsvKeyGenerator
            onClickOpen={onClickOpenButton}
            onClickExport={onClickExport}
            csvDatas={csvDatas}
        />
    );
};

export default CsvKeyGenContainer;
