import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  ListItemIcon
} from "@material-ui/core";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import sidebarUrls from "../../utils/sidebarLinks";
import Styled from "./styles";

class NestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: {}
    };
  }

  showLinks = name => {
    this.setState(state => ({ links: { [name]: !state.links[name] } }));
  };

  isLinkActive = url =>
    url === "/"
      ? this.props.location.pathname === url
      : this.props.location.pathname.includes(url);

  isChildLinksActive = link => {
    let isActive = false;
    if (link.children) {
      link.children.forEach(item => {
        if (this.isLinkActive(item.url)) {
          isActive = true;
        }
      });
    }
    return isActive;
  };

  isExternal = url => url.startsWith("http");

  renderLinks = (classes, isCollapsed) => {
    const LinkAddress = props =>
      this.isExternal(props.url) || props.remount ? (
        <a
          href={props.url}
          target={props.remount ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className={classes.sidebarLink}
        >
          {props.children}
        </a>
      ) : (
        <Link to={props.url} className={classes.sidebarLink}>
          {props.children}
        </Link>
      );

    const listItem = (item, isChild) => (
      <ListItem
        button
        className={classNames({
          [classes.nested]: isChild,
          [classes.collapsedParentLink]: !isChild && isCollapsed,
          [classes.activeLink]: this.isLinkActive(item.url)
        })}
        key={item.title}
      >
        <LinkAddress
          url={item.link || item.url}
          remount={item.remount || false}
        >
          <Grid container spacing={1} direction="row" justify="center">
            <Grid item xs={2}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={classes.sidebarLinkIcon}
                />
              </ListItemIcon>
            </Grid>
            <Grid
              item
              xs={10}
              className={classNames({ [classes.hide]: isCollapsed })}
            >
              <ListItemText
                primary={item.title}
                className={classes.sidebarLinkText}
              />
            </Grid>
          </Grid>
        </LinkAddress>
      </ListItem>
    );

    return sidebarUrls.map(link => (
      <List
        component="nav"
        className={classNames(classes.sidebarList, {
          [classes.sidebarListCollapsed]: isCollapsed,
          [classes.activeLink]: this.isLinkActive(link.url)
        })}
        key={link.id}
      >
        {!link.children ? (
          listItem(link, false)
        ) : (
          <List component="div" className={classes.sidebarParentLink}>
            <ListItem
              key={link.id}
              button
              onClick={() => this.showLinks(link.id)}
            >
              <Grid container spacing={1} direction="row" justify="flex-start">
                <Grid item xs={2}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={link.icon}
                      className={classes.sidebarLinkIcon}
                    />
                  </ListItemIcon>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={classNames({ [classes.hide]: isCollapsed })}
                >
                  <ListItemText
                    primary={link.title}
                    className={classes.sidebarLinkText}
                  />
                  <ListItemIcon>
                    {this.isChildLinksActive(link) ? (
                      ""
                    ) : this.state.links[link.id] ? (
                      <ExpandLess className={classes.arrowIcon} />
                    ) : (
                      <ExpandMore className={classes.arrowIcon} />
                    )}
                  </ListItemIcon>
                </Grid>
              </Grid>
            </ListItem>
            <Collapse
              in={this.isChildLinksActive(link) || this.state.links[link.id]}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                className={classNames({ [classes.hide]: isCollapsed })}
              >
                {link.children.map(child => listItem(child, true))}
              </List>
            </Collapse>
          </List>
        )}
      </List>
    ));
  };

  render() {
    const { isCollapsed } = this.props;
    return (
      <Styled>{({ classes }) => this.renderLinks(classes, isCollapsed)}</Styled>
    );
  }
}

export default withRouter(NestedList);
