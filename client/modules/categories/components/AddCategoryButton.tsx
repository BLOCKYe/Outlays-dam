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
import Textarea from "../../../common/components/inputs/Textarea";
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import {BiCategory} from "react-icons/bi";

interface IAddCategoryButtonProps {
    text: string
}

const AddCategoryButton: React.FC<IAddCategoryButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

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

                        <form className={'grid gap-5 mt-3'}>
                            <Input onChange={() => {
                            }} value={''} name={'name'}
                                err={''} type={'text'} label={'Nazwa kategorii'}
                                placeholder={'Nazwa kategorii'}/>

                            <ModalFooter className={'flex gap-3'}>
                                <Button variant={'OUTLINED'} text={'Anuluj'} onClick={onClose}/>
                                <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'}/>
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};

export default AddCategoryButton;
