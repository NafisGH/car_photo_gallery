import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearUserData, setUserData } from "app/redux/slices/userReducer";
import axios from "axios";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://testapp-server.vercel.app/token", {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          setValid(true);
          dispatch(setUserData(res.data));
        })
        .catch(() => {
          setValid(false);
          navigate("/sign-in");
          localStorage.removeItem("token");
          dispatch(clearUserData());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  return {
    isValid: valid,
    isLoading: loading,
  };
};
