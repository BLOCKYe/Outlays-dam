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

interface IAddButtonProps {
    text: string
}

const AddButton: React.FC<IAddButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [date, setDate] = useState<Date>(new Date());

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

                        <form className={'grid gap-3 mt-3'}>
                            <Input onChange={() => {
                            }} type={'text'} label={'Tytuł wydatku'} placeholder={'Tytuł wydatku'} />
                            <Input onChange={() => {
                            }} type={'text'} label={'Opis'} placeholder={'Opis'} />
                            <Input onChange={() => {
                            }} type={'number'} label={'Kwota w PLN'} placeholder={'Kwota w PLN'} />
                            <div className={'grid gap-1'}>
                                <div className={'text-xs text-d-light'}>
                                    Wybierz datę
                                </div>
                                <SingleDatepicker
                                    propsConfigs={{inputProps: {className: 'unset !box-border !px-5 !py-2 !border-solid !rounded !border-2 !border-w-darker !outline-w-darker !focus:outline-d-light !bg-w hover:!bg-w-dark !transition-all'}}}
                                    name="date-input" date={date} onDateChange={setDate}
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter className={'flex gap-3'}>
                        <Button variant={'OUTLINED'} text={'Anuluj'} onClick={onClose} />
                        <Button variant={'CONTAINED'} text={'Zapisz'} onClick={onClose} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddButton;
