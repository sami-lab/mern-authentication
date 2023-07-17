import {
  Button,
  Grid,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
export default function Dashboard({
  showSidebar,
  setShowSidebar,
  sideBarWidth,
}) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (matchesSM) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [matchesSM]);

  return (
    <SwipeableDrawer
      sx={{
        width: showSidebar ? sideBarWidth : 0,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          padding: "40px 30px",
          width: showSidebar ? sideBarWidth : 0,
          boxSizing: "border-box",
          background: "#000",
          color: "#D8D6D6",
        },
      }}
      variant={matchesSM ? "temporary" : "persistent"}
      anchor='left'
      open={showSidebar}
      onClose={() => setShowSidebar(false)}
      onOpen={() => setShowSidebar(true)}
    >
      <Grid container direction='column'>
        {/* logo */}
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid container alignItems='center' gap={"10px"}>
            <img
              src='/dev/logo.png'
              style={{ width: "30px", height: "30px" }}
            />
            <Typography variant='h5' sx={{ fontWeight: "700" }}>
              Promoge
            </Typography>
          </Grid>
        </Grid>
        {/* button */}
        <Grid
          item
          sx={{
            width: "100%",
            mt: "120px",
          }}
        >
          <Link href='/'>
            <Button
              variant='contained'
              startIcon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='none'
                  viewBox='0 0 22 22'
                >
                  <path
                    fill='#E65F2B'
                    fillRule='evenodd'
                    d='M13.034 2.035c.633-.633 1.526-.89 2.549-.89h1.833c1.023 0 1.916.257 2.549.89.633.632.889 1.526.889 2.548v1.834c0 1.022-.256 1.915-.889 2.548s-1.526.89-2.549.89h-1.833c-1.023 0-1.916-.257-2.549-.89-.632-.633-.889-1.526-.889-2.548V4.583c0-1.022.257-1.916.89-2.548zm.973.972c-.284.284-.486.766-.486 1.576v1.834c0 .81.202 1.292.486 1.576.284.284.765.486 1.576.486h1.833c.811 0 1.293-.202 1.577-.486.284-.284.486-.766.486-1.576V4.583c0-.81-.202-1.292-.486-1.576-.284-.284-.766-.486-1.577-.486h-1.833c-.81 0-1.292.202-1.576.486zM2.034 13.035c.633-.633 1.526-.89 2.549-.89h1.833c1.023 0 1.916.257 2.549.89.633.632.889 1.526.889 2.548v1.834c0 1.022-.256 1.915-.889 2.548s-1.526.89-2.549.89H4.583c-1.023 0-1.916-.257-2.549-.89-.632-.633-.888-1.526-.888-2.548v-1.834c0-1.022.256-1.916.888-2.548zm.973.972c-.284.284-.486.766-.486 1.576v1.834c0 .81.202 1.292.486 1.576.284.284.765.486 1.576.486h1.833c.811 0 1.293-.202 1.577-.486.284-.284.486-.766.486-1.576v-1.834c0-.81-.202-1.292-.486-1.576-.284-.284-.766-.486-1.577-.486H4.583c-.81 0-1.292.202-1.576.486zM5.5 2.52a2.98 2.98 0 100 5.96 2.98 2.98 0 000-5.96zM1.146 5.5a4.354 4.354 0 118.708 0 4.354 4.354 0 01-8.708 0zM16.5 13.52a2.98 2.98 0 100 5.96 2.98 2.98 0 000-5.96zm-4.354 2.98a4.354 4.354 0 118.708 0 4.354 4.354 0 01-8.708 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              }
              disableRipple
              disableFocusRipple
              disableTouchRipple
              sx={{
                color: (muiTheme) => muiTheme.palette.common.orange,
                backgroundColor: (muiTheme) => muiTheme.palette.common.white,
                textTransform: "none",
                borderRadius: "50px",
                padding: "13px 36px 13px 26px",
                fontSize: "14px",
                "&:hover": {
                  color: (muiTheme) => muiTheme.palette.common.orange,
                  backgroundColor: (muiTheme) => muiTheme.palette.common.white,
                },
              }}
            >
              Course Dashboard
            </Button>
          </Link>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
}
