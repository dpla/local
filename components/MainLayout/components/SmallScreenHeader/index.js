import React, { Component } from "react";
import Link from "next/link";
import Navigation from "../shared/Navigation";
import css from "./SmallScreenStyles.module.scss";
import { LOCALS } from "constants/local";

const LOCAL_ID = process.env.LOCAL_ID

class SmallScreenHeader extends Component {
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
    const { isSearchPage, route, isHome } = this.props;

    return (
      <div className={`${css.wrapper}`}>
        {/* <div className={css.header}>
            <Link prefetch as="/" href="/local">
              <a>
                <img
                  className={css.localLogo}
                  alt={`${LOCALS[LOCAL_ID].name} Home`}
                  src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[
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
            {!menuIsOpen && <span>Show<br />Menu</span>}
            {menuIsOpen && <span>Hide<br />Menu</span>}
          </button>
        </div>
          <Navigation
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} site-max-width`}
            css={css}
            isHome={isHome}
          /> */}
      </div>
    );
  }
}

export default SmallScreenHeader;
