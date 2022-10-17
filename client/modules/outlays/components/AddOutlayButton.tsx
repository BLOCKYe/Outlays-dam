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

interface IAddButtonProps {
    text: string
}

const AddOutlayButton: React.FC<IAddButtonProps> = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [date, setDate] = useState<Date>(new Date());
    const categories = useSelector(selectCategories)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const dispatch: any = useDispatch()
    const toast = useToast()

    // create formik instance
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: outlaySchema,
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

    const submitForm = async (values: IOutlayRequest) => {
        try {
            await dispatch(setLoading(true))
            let parsedSelectedCategories: { id: string }[] = []
            for (const category of selectedCategories) {
                parsedSelectedCategories.push({id: category})
            }

            const reqData: IOutlayRequest = {
                title: values.title,
                description: values.description,
                value: values.value,
                date: date,
                categories: parsedSelectedCategories
            }

            await dispatch(createOutlay(reqData))
            await dispatch(fetchLastSpending())
            await dispatch(fetchOutlays())
            setSelectedCategories([])

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


    /**
     * This method is used to
     * select category
     * @param id
     */

    const selectCategory = (id: string): void => {
        if (selectedCategories.includes(id)) {
            const filteredCategories = selectedCategories.filter((selectedId: string) => selectedId !== id)
            setSelectedCategories(filteredCategories)
        } else {
            setSelectedCategories([...selectedCategories, id])
        }
    }

    return (
        <>
            <button onClick={onOpen}
                className={'flex justify-center md:justify-start w-full px-5 py-3 items-center gap-3 border-[1px] border-d-lighter  bg-d text-md transition-all hover:bg-d-light'}>
                <div>
                    <FaMoneyBillWave/>
                </div>

                <div>
                    {props.text}
                </div>
            </button>

            {/* <--- Display modal ---> */}
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className={'bg-d'}>Dodaj nowy wydatek</ModalHeader>
                    <ModalCloseButton />

                    {/* <--- Form ---> */}
                    <ModalBody className={'bg-d'}>
                        <div className={'text-w-darker'}>
                            Aby utworzyć nowy dodatek wypełnij formularz. Wprowadź tytuł, kwotę oraz datę.
                        </div>

                        <form className={'grid gap-3 mt-3'} onSubmit={formik.handleSubmit}>
                            <Input onChange={formik.handleChange} value={formik.values.title} name={'title'}
                                err={formik.errors.title} type={'text'} label={'Tytuł wydatku'}
                                placeholder={'Tytuł wydatku'} />

                            <Textarea onChange={formik.handleChange} value={formik.values.description}
                                name={'description'} label={'Opis'} placeholder={'Opis'}
                                err={formik.errors.description} />

                            <Input onChange={formik.handleChange} value={formik.values.value} name={'value'}
                                type={'number'} label={'Kwota w PLN'} placeholder={'Kwota w PLN'}
                                err={formik.errors.value} />

                            <div className={'grid gap-1'}>
                                <div className={'text-xs text-w-darker'}>
                                    Wybierz datę
                                </div>
                                <SingleDatepicker
                                    propsConfigs={{inputProps: {className: 'unset !box-border !px-5 !py-2 !border-solid !rounded !border-[1px] !border-d-light !outline-w-darker !focus:outline-d-light !bg-d hover:!bg-d-light !transition-all'}}}
                                    name="date-input" date={date} onDateChange={setDate}
                                />
                            </div>

                            {/* <--- Categories ---> */}
                            <div>
                                <div className={'text-xs text-w-darker'}>
                                    Wybierz kategorie
                                </div>

                                <div className={'flex-wrap flex gap-2 items-center mt-1'}>
                                    {[].slice.call(categories).map((category: ICategoryData) => (
                                        <CategoryItem selectedCategories={selectedCategories} key={category.id}
                                            selectedCategory={() => selectCategory(category.id)} data={category} />
                                    ))}
                                </div>

                                {categories && categories.length === 0 && (
                                    <div className={'text-xs text-pink-600 mt-1'}>
                                        Nie utworzyłeś jeszcze żadnych kategorii.
                                    </div>
                                )}
                            </div>

                            <ModalFooter className={'flex gap-3'}>
                                <Button variant={'OUTLINED'} text={'Anuluj'} onClick={onClose} />
                                <Button variant={'CONTAINED'} text={'Zapisz'} type={'submit'}
                                    disabled={!formik.dirty} />
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};

export default AddOutlayButton;
