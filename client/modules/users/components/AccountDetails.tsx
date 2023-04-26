import React, { useState } from "react";
import moment from "moment/moment";
import { defaultDateTimeFormat } from "../../../common/dateTime/dateTimeFormats";
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

const AccountDetails: React.FC = (props) => {
  const currentUser = useSelector(selectUserProfile);
  const [userName, setUserName] = useState<string>(currentUser?.name ?? "");
  const dispatch: AppDispatch = useDispatch();

  /**
   * This function is used to
   * update user details
   */
  const handleUpdateUserDetails = async () => {
    const values: IUpdateUserRequest = {
      name: userName,
    };
    dispatch(setLoading(true));
    await dispatch(updateProfileDetails(values));
    await dispatch(fetchUserProfile());
    dispatch(setLoading(false));
  };

  return (
    <Item className={"mt-3 cursor-default py-5 hover:bg-d"}>
      {/* <--- Account name ---> */}
      <div
        className={
          "grid max-w-lg items-center text-sm text-w-darker md:grid-cols-2"
        }
      >
        <span>Nazwa użytkownika</span>
        <span className={"text-md mt-1 font-bold text-w md:mt-0"}>
          <Input
            value={userName ?? currentUser?.name ?? ""}
            onChange={(e) => setUserName(e.target.value)}
          />
        </span>
      </div>

      {/* <--- Account email ---> */}
      <div
        className={
          "mt-3 grid max-w-lg items-center text-sm text-w-darker md:grid-cols-2"
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
          "mt-3 grid max-w-lg items-center text-sm text-w-darker md:grid-cols-2"
        }
      >
        <span>Konto utworzono</span>
        <span className={"text-md mt-1 font-bold text-w md:mt-0"}>
          <Input
            value={moment(currentUser?.createdAt).format(defaultDateTimeFormat)}
            onChange={() => {
              console.log();
            }}
            disabled={true}
          />
        </span>
      </div>

      <div className={"mt-5 flex justify-end"}>
        <Button
          onClick={handleUpdateUserDetails}
          variant={"CONTAINED"}
          text={"Zapisz"}
        />
      </div>
    </Item>
  );
};

export default AccountDetails;
