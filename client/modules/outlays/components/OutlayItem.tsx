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

interface OutlayItemProps {
    data: IOutlayData
}

const OutlayItem: React.FC<OutlayItemProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()


    /**
     * This method is used to
     * render styles
     * for different variants
     * @param color
     */

    const categoryColorFactory = (color: string): string => {
        switch (color) {
            case 'Orange': {
                return 'bg-[#FF9F2D]'
            }

            case 'Blue': {
                return 'bg-[#168FFF]'
            }

            case 'Pink': {
                return 'bg-[#F74141]'
            }

            case 'Emerald': {
                return 'bg-[#17CB49]'
            }

            default: {
                return 'bg-d-lighter'
            }
        }
    }


    return (
        <>
            <div onClick={onOpen} className={'py-3'}>
                <div className={'grid place-items-center item-cols cursor-pointer'}>

                   <div className={'grid gap-2'}>
                       {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                           <div key={category.id} >
                               <Tooltip label={category.name}>
                                   <div className={'w-[10px] rounded-lg h-[10px] ' + categoryColorFactory(category.color)}/>
                               </Tooltip>
                           </div>
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
                            {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                                <div key={category.id} className={'flex items-center gap-3'}>
                                    <div
                                        className={'w-[12px] rounded h-[12px] ' + categoryColorFactory(category.color)}/>
                                    {category.name}
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
