import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../index';
import './index.css';


storiesOf('Query builder', module)
  .add('default view', () => (
    <App />
  ));
