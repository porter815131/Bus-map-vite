import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select';
import { getJSON } from '../store/getJson';
import { BUS_API_URL } from '../store/config';

const SearchRoutes = ({ selectedCity }) => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const inputHandler = value => {
    setInput(value);
  };

  const selectHandler = value => {
    setSelected(value);
  };

  useEffect(() => {
    const routesData = async city => {
      try {
        const res = await getJSON(`${BUS_API_URL}/${city}`);

        setSelectedRoute(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    routesData(selectedCity.City);
  }, [selectedCity.City]);

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selected}
        getOptionLabel={e => console.log(e)}
        getOptionValue={e => console.log(e)}
        loadOptions={selectedRoute}
        onInputChange={inputHandler}
        onChange={selectHandler}
      />
    </div>
  );
};

export default SearchRoutes;
