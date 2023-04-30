import React from "react";
import moment from "moment/moment";
import { defaultDateTimeFormat } from "../../../../common/dateTime/dateTimeFormats";
import Item from "../../../common/components/dashboard/Item";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../redux/userSlice";
import Input from "../../../common/components/inputs/Input";
import type { AppDispatch } from "../../../common/redux/store";
import type { IUpdateUserRequest } from "../redux/UserRepository";
import {
  fetchUserProfile,
  updateProfileDetails,
} from "../redux/UserRepository";
import { setLoading } from "../../../common/redux/UISlice";
import Button from "../../../common/components/buttons/Button";
import type { FormikValues } from "formik";
import { useFormik } from "formik";

const AccountDetails: React.FC = (props) => {
  const currentUser = useSelector(selectUserProfile);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name ?? "",
    },
    onSubmit: (values) => handleSubmitForm(values),
  });

  /**
   * This function is used to
   * update user details
   */
  const handleSubmitForm = async (formValues: FormikValues) => {
    const values: IUpdateUserRequest = {
      name: formValues.name,
    };

    dispatch(setLoading(true));
    await dispatch(updateProfileDetails(values));
    await dispatch(fetchUserProfile());
    dispatch(setLoading(false));
  };

  return (
    <Item className={"mt-3 cursor-default py-5 hover:bg-d"}>
      <form onSubmit={formik.handleSubmit}>
        {/* <--- Account name ---> */}
        <div
          className={"grid max-w-xl items-center gap-1 text-sm md:grid-cols-2"}
        >
          <span>Nazwa użytkownika</span>
          <span className={"text-md mt-1 font-bold text-w md:mt-0"}>
            <Input
              name={"name"}
              value={formik.values.name ?? ""}
              onChange={formik.handleChange}
            />
          </span>
        </div>

        {/* <--- Account email ---> */}
        <div
          className={
            "mt-3 grid max-w-xl items-center gap-1 text-sm md:grid-cols-2"
          }
        >
          <span>Adres email</span>
          <span className={"text-md mt-1 font-bold text-w md:mt-0"}>
            <Input
              value={currentUser?.email}
              onChange={() => {
                console.log();
              }}
              disabled={true}
            />
          </span>
        </div>

        {/* <--- Created account date ---> */}
        <div
          className={
            "mt-3 grid max-w-xl items-center gap-1 text-sm md:grid-cols-2"
          }
        >
          <span>Konto utworzono</span>
          <span className={"text-md mt-1 font-bold text-w md:mt-0"}>
            <Input
              value={moment(currentUser?.createdAt).format(
                defaultDateTimeFormat
              )}
              onChange={() => {
                console.log();
              }}
              disabled={true}
            />
          </span>
        </div>

        <div className={"mt-5 flex justify-end"}>
          <Button
            disabled={!formik.dirty}
            type={"submit"}
            variant={"CONTAINED"}
            text={"Zapisz"}
          />
        </div>
      </form>
    </Item>
  );
};

export default AccountDetails;
