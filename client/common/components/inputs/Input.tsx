/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19/08/2022
 * Time: 01:05
*/

import React from 'react';

interface IInputProps {
    placeholder?: string
    value?: string
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = (props) => {

    return (
        <input className={'px-5 py-2 rounded border-2 focus:outline-d-light bg-w hover:bg-w-dark transition-all'} value={props.value} onChange={props.handleChange}
            placeholder={props.placeholder} />
    );
};

export default Input;
