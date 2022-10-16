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
                <div className={'text-xs text-w-darker'}>
                    {props.label}
                </div>
            )}

            {/* <--- Input core ---> */}
            <input className={'px-5 py-2 bg-d border-[1px] border-d-light text-w-dark focus:border-d-lighter active:outline-none focus:outline-none hover:bg-d-light transition-all'}
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
