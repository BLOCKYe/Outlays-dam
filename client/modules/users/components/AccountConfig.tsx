import React from "react";
import Item from "../../../common/components/dashboard/Item";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../redux/userSlice";
import Select from "../../../common/components/inputs/Select";
import type { FormikValues } from "formik";
import { useFormik } from "formik";
import type { IBottomBarParam } from "../../../common/components/menu/BottomBar";
import { sectionsParams } from "../../../common/components/menu/BottomBar";
import type {
  IUpdateConfigRequest,
  IUpdateUserRequest,
} from "../redux/UserRepository";
import {
  fetchUserProfile,
  updateConfig,
  updateProfileDetails,
} from "../redux/UserRepository";
import { setLoading } from "../../../common/redux/UISlice";
import type { AppDispatch } from "../../../common/redux/store";
import Button from "../../../common/components/buttons/Button";

const AccountConfig: React.FC = () => {
  const currentUser = useSelector(selectUserProfile);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      defaultSection: currentUser?.config?.defaultSection ?? "",
    },
    onSubmit: (values) => handleSubmitForm(values),
  });

  /**
   * This function is used to
   * update user config
   */
  const handleSubmitForm = async (formValues: FormikValues) => {
    const values: IUpdateConfigRequest = {
      defaultSection: formValues.defaultSection,
    };

    dispatch(setLoading(true));
    await dispatch(updateConfig(values));
    await dispatch(fetchUserProfile());
    dispatch(setLoading(false));
  };

  return (
    <Item className={"mt-3 cursor-default py-5 hover:bg-d"}>
      <form onSubmit={formik.handleSubmit}>
        {/* <--- Account name ---> */}
        <div
          className={"grid max-w-xl items-center gap-3 text-sm md:grid-cols-2"}
        >
          <div>
            <p className={"font-bold"}>Podstawowy widok</p>
            <p className={"text-xs"}>Ekran widoczny po zalogowaniu</p>
          </div>
          <span className={"text-md font-bold text-w"}>
            <Select
              onChange={(e) => {
                formik.setFieldValue("defaultSection", e.target.value);
              }}
              value={formik.values.defaultSection}
              options={sectionsParams.map((section: IBottomBarParam) => {
                return { name: section.name ?? "", id: section.id ?? "" };
              })}
            />
          </span>
        </div>

        <div className={"mt-5 flex justify-end"}>
          <Button
            type={"submit"}
            variant={"CONTAINED"}
            text={"Zapisz"}
            disabled={!formik.dirty}
          />
        </div>
      </form>
    </Item>
  );
};

export default AccountConfig;
