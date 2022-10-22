/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 03.09.2022
 * Time: 20:53
*/

import React, {useEffect, useRef} from 'react';

interface ITextareaProps {
    placeholder?: string
    value?: string
    name?: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string
    err?: string
}

const Textarea: React.FC<ITextareaProps> = (props) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef !== null && textareaRef.current !== null) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [props.value]);

    return (
        <div className={'grid gap-1 w-full'}>
            {/* <--- Display label ---> */}
            {props.label && (
                <div className={'text-sm text-w-darker'}>
                    {props.label}
                </div>
            )}

            {/* <--- Input core ---> */}
            <textarea ref={textareaRef}
                className={'px-5 py-2 text-sm rounded bg-d border-[1px] border-d-light text-w-dark focus:border-d-lighter active:outline-none focus:outline-none hover:bg-d-light resize-none overflow-hidden'}
                value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} />

            {/* <--- Display error ---> */}
            {props.err && (
                <div className={'text-sm text-pink-600'}>
                    {props.err}
                </div>
            )}
        </div>
    );
};

export default Textarea;
