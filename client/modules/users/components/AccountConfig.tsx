import React from "react";
import Item from "../../../common/components/dashboard/Item";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/userSlice";
import Select from "../../../common/components/inputs/Select";
import { useFormik } from "formik";
import type { IBottomBarParam } from "../../../common/components/menu/BottomBar";
import { sectionsParams } from "../../../common/components/menu/BottomBar";

const AccountConfig: React.FC = () => {
  const currentUser = useSelector(selectUserProfile);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      defaultSection: currentUser?.config?.defaultSection ?? "",
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <Item className={"mt-3 cursor-default py-5 hover:bg-d"}>
      {/* <--- Account name ---> */}
      <div
        className={
          "grid max-w-lg items-center text-sm text-w-darker md:grid-cols-2"
        }
      >
        <span>Podstawowy widok</span>
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
    </Item>
  );
};

export default AccountConfig;
