/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19/08/2022
 * Time: 00:51
*/

import React from 'react';

interface IButtonProps {
    type: ButtonVariants,
    text: string
    onClick?: () => void;
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
        const containedStyles: string = 'px-5 py-2 rounded bg-c-light text-c transition-all hover:bg-w-darker'
        const outlinedStyles: string = 'px-5 py-2 rounded border-2 border-d text-b transition-all hover:bg-w-dark'

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
        <button className={buttonVariantFactory(props.type)} onClick={() => handleOnClick()}>
            {props?.text}
        </button>
    );
};

export default Button;
