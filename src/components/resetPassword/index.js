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
    password: {
      value: "",
      error: false,
      errorMessage: "",
    },
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    if (user.password.value === "") {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: t("resetPassword.emptyPassword"),
        },
      });
      return;
    }
    if (user.confirmPassword.value === "") {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: t("resetPassword.emptyPassword"),
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setError({
        status: true,
        message: t("resetPassword.passwordMatch"),
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post(
        `/users/resetPassword/${router.query.token}`,
        {
          password: user.password.value,
        }
      );

      if (result.data.success) {
        router.push("/login");
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
          width: { lg: "40%", md: "50%", sm: "70%", xs: "90%" },
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
            {t("resetPassword.heading")}
          </Typography>

          {/* password */}
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
              <LockOutlinedIcon sx={{ margin: "6px" }} />
              <CustomTextField
                type='password'
                placeholder={t("resetPassword.newPasswordPlaceholder")}
                value={user.password.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Box>
            {user.password.error && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: "12px",
                  color: (theme) => theme.palette.common.white,
                }}
              >
                {user.password.errorMessage}
              </Typography>
            )}
          </>
          {/* confirm password */}
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
              <LockOutlinedIcon sx={{ margin: "6px" }} />
              <CustomTextField
                type='password'
                placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                value={user.confirmPassword.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    confirmPassword: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Box>
            {user.confirmPassword.error && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: "12px",
                  color: (theme) => theme.palette.common.white,
                }}
              >
                {user.confirmPassword.errorMessage}
              </Typography>
            )}
          </>
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
              {t("resetPassword.button")}
            </Button>
          </Box>
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
