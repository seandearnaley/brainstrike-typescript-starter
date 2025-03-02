import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CardManager } from './CardManager';
import { CardsNav } from './CardsNav';
import { useStyles } from '../styles';
import { css } from '@emotion/css';

export const MainPanel: React.FC = () => {
  const classes = useStyles();
  
  return (
    <>
      <div className={classes.appBarSpacer} />
      <div className={css`
        height: calc(100% - 64px);
      `}>
        <Routes>
          <Route path="/cards" element={<CardManager />} />
          <Route path="/sets" element={<CardsNav />} />
          <Route path="/" element={
            <div className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              text-align: center;
              padding: 24px;
            `}>
              <h2 className={css`
                color: #3f51b5;
                margin-bottom: 16px;
                font-size: 28px;
              `}>Welcome to Brainstrike Card Manager</h2>
              <p className={css`
                color: #757575;
                max-width: 600px;
                line-height: 1.5;
                font-size: 16px;
              `}>
                Use the navigation menu to access cards and sets. Click on the menu icon in the top left
                to expand the navigation drawer.
              </p>
            </div>
          } />
        </Routes>
      </div>
    </>
  );
};