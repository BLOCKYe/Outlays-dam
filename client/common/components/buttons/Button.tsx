/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19/08/2022
 * Time: 00:51
*/

import React from 'react';
import Link from "next/link";

interface IButtonProps {
    variant: ButtonVariants,
    text: string
    onClick?: () => void;
    link?: string
    type?: 'button' | 'submit'
    disabled?: boolean
}

type ButtonVariants = 'CONTAINED' | 'OUTLINED'

const Button: React.FC<IButtonProps> = (props) => {

    /**
     * This factory is used to
     * render different styles
     * for different types
     * @param type
     */

    const buttonVariantFactory = (type: ButtonVariants): string => {
        const containedStyles: string = 'px-5 py-2 rounded border-2 border-c-light bg-c-light text-c transition-all hover:bg-w-darker disabled:opacity-50 disabled:hover:bg-c-light disabled:cursor-not-allowed'
        const outlinedStyles: string = 'px-5 py-2 rounded border-2 border-d text-b transition-all hover:bg-w-dark disabled:opacity-50 disabled:hover:bg-none disabled:cursor-not-allowed'

        switch (type) {
            case "CONTAINED": {
                return containedStyles
            }

            case "OUTLINED": {
                return outlinedStyles
            }

            default: {
                return containedStyles
            }
        }
    }


    /**
     *
     */

    const handleOnClick = () => {
        if (!props.onClick) return

        props.onClick()
    }

    return (
        <>
            {/* <--- Default ---> */}
            {!props.link && (
                <button type={props.type || 'button'} className={buttonVariantFactory(props.variant)}
                    onClick={() => handleOnClick()} disabled={props.disabled}>
                    {props?.text}
                </button>
            )}

            {/* <--- Variant with redirect method ---> */}
            {props.link && (
                <Link href={props.link}>
                    <button type={props.type || 'button'} className={buttonVariantFactory(props.variant)}
                        onClick={() => handleOnClick()} disabled={props.disabled}>
                        {props?.text}
                    </button>
                </Link>
            )}
        </>
    );
};

export default Button;
