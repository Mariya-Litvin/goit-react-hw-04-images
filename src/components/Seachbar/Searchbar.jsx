import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SeachField,
  SeachForm,
  SearchButton,
  SearchInput,
  SearchLabel,
} from './Seachbar.styled';
import { IoSearchSharp } from 'react-icons/io5';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = evt => {
    setName(evt.target.value.trim());
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <SeachField>
      <SeachForm onSubmit={onFormSubmit}>
        <SearchButton type="submit">
          <IoSearchSharp size="27px" />
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={name}
        />
      </SeachForm>
    </SeachField>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
