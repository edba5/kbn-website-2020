import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Drawer from 'reusecore/src/elements/Drawer';
import Image from 'reusecore/src/elements/Image';
import { DrawerContext } from 'common/src/contexts/DrawerContext';
import InnerWrapper, { SpreadButton } from './drawerSection.style';
import heartImage from 'common/src/assets/image/charity/heart-red.png';

const DrawerSection = () => {
  const [toggleState, setToggleState] = useState(false);
  const { state, dispatch } = useContext(DrawerContext);

  const handleActiveClass = () => {
    setToggleState(!toggleState);
  };

  const handleDrawerToggle = () => {
    dispatch({
      type: 'TOGGLE',
    });
    handleActiveClass();
  };

  const data = useStaticQuery(graphql`
    query {
      charityJson {
        menuItems {
          path
          label
          offset
        }
        botonopiniones {
          txtboton
        }
      }
    }
  `);

  const scrollItems = [];

  data.charityJson.menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const { txtboton } = data.charityJson.botonopiniones;

  return (
    <Drawer
      width="420px"
      placement="right"
      drawerHandler={
        <button
          className={`drawer_btn ${toggleState ? 'active' : ''}`}
          onClick={handleActiveClass}
          aria-label="drawer toggle button"
        >
          <ul className="grid">
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
          <i className="flaticon-plus-symbol " />
        </button>
      }
      open={state.isOpen}
      toggleHandler={handleDrawerToggle}
    >
      <InnerWrapper>
        <Scrollspy
          className="scrollspy__menu"
          items={scrollItems}
          offset={-81}
          currentClassName="active"
        >
          {data.charityJson.menuItems.map((menu, index) => (
            <li key={`menu_key${index}`}>
                {
                    menu.offset ? (
                        <AnchorLink
                          href={menu.path}
                          offset={menu.offset}
                          onClick={handleDrawerToggle}
                        >
                          {menu.label}
                        </AnchorLink>
                    ):(
                        <a
                          href={menu.path}
                          target='_blank'
                        >
                          {menu.label}
                      </a>
                    )
                }
            </li>
          ))}
        </Scrollspy>
        <a href="https://www.facebook.com/pg/kebabnation/reviews/">
          <SpreadButton>
            <span className="text">{txtboton}</span>
            <Image src={heartImage} alt="Facebook Reviews" />
          </SpreadButton>
        </a>
      </InnerWrapper>
    </Drawer>
  );
};

export default DrawerSection;
