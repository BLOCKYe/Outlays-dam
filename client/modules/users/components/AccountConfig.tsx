import React from "react";
import Item from "../../../common/components/dashboard/Item";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/userSlice";
import Select from "../../../common/components/inputs/Select";
import { useFormik } from "formik";

const AccountConfig: React.FC = () => {
  const currentUser = useSelector(selectUserProfile);

  const formik = useFormik({
    initialValues: {
      defaultSection: "OPERATIONS",
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
            options={[
              { id: "OPERATIONS", name: "Operacje" },
              { id: "CATEGORIES", name: "Kategorie" },
              { id: "ANALYTICS", name: "Statystyki" },
              { id: "GOALS", name: "Cele" },
              { id: "SETTINGS", name: "Ustawienia" },
            ]}
          />
        </span>
      </div>
    </Item>
  );
};

export default AccountConfig;
