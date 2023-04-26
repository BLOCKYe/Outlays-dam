/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import useGetBasicData from "../../../common/hooks/useGetBasicData";
import { MdHistoryEdu } from "react-icons/md";
import Item from "../../../common/components/dashboard/Item";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/userSlice";
import moment from "moment";
import { defaultDateTimeFormat } from "../../../common/dateTime/dateTimeFormats";
import AccountDetails from "../components/AccountDetails";
import AccountConfig from "../components/AccountConfig";

const SettingsView = () => {
  useGetBasicData();

  return (
    <>
      <TopBar />
      <MainWrapper>
        {/* <--- Header ---> */}
        <Item className={"cursor-default py-5 hover:bg-d"}>
          <div className={"flex items-center gap-2 text-lg font-bold"}>
            <MdHistoryEdu /> Ustawienia konta
          </div>

          <div className={"mt-3 text-sm text-w-darker"}>
            <p> Skonfiguruj swoje konto.</p>
            <p>
              ✨ W tym miejscu możesz zarządzać swoim kontem, edytować nazwę
              użytkownika oraz skonfigurować ustawienia.
            </p>
          </div>
        </Item>

        <AccountDetails />

        <AccountConfig />
      </MainWrapper>
      <BottomBar selected={"SETTINGS"} />
    </>
  );
};

export default SettingsView;
