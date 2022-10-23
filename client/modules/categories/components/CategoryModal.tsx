/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 11:54
*/

import React, {useState} from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import Input from "../../../common/components/inputs/Input";
import CategoryColors, {IColorItemData} from "../utils/CategoryColors";
import ColorItem from "./ColorItem";
import Button from "../../../common/components/buttons/Button";
import {useDispatch} from "react-redux";
import {useToast} from "@chakra-ui/react";
import {useFormik} from "formik";
import {categorySchema, initialValues} from "../utils/CategoryFormik";
import {ICategoryData, ICategoryRequest} from "../redux/CategoriesInterfaces";
import {setLoading} from "../../../common/redux/UISlice";
import {createCategory, deleteCategory, editCategory, fetchCategories} from "../redux/CategoriesRepository";

interface ICategoryModalProps {
    isOpen: boolean,
    onClose: () => void;
    submitForm: (values: any) => void;
    data?: ICategoryData
}

const CategoryModal: React.FC<ICategoryModalProps> = (props) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const [submitRemove, setSubmitRemove] = useState<boolean>(false)

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues: {
            name: props.data?.name || '',
            color: props.data?.color || ''
        },
        validationSchema: categorySchema,
        onSubmit: (values, {resetForm}) => {
            props.submitForm(values);
            resetForm()
        }
    })


    /**
     *
     * @param id
     */

    const removeCategory = async (id?: string): Promise<void> => {
        if (!id) return

        setSubmitRemove(true)
        if (!submitRemove) return

        try {
            await dispatch(setLoading(true))

            await dispatch(deleteCategory(id))
            await dispatch(fetchCategories())

            toast({
                title: `Usunięto kategorie: ${props?.data?.name}`,
                status: 'info',
                isClosable: true
            })

            await dispatch(setLoading(false))
        } catch (e: any) {
            toast({
                title: e?.message,
                status: 'error'
            })

            await dispatch(setLoading(false))
        }
    }

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader className={'bg-d'}>{props.data?.id ? 'Edytuj kategorie' : 'Dodaj nową kategorię'}</ModalHeader>
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
                            <div className={'text-sm text-w-darker'}>
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
                            <Button variant={'OUTLINED'} text={'Anuluj'} onClick={props.onClose}/>
                            <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'} disabled={!formik.dirty}/>
                        </ModalFooter>


                        {/* <--- Delete category confirmation ---> */}
                        <>
                            {submitRemove && (
                                <div className={'text-sm text-pink-600 mt-1'}>
                                    Czy na pewno chcesz usunać kategorie?
                                </div>
                            )}

                            {props.data?.id && (
                                <Button variant={'OUTLINED'} text={submitRemove ? 'Tak, usuń!' : 'Usuń kategorie'}
                                    onClick={() => removeCategory(props.data?.id)}/>
                            )}
                        </>
                    </form>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default CategoryModal;
