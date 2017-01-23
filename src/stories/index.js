import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TwoWayQuerybuilder from '../TwoWayQuerybuilder';
import './index.css';

const config = {
  query: "((firstname='Jack' AND lastName='London') OR lastName='Smith')",
};

const defaultFields = [
  { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
  { name: 'lastName', operators: 'all', label: 'Last Name', input: { type: 'text' } },
  { name: 'age', operators: 'all', label: 'Age', input: { type: 'text' } },
  { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
];

const changedFields = [
  { name: 'firstName', operators: 'all', label: 'First Name', input: { type: 'text' } },
  { name: 'lastName', operators: 'all', label: 'Last Name', input: {
    type: 'select',
    options: [
      { value: 'Smith', name: 'Smith' },
      { value: 'London', name: 'London' },
    ] } },
  { name: 'age', operators: 'all', label: 'Age',
    input: {
      type: 'select',
      options: [
        { value: '28', name: 'twenty eight' },
        { value: '30', name: 'thirty' },
      ] } },
  { name: 'birthDate', operators: 'all', label: 'Birth date', input: { type: 'text' } },
];

const styles = {
  primaryBtn: 'customPrimaryBtn',
  deleteBtn: 'customDeleteBtn',
  rule: 'rule',
  condition: 'condition',
  select: 'querySelect',
  input: 'queryInput',
  txtArea: 'queryText',
};

const changedStyles = {
  styles,
};

storiesOf('Query builder', module)
  .add('default view', () => (
    <TwoWayQuerybuilder fields={defaultFields} onChange={action('data changed')} />
  ))
  .add('existing query', () => (
    <TwoWayQuerybuilder config={config} fields={defaultFields} onChange={action('data changed')} />
  ))
  .add('changed input types', () => (
    <TwoWayQuerybuilder fields={changedFields} onChange={action('data changed')} />
  ))
  .add('custom styles', () => (
    <TwoWayQuerybuilder config={changedStyles} fields={defaultFields} onChange={action('data changed')} />
  ));
