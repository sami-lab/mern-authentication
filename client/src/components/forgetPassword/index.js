import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useTranslation } from "react-i18next";

import { GlobalContext } from "../../context/GlobalContext";
import CustomTextField from "../../reusable/customTextfield";
import Logo from "../../reusable/logo";
import axios from "../../utils/axios";
export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [user, setUser] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });
  const [foretPasswordSuccess, setForgetPasswordSuccess] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    setForgetPasswordSuccess(false);
    if (user.email.value === "") {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: "Email cannot be empty",
        },
      });
      return;
    }
    if (
      !/(?:[a-z0-9!#$%&'*/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        user.email.value
      )
    ) {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: "Invalid Email",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/users/forgetpassword", {
        email: user.email.value,
      });

      if (result.data.success) {
        setForgetPasswordSuccess(true);
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      sx={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Grid
        item
        sx={{
          flex: 1,
          width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" },
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Grid item sx={{ mt: "50px" }}>
          <Logo />
        </Grid>
        {/* form */}
        <Grid
          item
          sx={{
            width: { md: "55%", sm: "60%", xs: "100%" },
            flex: 1,
            mt: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: (theme) => theme.palette.common.white,
          }}
        >
          <Typography
            variant='subtitle1'
            align='center'
            sx={{ fontWeight: "bold" }}
          >
            {t("forgetPassword.heading")}
          </Typography>
          {/* email */}
          <>
            <Box
              display='flex'
              alignItems='center'
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                padding: "4px",
                margin: "8px 0px",
              }}
            >
              <EmailOutlinedIcon sx={{ margin: "6px" }} />
              <CustomTextField
                type='email'
                placeholder={t("forgetPassword.emailPlaceholder")}
                value={user.email.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Box>
            {user.email.error && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: "12px",
                  color: (theme) => theme.palette.common.white,
                }}
              >
                {user.email.errorMessage}
              </Typography>
            )}
          </>
          {foretPasswordSuccess && (
            <Grid item style={{ marginTop: "1em", width: "100%" }}>
              <Alert severity='success'>{t("forgetPassword.success")}</Alert>
            </Grid>
          )}
          {error.status && (
            <Grid item style={{ marginTop: "1em", width: "100%" }}>
              <Alert severity='warning'>{error.message}</Alert>
            </Grid>
          )}

          {/* submit */}
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{ mt: "20px" }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: (theme) => theme.palette.common.red,
                color: (theme) => theme.palette.common.white,
                p: "6px 36px",
                borderRadius: 0,
                "&.Mui-disabled": {
                  backgroundColor: (theme) => theme.palette.common.red,
                  color: (theme) => theme.palette.common.white,
                },
              }}
              startIcon={
                loading && (
                  <CircularProgress
                    size='1rem'
                    sx={{
                      color: (theme) => theme.palette.common.white,
                    }}
                  />
                )
              }
              disabled={loading}
              onClick={SubmitHandler}
            >
              {t("forgetPassword.send")}
            </Button>
          </Box>
        </Grid>

        {/* login */}
        <Grid item sx={{ mt: "40px", mb: "60px" }}>
          <Link href='/signup' style={{ textDecoration: "none" }}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: (theme) => theme.palette.common.darkGrey,
                p: "6px 36px",
                borderRadius: 0,
                color: "#aeaeae",
              }}
            >
              {t("forgetPassword.login")}
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          display: "flex",

          "@media (max-width: 767px)": {
            bottom: "15px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
          },
        }}
      >
        <Link href='/terms'>
          <Typography
            variant='body2'
            sx={{
              textDecoration: "underline",
              color: (theme) => theme.palette.common.white,
            }}
          >
            {t("common.terms")}
          </Typography>
        </Link>
        <Link href='/privacy'>
          <Typography
            variant='body2'
            sx={{
              textDecoration: "underline",
              color: (theme) => theme.palette.common.white,
              ml: "12px",
            }}
          >
            {t("common.privacy")}
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
}
