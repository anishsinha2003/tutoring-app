"use client";
import { useState } from "react";
import styles from "@/styles/navBar.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";

export default function NavBar() {


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

  return (
   <AppBar
      position="absolute"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {!userLoggedIn ? (
          <div className={styles.loginButton}>
            <a href="/auth/login">Login</a>
          </div>
        ) : (
          <>
            <Tooltip title="Account settings">
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
                <Avatar /> Profile
              </MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>
                <Avatar /> Enrolled Classes
              </MenuItem>
              <Divider />
              <a href="/auth/logout">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </a>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
