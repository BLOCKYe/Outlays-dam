/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:48
*/

import React, {useEffect, useRef, useState} from 'react';
import {IOutlayData} from "../redux/OutlaysInterfaces";
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
import moment from "moment/moment";
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import {Divider, Tooltip} from "@chakra-ui/react";
import CategoryColors from "../../categories/utils/CategoryColors";

interface OutlayItemProps {
    data: IOutlayData
}

const OutlayItem: React.FC<OutlayItemProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <div onClick={onOpen} className={'py-3 transition-all hover:text-w'}>
                <div className={'grid place-items-center item-cols cursor-pointer'}>

                    <div className={'grid gap-1 grid-cols-2 justify-self-start'}>
                        {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                            <div key={category.id}>
                                <Tooltip label={category.name}>
                                    <div className={'w-[10px] rounded-lg h-[10px] ' + CategoryColors.ColorBuilder(category?.color, 'default', 'bg')}/>
                                </Tooltip>
                            </div>
                        )}

                        {/* <--- Display default ---> */}
                        {props.data.categories.length === 0 && (
                            <div className={'w-[10px] rounded-lg h-[10px] text-d-lighter'}/>
                        )}
                    </div>

                    <div className={'justify-self-start text-sm'}>
                        {props.data.title}
                    </div>


                    <div className={'justify-self-end text-sm text-w'}>
                        -{props.data.value} <span className={'text-xs text-w-darker font-normal'}>PLN</span>
                    </div>
                </div>
            </div>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className={'bg-d'}>{props.data.title}</ModalHeader>
                    <ModalCloseButton/>

                    {/* <--- Form ---> */}
                    <ModalBody className={'bg-d'}>
                        <div className={'text-w-dark'}>
                            {moment(props.data.createdAt).format('DD MMMM YYYY, HH:mm')}
                        </div>

                        <div className={'text-w-darker mt-3'}>
                            {props.data.description}
                        </div>

                        <div className={'mt-5 text-sm'}>
                            Kategorie:
                        </div>

                        <div className={'text-w-dark mt-1'}>

                            {props.data.categories.length === 0 && (
                                <div className={'text-xs text-pink-600'}>
                                    Brak dodanych kategorii.
                                </div>
                            )}

                            {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                                <div key={category.id} className={'flex items-center gap-3 mt-3'}>
                                    <div className={'w-[12px] rounded h-[12px] ' + CategoryColors.ColorBuilder(category.color, 'default', 'bg')}/>
                                    <div className={'text-sm font-bold'}>
                                        {category.name}
                                    </div>

                                </div>
                            )}
                        </div>

                        <ModalFooter className={'flex gap-3'}>
                            <Button variant={'OUTLINED'} text={'Zamknij'} onClick={onClose}/>

                        </ModalFooter>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
};

export default OutlayItem;
