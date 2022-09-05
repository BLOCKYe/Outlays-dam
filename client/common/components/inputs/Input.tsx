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
    value?: string | number
    name?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number' | 'email' | 'password' | 'search'
    label?: string
    err?: string
}

const Input: React.FC<IInputProps> = (props) => {

    return (
        <div className={'grid gap-1 w-full'}>
            {/* <--- Display label ---> */}
            {props.label && (
                <div className={'text-xs text-d-light'}>
                    {props.label}
                </div>
            )}

            {/* <--- Input core ---> */}
            <input className={'px-5 py-2 rounded border-2 focus:outline-d-light bg-w hover:bg-w-dark transition-all'}
                value={props.value || ''} onChange={props.onChange} placeholder={props.placeholder}
                type={props.type || 'text'} name={props.name}/>

            {/* <--- Display error ---> */}
            {props.err && (
                <div className={'text-xs text-pink-600'}>
                    {props.err}
                </div>
            )}
        </div>
    );
};

export default Input;
