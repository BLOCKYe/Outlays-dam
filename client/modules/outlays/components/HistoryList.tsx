/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:25
*/

import React from 'react';
import {IoMdSearch} from "react-icons/io";
import {useSelector} from "react-redux";
import {selectOutlays} from "../redux/outlaysSlice";
import {IOutlayData} from "../redux/OutlaysInterfaces";
import OutlayItem from "./OutlayItem";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const HistoryList: React.FC = () => {

    const outlays = useSelector(selectOutlays)

    return (
        <div>

            {/* <--- Header ---> */}
            <div className={'flex items-center justify-between gap-3'}>
                <div className={'text-lg font-bold'}>
                    Historia operacji
                </div>
                <div>
                    <IoMdSearch
                        className={'box-content p-2 transition-all cursor-pointer rounded-full hover:bg-w-darker text-d text-xl'} />
                </div>
            </div>

            {/* <--- Display history ---> */}
            <div className={'grid gap-3 mt-3'}>
                {[].slice.call(outlays).map((outlay: IOutlayData) =>
                    <OutlayItem data={outlay} key={outlay.id} />
                )}
            </div>
        </div>
    );
};

export default HistoryList;
