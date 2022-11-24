import React, { Component } from "react";
import { withRouter } from "react-router";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//CORE:
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  Typography
} from "@material-ui/core";

//ICONS:
import {
  AccountCircleOutlined,
  MoreVertOutlined as MoreIcon,
  MenuOutlined as MenuIcon
} from "@material-ui/icons";

import { logout } from "../../utils/auth";
import logo from "../../assets/logo.png";
import NestedList from "./NestedList";
import Styled from "./styles";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  handleDrawerOpen = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.signOut}>Sign out</MenuItem>
      </Menu>
    );
  };

  renderMobileMenu = () => {
    const { mobileMoreAnchorEl } = this.state;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.signOut}>
          <IconButton color="inherit">
            <AccountCircleOutlined />
          </IconButton>
          <p>Sign out</p>
        </MenuItem>
      </Menu>
    );
  };

  signOut = e => {
    if (e) e.preventDefault();
    logout();
    return this.props.history.push("/login");
  };

  render() {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = this.renderMenu();
    const renderMobileMenu = this.renderMobileMenu();
    return (
      <Styled>
        {({ classes }) => (
          <div className={classes.root}>
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open,
                [classes.appBarUnshift]: !this.state.open
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton2)}
                >
                  <MenuIcon />
                </IconButton>
                <div className={classes.grow} />
                <div className={classes.heading}>
                  <Typography variant="h3">
                    <FontAwesomeIcon icon={this.props.icon} />
                    {this.props.header}
                  </Typography>
                </div>
                <div className={classes.sectionDesktop}>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircleOutlined />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open
                })
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <img
                  className={classNames(classes.logo, {
                    [classes.hide]: !this.state.open
                  })}
                  alt="logo"
                  src={logo}
                />
              </div>
              <NestedList isCollapsed={!this.state.open} />
            </Drawer>
            {renderMenu}
            {renderMobileMenu}
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: this.state.open
              })}
            >
              {this.props.children}
            </main>
          </div>
        )}
      </Styled>
    );
  }
}

Header.propTypes = {};

export default withRouter(Header);
