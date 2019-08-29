import * as React from 'react';
import * as R from 'ramda';
import LiveKeyGenerator from '../components/LiveKeyGenerator';
import { genKey } from '../../util/keyGenerate';

type Props = {};

const LiveKeyGenContainer: React.FC<Props> = ({}) => {
    const date = new Date();
    const [inputs, setInputs] = React.useState<{
        catNum: string;
        lotNum: string;
        expiryDate: string;
    }>({
        catNum: '',
        lotNum: '',
        expiryDate: R.split('T', date.toISOString())[0]
    });

    const [productkey, setKey] = React.useState<string>('');

    const onChangeInput = (name: 'catNum' | 'lotNum' | 'expiryDate') => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputs({ ...inputs, [name]: event.target.value });
    };

    const onClickKeyGen = () => {
        const productkey = genKey(inputs);
        console.log(productkey);
        setKey(productkey);
    };

    return (
        <LiveKeyGenerator
            inputs={inputs}
            productkey={productkey}
            onClickKeyGen={onClickKeyGen}
            onChangeInput={onChangeInput}
        />
    );
};

export default LiveKeyGenContainer;
