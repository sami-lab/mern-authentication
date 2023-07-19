import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SideBar from "./sidebar";
import { GlobalContext } from "../../context/GlobalContext";

import axios from "../../utils/axios";
import Link from "next/link";
const CoursePaper = ({ children }) => (
  <Paper
    sx={{
      p: "18px",
      borderRadius: "14px",
      background: "rgba(255, 255, 255, 0.34)",
      boxShadow: "none",
    }}
  >
    {children}
  </Paper>
);

const Course = ({ text, url }) => (
  <Paper
    sx={{
      p: "18px",
      borderRadius: "14px",
      background: (muiTheme) => muiTheme.palette.common.orangeMedium,
      boxShadow: "none",
      minHeight: "102px",
      minWidth: "131px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
    }}
    component={Link}
    href={url}
  >
    <Typography variant='h5' sx={{ fontWeight: 500 }}>
      {text}
    </Typography>
  </Paper>
);
export default function Dashboard() {
  const sideBarWidth = "300px";
  const [showSidebar, setShowSidebar] = useState(true);

  const { user: globaluser } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
    action: "",
  });
  const [availableTopics, setAvailableTopics] = useState([]);
  const [takenTopics, setTakenTopics] = useState([]);

  const fetchCourses = async () => {
    try {
      setError({
        status: false,
        message: "",
        action: "",
      });
      setLoading(true);
      const result = await axios.get("/api/v1/user_profile", {
        headers: {
          authorization: "Bearer " + globaluser.token,
        },
      });
      if (result.data) {
        setAvailableTopics(result.data.available_topics);
        setTakenTopics(result.data.taken_topics);
      } else {
        setError({
          status: true,
          message: "Something went wrong",
          action: "submit",
        });
      }
      setLoading(false);
    } catch (err) {
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
        action: "submit",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paddingContainer = {
    paddingLeft: "30px",
    paddingRight: "30px",
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: (muiTheme) => muiTheme.palette.common.orangeLight,
      }}
    >
      {/* sidebar */}
      <Grid
        item
        style={{
          display: "flex",
          width: showSidebar ? `${sideBarWidth}` : 0,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 30,
            right: showSidebar ? "-15px" : "-20px",
          }}
        >
          <IconButton
            sx={{
              p: 0,
              background: (muiTheme) => muiTheme.palette.common.white,
              borderRadius: "50%",
              boxShadow: "2px 2px 8px 0px rgba(0, 0, 0, 0.10)",
              zIndex: 1300,
              width: "30px",
              height: "30px",
            }}
            disableRipple
            onClick={() => setShowSidebar((s) => !s)}
          >
            {showSidebar ? (
              <ChevronLeftIcon fontSize='small' />
            ) : (
              <ChevronRightIcon fontSize='small' />
            )}
          </IconButton>
        </div>
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          sideBarWidth={sideBarWidth}
        />
      </Grid>
      {/* main */}
      <Grid item sx={{ flex: 1 }}>
        <Grid container direction='column'>
          {/* heading */}
          <Grid item sx={{ ...paddingContainer, mt: "23px" }}>
            <Typography variant='h4' sx={{ fontWeight: 500 }}>
              Course Dashboard
            </Typography>
          </Grid>
          {/* divider */}
          <Grid
            item
            sx={{
              width: "100%",
              mt: "32px",
              borderTop: "1px solid rgba(0, 0, 0, 0.47)",
            }}
          />

          {error.status && error.action === "submit" ? (
            <Alert severity='error'>{error.message}</Alert>
          ) : loading ? (
            <Grid
              item
              sx={{
                ...paddingContainer,
                width: { md: "60%", xs: "90%" },
              }}
            >
              <Skeleton
                variant='rounded'
                height={60}
                sx={{
                  width: "100%",
                  mt: "46px",
                }}
              />
              <Skeleton
                variant='rounded'
                height={60}
                sx={{
                  width: "100%",
                  mt: "46px",
                }}
              />
            </Grid>
          ) : (
            <>
              {/* Available Courses */}
              <Grid
                item
                sx={{
                  ...paddingContainer,
                  width: { md: "60%", xs: "90%" },
                  mt: "46px",
                }}
              >
                <CoursePaper>
                  <Typography variant='h5' sx={{ fontWeight: 400 }}>
                    Available Courses
                  </Typography>
                  <Grid container gap='20px' sx={{ mt: "15px" }}>
                    {availableTopics.map((item, i) => (
                      <Course
                        text={item}
                        url={`/course/available/${item}`}
                        key={i}
                      />
                    ))}
                  </Grid>
                </CoursePaper>
              </Grid>

              {/* Ongoing Courses*/}
              <Grid
                item
                sx={{
                  ...paddingContainer,
                  width: { md: "60%", xs: "90%" },
                  mt: "46px",
                }}
              >
                <CoursePaper>
                  <Typography variant='h5' sx={{ fontWeight: 400 }}>
                    Ongoing Courses
                  </Typography>
                  <Grid container gap='20px' sx={{ mt: "15px" }}>
                    {takenTopics.map((item, i) => (
                      <Course
                        text={item}
                        url={`/course/progress/${item}`}
                        key={i}
                      />
                    ))}
                  </Grid>
                </CoursePaper>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
