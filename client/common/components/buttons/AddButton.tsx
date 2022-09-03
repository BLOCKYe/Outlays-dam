/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
*/

import React, {useState} from 'react';
import {HiPlusCircle} from "react-icons/hi";
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
import Button from "./Button";
import Input from "../inputs/Input";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {useFormik} from "formik";
import {IOutlayRequest} from "../../../modules/outlays/redux/OutlaysInterfaces";
import {login} from "../../../modules/users/redux/UserRepository";
import {getCookie, setCookie} from "cookies-next";
import {useDispatch} from "react-redux";
import {createOutlay, fetchOutlays} from "../../../modules/outlays/redux/OutlaysRepository";
import {useToast} from "@chakra-ui/react";
import Textarea from "../inputs/Textarea";

interface IAddButtonProps {
    text: string
}

const AddButton: React.FC<IAddButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useDispatch()
    const toast = useToast()

    const initialValues: IOutlayRequest = {
        date: date,
        title: '',
        description: '',
        value: 0,
        categories: []
    }

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: initialValues,
        onSubmit: values => submitForm(values).then()
    })


    /**
     * This function is used to
     * create new outlay
     * @param values
     */

    const submitForm = async (values: IOutlayRequest) => {
        try {
            const reqData: IOutlayRequest = {
                title: values.title,
                description: values.description,
                value: values.value,
                date: date,
                categories: []
            }

            await dispatch(createOutlay(reqData))
            const token = getCookie('token');
            await dispatch(fetchOutlays(token))

            toast({
                title: 'Dodano nowy wydatek',
                status: 'success'
            })

        } catch (e: any) {
            toast({
                title: e?.message,
                status: 'error'
            })
        }

        onClose()
    }

    return (
        <>
            <button onClick={onOpen}
                className={'flex justify-center w-full px-5 py-2 items-center gap-3 rounded bg-w-dark font-bold text-xl transition-all hover:bg-w-darker'}>
                <div>
                    <HiPlusCircle />
                </div>
                <div>
                    {props.text}
                </div>
            </button>

            {/* <--- Display modal ---> */}
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Dodaj nowy wydatek</ModalHeader>
                    <ModalCloseButton />

                    {/* <--- Form ---> */}
                    <ModalBody>
                        <div className={'text-d-light'}>
                            Aby utworzyć nowy dodatek wypełnij formularz. Wprowadź tytuł, kwotę oraz datę.
                        </div>

                        <form className={'grid gap-3 mt-3'} onSubmit={formik.handleSubmit}>
                            <Input onChange={formik.handleChange} value={formik.values.title} name={'title'}
                                type={'text'} label={'Tytuł wydatku'} placeholder={'Tytuł wydatku'} />
                            {/*<Input onChange={formik.handleChange} value={formik.values.description} name={'description'}*/}
                            {/*    type={'text'} label={'Opis'} placeholder={'Opis'} />*/}

                            <Textarea onChange={formik.handleChange} value={formik.values.description}
                                name={'description'} label={'Opis'} placeholder={'Opis'} />

                            <Input onChange={formik.handleChange} value={formik.values.value} name={'value'}
                                type={'number'} label={'Kwota w PLN'} placeholder={'Kwota w PLN'} />
                            <div className={'grid gap-1'}>
                                <div className={'text-xs text-d-light'}>
                                    Wybierz datę
                                </div>
                                <SingleDatepicker
                                    propsConfigs={{inputProps: {className: 'unset !box-border !px-5 !py-2 !border-solid !rounded !border-2 !border-w-darker !outline-w-darker !focus:outline-d-light !bg-w hover:!bg-w-dark !transition-all'}}}
                                    name="date-input" date={date} onDateChange={setDate}
                                />
                            </div>

                            <ModalFooter className={'flex gap-3'}>
                                <Button variant={'OUTLINED'} text={'Anuluj'} onClick={onClose} />
                                <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'} />
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};

export default AddButton;
