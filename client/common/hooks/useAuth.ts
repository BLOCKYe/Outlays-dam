import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setToken } from "../../modules/users/redux/userSlice";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import Paths from "../router/paths";
import { fetchUserProfile } from "../../modules/users/redux/UserRepository";

function useAuth() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(
    !!store.getState().user.token ?? false
  );

  useEffect(() => {
    const init = async () => {
      // check token in local storage
      const token = localStorage.getItem("token");
      if (!token) {
        await dispatch(setToken(null));
        setIsProcessing(false);
        localStorage.clear();
        if (router.pathname !== Paths.LOGIN) {
          await router.push(Paths.LOGIN);
        }
        return;
      }

      await dispatch(setToken(token));

      // check if the token has expired
      const userProfileResponse = await dispatch(fetchUserProfile()).unwrap();
      if (userProfileResponse.status !== 200) {
        await dispatch(setToken(null));
        setIsProcessing(false);
        localStorage.clear();
        if (router.pathname !== Paths.LOGIN) {
          await router.push(Paths.LOGIN);
        }
      }

      setIsAuth(true);
      setIsProcessing(false);
    };

    init().then();
  }, [dispatch, router]);

  return { isAuth, isProcessing };
}

export default useAuth;
