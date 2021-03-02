import React, { Component } from "react";
import Link from "next/link";
import Navigation from "./Navigation"
import css from "./SmallScreenStyles.module.scss";
import { LOCALS } from "constants/local";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

class MobileNavbar extends Component {
  state = {
    menuIsOpen: false,
    searchIsOpen: false
  };

  toggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      searchIsOpen: false
    });
  };

  toggleSearch = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
      menuIsOpen: false
    });
  };

  render() {
    const { searchIsOpen, menuIsOpen } = this.state;

    return (
      <div className={`${css.wrapper}`}>
        <div className={css.header}>
            <Link  as="/" href="/local">
              <a>
                <img
                  className={css.localLogo}
                  alt={`${LOCALS[LOCAL_ID].name} Home`}
                  src={`/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[
                    LOCAL_ID
                  ].logo}`}
                />
              </a>
            </Link>
          <button
            type="button"
            aria-expanded={menuIsOpen}
            onClick={this.toggleMenu}
            className={`${css.menuButton} ${menuIsOpen ? css.isOpen : ""}`}
          >
            {!menuIsOpen ? <MenuIcon /> : <CloseIcon />}
          </button>
        </div>
          <Navigation
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} site-max-width`}
            css={css}
          />
      </div>
    );
  }
}

export default MobileNavbar;
