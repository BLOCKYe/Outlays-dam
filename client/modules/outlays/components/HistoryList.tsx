/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:25
*/

import React, {useEffect, useRef, useState} from 'react';
import {IoMdSearch} from "react-icons/io";
import {useSelector} from "react-redux";
import {selectOutlays} from "../redux/outlaysSlice";
import {IOutlayData} from "../redux/OutlaysInterfaces";
import OutlayItem from "./OutlayItem";
import {IoList, IoClose} from "react-icons/io5";
import Input from "../../../common/components/inputs/Input";
import autoAnimate from "@formkit/auto-animate";
import {useFormik} from "formik";

const HistoryList: React.FC = () => {
    const outlays = useSelector(selectOutlays)
    const [displaySearch, setDisplaySearch] = useState<boolean>(false)

    // ref is used to control auto animate
    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current, {duration: 200})
    }, [parent])

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            keyword: ''
        },
        onSubmit: values => console.log(values)
    })


    return (
        <div>
            {/* <--- Header ---> */}
            <div className={'flex items-center justify-between gap-3'} ref={parent}>
                {/* <--- Display history list text ---> */}
                {!displaySearch && (
                    <div className={'text-lg font-bold flex gap-2 items-center'}>
                        <IoList /> Historia operacji
                    </div>
                )}

                {/* <--- Display input after click search icon ---> */}
                {displaySearch && (
                    <form onSubmit={formik.handleSubmit} className={'w-full'}>
                        <Input onChange={formik.handleChange} name={'keyword'} value={formik.values.keyword}
                            type={'search'} placeholder={'Wyszukaj...'} />
                    </form>
                )}

                <div>
                    {displaySearch && <IoClose onClick={() => setDisplaySearch(!displaySearch)}
                        className={'box-content p-2 transition-all cursor-pointer rounded-full hover:bg-w-darker text-d text-xl'} />}

                    {!displaySearch && (
                        <IoMdSearch onClick={() => setDisplaySearch(!displaySearch)}
                            className={'box-content p-2 transition-all cursor-pointer rounded-full hover:bg-w-darker text-d text-xl'} />
                    )}
                </div>
            </div>

            {/* <--- Display history ---> */}
            <div className={'grid mt-3 pb-20 divide-y'}>
                {[].slice.call(outlays).map((outlay: IOutlayData) =>
                    <OutlayItem data={outlay} key={outlay.id} />
                )}
            </div>
        </div>
    );
};

export default HistoryList;
