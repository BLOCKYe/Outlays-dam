/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
*/

import React from 'react';
import {HiPlusCircle} from "react-icons/hi";

interface IAddButtonProps {
    text: string
}

const AddButton: React.FC<IAddButtonProps> = (props) => {
    return (
        <button className={'flex justify-center w-full px-5 py-2 items-center gap-3 rounded bg-w-dark font-bold text-xl transition-all hover:bg-w-darker'}>
            <div>
                <HiPlusCircle />
            </div>
            <div>
                {props.text}
            </div>
        </button>
    );
};

export default AddButton;
