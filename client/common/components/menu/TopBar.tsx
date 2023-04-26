/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 27/08/2022
 * Time: 15:35
 */

import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../modules/users/redux/userSlice";
import { Progress, Tooltip } from "@chakra-ui/react";
import { selectLoading } from "../../redux/UISlice";
import { AiOutlineLogout } from "react-icons/ai";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Paths from "../../router/paths";

const TopBar: React.FC = () => {
  // current logged-in user
  const user = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);
  const router = useRouter();

  /**
   *
   */

  const logout = async (): Promise<void> => {
    deleteCookie("token");
    await router.push(Paths.LOGIN);
  };

  return (
    <>
      <div
        className={
          "grid place-items-center border-b-[1px] border-b-d-lighter bg-d-light px-5 py-3"
        }
      >
        <div
          className={
            "flex w-full items-center justify-between gap-2 px-3 lg:pl-[263px]"
          }
        >
          <div className={"flex w-full flex-wrap gap-2"}>
            <div className={"pt-1 text-sm"}>Witaj</div>

            <div className={"text-xl font-bold"}>{user?.name} 👋</div>
          </div>

          <Tooltip label={"Wyloguj się"}>
            <div
              className={"cursor-pointer rounded-full p-2 hover:bg-d-lighter"}
              onClick={() => logout()}
            >
              <AiOutlineLogout />
            </div>
          </Tooltip>
        </div>
      </div>
      <Progress
        colorScheme="blue"
        className={`max-h-[3px] w-full !bg-d ${
          loading ? "opacity-100" : "opacity-0"
        }`}
        size="xs"
        isIndeterminate
      />
    </>
  );
};

export default TopBar;
