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
import {ICategoryRequest} from "../../categories/redux/CategoriesInterfaces";
import {BiCategory} from "react-icons/bi";
import {useFormik} from "formik";
import {setLoading} from "../../../common/redux/UISlice";
import {categorySchema, initialValues} from "../utils/CategoryFormik";
import {useDispatch} from "react-redux";
import {useToast} from "@chakra-ui/react";
import {createCategory, fetchCategories} from "../redux/CategoriesRepository";
import CategoryColors, {IColorItemData} from "../utils/CategoryColors";
import ColorItem from "./ColorItem";
import CategoryModal from "./CategoryModal";

interface IAddCategoryButtonProps {
    text: string
}

const AddCategoryButton: React.FC<IAddCategoryButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch: any = useDispatch()
    const toast = useToast()


    /**
     * This function is used to
     * create new category
     * @param values
     */

    const submitForm = async (values: ICategoryRequest) => {
        try {
            await dispatch(setLoading(true))

            const reqData: ICategoryRequest = {
                name: values.name,
                color: values.color
            }

            await dispatch(createCategory(reqData))
            await dispatch(fetchCategories())

            toast({
                title: 'Dodano nową kategorię',
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
                className={'flex justify-center w-full md:w-auto px-5 py-3 items-center gap-3 border-[1px] border-d-lighter rounded-md bg-d text-md transition-all hover:bg-d-light'}>
                <div>
                    <BiCategory/>
                </div>

                <div>
                    {props.text}
                </div>
            </button>

            <CategoryModal isOpen={isOpen} onClose={onClose} submitForm={submitForm}/>
        </>
    );
};

export default AddCategoryButton;
