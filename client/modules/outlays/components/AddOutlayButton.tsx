/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
*/

import React, {useState} from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import Button from "../../../common/components/buttons/Button";
import Input from "../../../common/components/inputs/Input";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {useFormik} from "formik";
import {IOutlayRequest} from "../redux/OutlaysInterfaces";
import {getCookie, setCookie} from "cookies-next";
import {useDispatch, useSelector} from "react-redux";
import {createOutlay, fetchOutlays} from "../redux/OutlaysRepository";
import {useToast} from "@chakra-ui/react";
import Textarea from "../../../common/components/inputs/Textarea";
import {initialValues, outlaySchema} from "../utils/OutlayFormik";
import {selectCategories} from "../../categories/redux/categoriesSlice";
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import {setLoading} from "../../../common/redux/UISlice";
import {fetchLastSpending} from "../../analytics/redux/AnalyticsRepository";
import {FaMoneyBillWave} from "react-icons/fa";
import OutlayModal from "./OutlayModal";

interface IAddButtonProps {
    text: string
}

const AddOutlayButton: React.FC<IAddButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch: any = useDispatch()
    const toast = useToast()

    /**
     * This function is used to
     * create new outlay
     * @param values
     */

    const submitForm = async (values: IOutlayRequest) => {
        try {
            await dispatch(setLoading(true))
            let parsedSelectedCategories: { id: string }[] = []

            if (values.categories) {
                for (const category of values.categories) {
                    parsedSelectedCategories.push({id: category})
                }
            }

            const reqData: IOutlayRequest = {
                title: values.title,
                description: values.description,
                value: values.value,
                date: values.date,
                categories: parsedSelectedCategories
            }

            await dispatch(createOutlay(reqData))
            await dispatch(fetchOutlays())
            await dispatch(fetchLastSpending())

            toast({
                title: 'Dodano nowy wydatek',
                status: 'success'
            })

            await dispatch(setLoading(false))

        } catch (e: any) {
            toast({
                title: e?.message,
                status: 'error'
            })

            await dispatch(setLoading(false))
        }

        onClose()
    }

    return (
        <>
            <button onClick={onOpen}
                className={'flex justify-center w-full px-5 py-3 items-center gap-3 border-[1px] border-d-lighter  bg-d text-md transition-all hover:bg-d-light'}>
                <div>
                    <FaMoneyBillWave/>
                </div>


                <div>
                    {props.text}
                </div>
            </button>

            <OutlayModal isOpen={isOpen} onClose={onClose} submitForm={submitForm}/>
        </>
    );
};

export default AddOutlayButton;
