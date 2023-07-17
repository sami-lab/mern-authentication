import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Box, Button, Grid, Link, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Particles from "../../reusable/particles";
import { GlobalContext } from "../../context/GlobalContext";
import CustomTextField from "./customTextfield";
import Logo from "./logo";
export default function Login() {
  const router = useRouter();
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }

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
      <Particles />
      <Grid
        item
        sx={{
          flex: 1,
          width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" },
          zIndex: 1,
          height: "100%",
        }}
      >
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
          sx={{ height: "100%", padding: "20px", minHeight: "100vh" }}
        >
          <Grid item sx={{ mt: "50px" }}>
            <Logo />
          </Grid>
          {/* form */}
          <Grid
            item
            sx={{
              width: { lg: "50%", sm: "60%", xs: "100%" },
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
              IDENTIFY YOURSELF
            </Typography>
            {/* email */}
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
                placeholder='E-mail Address'
                onChange={() => {}}
              />
            </Box>
            {/* password */}
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
                placeholder='Password'
                onChange={() => {}}
              />
            </Box>
            {/* Forget passowrd */}
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{ marginTop: "10px" }}
            >
              <Link href='/forget-password' style={{ textDecoration: "none" }}>
                <Typography
                  variant='body1'
                  sx={{
                    color: (theme) => theme.palette.common.white,
                    "&:hover": {
                      color: (theme) => theme.palette.common.red,
                    },
                  }}
                >
                  Forgot Your Password
                </Typography>
              </Link>
            </Box>
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
                  p: "6px 36px",
                  borderRadius: 0,
                }}
              >
                Unlock
              </Button>
            </Box>
          </Grid>

          {/* sign up */}
          <Grid item sx={{ mt: "40px", mb: "60px" }}>
            <Link href='/sign-up' style={{ textDecoration: "none" }}>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: (theme) => theme.palette.common.darkGrey,
                  p: "6px 36px",
                  borderRadius: 0,
                  color: "#aeaeae",
                }}
              >
                Create a new Profile
              </Button>
            </Link>
          </Grid>
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
            Term of Use
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
            Privacy Policy
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
}
