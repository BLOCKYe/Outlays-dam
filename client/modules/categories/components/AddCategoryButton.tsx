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
import {ICategoryData, ICategoryRequest} from "../../categories/redux/CategoriesInterfaces";
import {BiCategory} from "react-icons/bi";
import {useFormik} from "formik";
import {setLoading} from "../../../common/redux/UISlice";
import {categorySchema, initialValues} from "../utils/CategoryFormik";
import {useDispatch} from "react-redux";
import {useToast} from "@chakra-ui/react";
import {createCategory, fetchCategories} from "../redux/CategoriesRepository";
import CategoryColors, {IColorItemData} from "../utils/CategoryColors";
import CategoryItem from "../../outlays/components/CategoryItem";
import ColorItem from "./ColorItem";

interface IAddCategoryButtonProps {
    text: string
}

const AddCategoryButton: React.FC<IAddCategoryButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch: any = useDispatch()
    const toast = useToast()

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: categorySchema,
        onSubmit: (values, {resetForm}) => {
            submitForm(values).then();
            resetForm()
        }
    })


    /**
     * This function is used to
     * create new outlay
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
                className={'flex justify-center w-full px-5 py-3 items-center gap-3 border-[1px] border-d-lighter  bg-d text-md transition-all hover:bg-d-light'}>
                <div>
                    <BiCategory/>
                </div>

                <div>
                    {props.text}
                </div>
            </button>

            {/* <--- Display modal ---> */}
            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className={'bg-d'}>Dodaj nową kategorię</ModalHeader>
                    <ModalCloseButton/>

                    {/* <--- Form ---> */}
                    <ModalBody className={'bg-d'}>
                        <div className={'text-w-darker'}>
                            Aby utworzyć nowa kategorię wypełnij formularz. Wprowadź nazwe i wybierz kolor.
                        </div>

                        <form className={'grid gap-5 mt-3'} onSubmit={formik.handleSubmit}>
                            <Input onChange={formik.handleChange} value={formik.values.name} name={'name'}
                                err={formik.errors.name} type={'text'} label={'Nazwa kategorii'}
                                placeholder={'Nazwa kategorii'}/>

                            {/* <--- Color ---> */}
                            <div>
                                <div className={'text-xs text-w-darker'}>
                                    Wybierz kolor
                                </div>

                                <div className={'flex-wrap flex gap-2 items-center mt-2'}>
                                    {[].slice.call(CategoryColors.availableColors).map((color: IColorItemData) => (
                                        <ColorItem selectedColor={formik.values.color} key={color.name}
                                            selectColor={() => formik.setFieldValue('color', color.name)} data={color}/>
                                    ))}
                                </div>
                            </div>

                            <ModalFooter className={'flex gap-3'}>
                                <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'} disabled={!formik.dirty}/>
                                <Button variant={'OUTLINED'} text={'Anuluj'} onClick={onClose}/>
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};

export default AddCategoryButton;
