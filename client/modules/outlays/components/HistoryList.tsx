/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:25
*/

import React, {useEffect, useMemo, useRef, useState} from 'react';
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


    /**
     * Used to filter by keyword
     */

    const filteredOutlays = useMemo(() =>
            (outlays || []).filter((outlay: IOutlayData) => {
                return outlay.title?.toLowerCase().includes(formik.values.keyword.toLowerCase()) ||
                    outlay.description?.toLowerCase().includes(formik.values.keyword.toLowerCase()) ||
                   String(outlay.value).toLowerCase().includes(formik.values.keyword.toLowerCase())
            })
        , [formik.values.keyword, outlays])


    useEffect(() => {
        if (!displaySearch) {
            formik.setFieldValue('keyword', '')
        }
    }, [displaySearch])

    return (
        <div className={'bg-d p-5 border-[1px] border-d-lighter mb-20'}>
            {/* <--- Header ---> */}
            <div className={'flex items-center justify-between gap-3'} ref={parent}>
                {/* <--- Display history list text ---> */}
                {!displaySearch && (
                    <div className={'text-lg font-bold flex gap-2 items-center'}>
                        <IoList/> Historia operacji
                    </div>
                )}

                {/* <--- Display input after click search icon ---> */}
                {displaySearch && (
                    <form onSubmit={formik.handleSubmit} className={'w-full'}>
                        <Input onChange={formik.handleChange} name={'keyword'} value={formik.values.keyword}
                            type={'search'} placeholder={'Wyszukaj po tytule, opisie lub wartości...'}/>
                    </form>
                )}

                <div>
                    {displaySearch && <IoClose onClick={() => setDisplaySearch(!displaySearch)}
                        className={'box-content p-2 transition-all cursor-pointer rounded-full hover:bg-d-light text-w-dark text-xl'}/>}

                    {!displaySearch && (
                        <IoMdSearch onClick={() => setDisplaySearch(!displaySearch)}
                            className={'box-content p-2 transition-all cursor-pointer rounded-full hover:bg-d-light text-w-dark text-xl'}/>
                    )}
                </div>
            </div>

            {/* <--- Display history ---> */}
            <div className={'grid mt-3 divide-y divide-d-lighter'}>
                {[].slice.call(filteredOutlays).map((outlay: IOutlayData) =>
                    <OutlayItem data={outlay} key={outlay.id}/>
                )}
            </div>
        </div>
    );
};

export default HistoryList;
