import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import clsx from 'clsx';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.link_active)
            }
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
        </>
        <>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.link_active)
            }
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'> Лента заказов </p>
          </NavLink>
        </>
      </div>
      <NavLink to={'/'}>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </NavLink>
      <div className={styles.link_position_last}>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.link_active)
          }
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
