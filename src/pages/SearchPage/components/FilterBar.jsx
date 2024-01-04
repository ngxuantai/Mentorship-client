import {Container, Row} from 'react-bootstrap';

import {useEffect, useRef, useState} from 'react';
import {BsChevronDown} from 'react-icons/bs';
import {MAX_PRICE, MIN_PRICE} from '../../../constants';
import '../css/Slider.css';
import FilterButton from './SkillFilterButton';
import SortButton from './SortButton';
import PriceFilterButton from './PriceFilterButton';

export default function FilterBar({filters, onFilterChange, setSortBy}) {
  return (
    <div
      style={{
        marginTop: 8,
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'start',
        width: 'auto',
      }}
    >
      <FilterButton
        filters={filters}
        onFilterChange={onFilterChange}
      ></FilterButton>

      <PriceFilterButton filters={filters} onFilterChange={onFilterChange} />

      <SortButton setSortBy={setSortBy} />
    </div>
  );
}
