/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 23:27
*/

import React, {useState} from 'react';
import {IOutlayData} from "../redux/OutlaysInterfaces";
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
import Textarea from "../../../common/components/inputs/Textarea";
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import Button from "../../../common/components/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories} from "../../categories/redux/categoriesSlice";
import {useFormik} from "formik";
import {initialValues, outlaySchema} from "../utils/OutlayFormik";
import moment from "moment/moment";
import {setLoading} from "../../../common/redux/UISlice";
import {deleteCategory, fetchCategories} from "../../categories/redux/CategoriesRepository";
import {useToast} from "@chakra-ui/react";
import {deleteOutlay, fetchOutlays} from "../redux/OutlaysRepository";

interface IOutlayModalProps {
    isOpen: boolean,
    onClose: () => void;
    submitForm: (values: any) => void;
    data?: IOutlayData
    setPreview?: () => void;
}

const OutlayModal: React.FC<IOutlayModalProps> = (props) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const [submitRemove, setSubmitRemove] = useState<boolean>(false)
    const categories = useSelector(selectCategories)

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues: {
            date: props.data?.date || moment(new Date()).format("yyyy-MM-DD"),
            title: props.data?.title || '',
            description: props.data?.description || '',
            value: props.data?.value || 0,
            categories: props.data?.categories && props.data?.categories.length > 0 ? [props.data?.categories[0].id] : [] || []
        },
        validationSchema: outlaySchema,
        onSubmit: async (values, {resetForm}) => {
            await props.submitForm(values);
            await resetForm()
            props.setPreview && props.setPreview()
        }
    })


    /**
     *
     * @param id
     */

    const removeOutlay = async (id?: string): Promise<void> => {
        if (!id) return

        setSubmitRemove(true)
        if (!submitRemove) return

        try {
            await dispatch(setLoading(true))

            await dispatch(deleteOutlay(id))
            await dispatch(fetchOutlays())

            toast({
                title: `Usunięto wydatek: ${props?.data?.title}`,
                status: 'info',
                isClosable: true
            })

            // await dispatch(setLoading(false))
        } catch (e: any) {
            toast({
                title: e?.message,
                status: 'error'
            })

            await dispatch(setLoading(false))
        }
    }

    return (
        <Modal onClose={() => {
            props.onClose();
            props.setPreview && props.setPreview()
        }} isOpen={props.isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader className={'bg-d'}>{props.data?.id ? 'Edytuj wydatek' : 'Dodaj nowy wydatek'}</ModalHeader>
                <ModalCloseButton/>

                {/* <--- Form ---> */}
                <ModalBody className={'bg-d'}>
                    <div className={'text-w-darker'}>
                        Aby utworzyć nowy dodatek wypełnij formularz. Wprowadź tytuł, kwotę oraz datę.
                    </div>

                    <form className={'grid gap-5 mt-3'} onSubmit={formik.handleSubmit}>
                        <Input onChange={formik.handleChange} value={formik.values.title} name={'title'}
                            err={formik.errors.title} type={'text'} label={'Tytuł wydatku'}
                            placeholder={'Tytuł wydatku'}/>

                        <Textarea onChange={formik.handleChange} value={formik.values.description}
                            name={'description'} label={'Opis'} placeholder={'Opis'}
                            err={formik.errors.description}/>

                        <Input onChange={formik.handleChange} value={formik.values.value} name={'value'}
                            type={'number'} label={'Kwota w PLN'} placeholder={'Kwota w PLN'}
                            err={formik.errors.value}/>

                        <Input onChange={formik.handleChange} value={formik.values.date} name={'date'}
                            type={'date'} label={'Data wydatku'} placeholder={'Data wydatku'}
                            err={formik.errors.date}/>


                        {/* <--- Categories ---> */}
                        <div>
                            <div className={'text-sm text-w-darker'}>
                                Wybierz kategorie
                            </div>

                            <div className={'flex-wrap flex gap-2 items-center mt-2'}>
                                {[].slice.call(categories).map((category: ICategoryData) => (
                                    <CategoryItem selectedCategories={formik.values.categories} key={category.id}
                                        selectedCategory={() => formik.setFieldValue('categories', [category.id])}
                                        data={category}/>
                                ))}
                            </div>

                            {categories && categories.length === 0 && (
                                <div className={'text-sm text-pink-600 mt-1'}>
                                    Nie utworzyłeś jeszcze żadnych kategorii.
                                </div>
                            )}
                        </div>

                        <ModalFooter className={'flex gap-3'}>
                            <Button variant={'OUTLINED'} text={'Anuluj'} onClick={() => {
                                props.onClose();
                                props.setPreview && props.setPreview()
                            }}/>
                            <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'}
                                disabled={!formik.dirty}/>
                        </ModalFooter>


                        {/* <--- Delete outlay confirmation ---> */}
                        <>
                            {submitRemove && (
                                <div className={'text-sm text-pink-600 mt-1'}>
                                    Czy na pewno chcesz usunać ten wydatek?
                                </div>
                            )}

                            {props.data?.id && (
                                <Button variant={'OUTLINED'} text={submitRemove ? 'Tak, usuń!' : 'Usuń wydatek'}
                                    onClick={() => removeOutlay(props.data?.id)}/>
                            )}
                        </>
                    </form>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default OutlayModal;
