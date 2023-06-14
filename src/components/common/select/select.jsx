import React, { useState } from 'react';
import { Select } from "semantic-ui-react";
import {hangjungdong} from "../../../utils/adress"

const AddressSelect = () => {
  // 선택된 시, 구, 동의 상태를 관리하는 state 변수
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTown, setSelectedTown] = useState('');

  // 시, 구, 동 선택 시 호출되는 함수들
  const handleCityChange = (result) => {
    // console.log(e.target.value,  result)
    setSelectedCity(result);
    setSelectedDistrict('');
    setSelectedTown('');
  };

  const handleDistrictChange = (e, result) => {
    setSelectedDistrict(result.value);
    setSelectedTown('');
  };

  const handleTownChange = (e, result) => {
    setSelectedTown(result.value);
  };

  const cityOptions = hangjungdong.sido.map((sido) => ({
    value: sido.sido,
    text: sido.codeNm
  }));

  const districtOptions = hangjungdong.sigugun
    .filter((sigugun) => sigugun.sido === selectedCity)
    .map((sigugun) => ({
      value: sigugun.sigugun,
      text: sigugun.codeNm
    }));

    const townOptions = hangjungdong.dong
    .filter(
      (dong) => dong.sido === selectedCity && dong.sigugun === selectedDistrict
    )
    .map((dong) => ({
      value: dong.dong,
      text: dong.codeNm
    }));


  const handleRequest = () => {
    if (selectedCity && selectedDistrict && selectedTown) {
      const cityCodeNm = hangjungdong.sido.find((sido) => sido.sido === selectedCity)?.codeNm;
      const districtCodeNm = hangjungdong.sigugun.find((sigugun) => sigugun.sigugun === selectedDistrict)?.codeNm;
      const townCodeNm = hangjungdong.dong.find((dong) => dong.dong === selectedTown)?.codeNm;
  
      console.log(`요청: ${cityCodeNm}, ${districtCodeNm}, ${townCodeNm}`);
    } else {
      console.log('시, 구, 동을 모두 선택해주세요.');
    }
  };

  return (
    <div>
      <Select placeholder="시 선택" options={cityOptions} value={selectedCity} onChange={(e, data) => handleCityChange(data.value)}>
      </Select>

      <Select placeholder="구 선택" options={districtOptions} value={selectedDistrict} onChange={handleDistrictChange}>
      </Select>

      <Select placeholder="동 선택" options={townOptions} value={selectedTown} onChange={handleTownChange}>
      </Select>

      <button onClick={handleRequest}>검색</button>
    </div>
  );
};

export default AddressSelect;
