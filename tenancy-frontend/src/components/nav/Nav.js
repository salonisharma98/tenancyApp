import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function Nav() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isDrawer, setIsDrawer] = useState(false);

  const onLoginButtonCLick = () => {
    navigate("/login");
  };
  const onsignupButtonCLick = () => {
    navigate("/signup");
  };
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={classes.root}
      onClick={() => {
        setIsDrawer(!isDrawer);
      }}
    >
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setIsDrawer(!isDrawer);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              setIsDrawer(!isDrawer);
            }}
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawer} width={200}>
        <MenuItem onClick={onLoginButtonCLick}>Login</MenuItem>
        <MenuItem onClick={onsignupButtonCLick}>Sign up</MenuItem>
        <MenuItem variant="h6" onClick={onLogout}>
          Logout
        </MenuItem>
      </Drawer>
    </div>
  );
}
