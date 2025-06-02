"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/navBar.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import db from "@/lib/firestore";
import { usePathname } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import Breadcrumb from "./Breadcrumb";

export default function NavBar() {

  // get current route for some style stuff
  const pathname = usePathname()
  const [pageLoading, setPageLoading] = useState(true)

  // user stuff
	const { user, isLoading } = useUser();
	const userLoggedIn = !isLoading && user;

  // profile menu dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // when the user logs in we add a new user to the database, if the new user alreadt in there
  // we dont do anythign
  useEffect(() => {
    const addNewUser = async () => {
      if (!user?.email) return;
        setPageLoading(true)

      try {
        const userRef = doc(db, "users", user.email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("User already exists in Firestore.");
          return;
        }

        // User does not exist — add to Firestore
        await setDoc(userRef, {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          createdAt: new Date()
        });

        console.log("New user added to Firestore.");
      } catch (error) {
        console.error("Error checking/adding user:", error);
      } finally {
        setPageLoading(false)
      }
    };

    if (userLoggedIn) {
      addNewUser();
    }
  }, [userLoggedIn, user]);

  return (
    <>
      {pathname === "/"
        ?
          <div className={styles.banner}>
            <div className={styles.bannerText1}>Free Trial Lesson</div>
            <div className={styles.bannerText2}>Limited Time Offer!</div>
          </div>
        : <></>
      }

      <AppBar
          position="absolute"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            {pathname === "/"
              ? <></>
              : <div style={{position: "relative", bottom: "-10px", right: "-10px"}}><Breadcrumb/></div>
            }
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {!userLoggedIn ? (

              <div className={styles.loginButton} style={{visibility: pageLoading && isLoading ? "hidden" : "visible"}}>
                <a href="/auth/login">Login</a>
              </div>
            ) : (
              <>
                <Tooltip title="Profile">
                  <Image
                    onClick={handleClick}
                    src={user.picture!}
                    alt="User profile picture"
                    width={40}
                    height={40}
                    className={styles.profileImage}
                  />
                </Tooltip>
                  <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Link href={"/profile"}>
                  <MenuItem onClick={handleClose}>
                    <AccountCircleIcon sx={{fontSize: "30px", color: "#056B60", opacity: "0.8"}}/> &nbsp;&nbsp;&nbsp;<span style={{fontFamily: "Montserrat", color: 'black', letterSpacing: '0.5px', opacity: 0.8}}>Profile&nbsp;&nbsp;</span>
                  </MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>
                    <SchoolIcon  sx={{fontSize: "30px", color: "#056B60", opacity: "0.8"}}/>&nbsp;&nbsp;&nbsp; <span style={{fontFamily: "Montserrat", color: 'black', letterSpacing: '0.5px', opacity: 0.8}}>Enrolled Classes&nbsp;&nbsp;</span>
                  </MenuItem>
                  <Divider />
                  <a href="/auth/logout">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LogoutIcon sx={{fontSize: "20px", color: "#056B60", opacity: "0.8"}} />
                      </ListItemIcon>
                      <span style={{fontFamily: "Montserrat", color: 'black', letterSpacing: '0.5px', opacity: 0.8}}>Logout</span>
                    </MenuItem>
                  </a>
                </Menu>
              </>
            )}
          </Toolbar>
      </AppBar>
    </>
  );
}
