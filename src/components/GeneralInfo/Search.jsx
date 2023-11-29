import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

export default function Search(props) {
  const { setSearch } = props;

  const [formState, setFormState] = useState({
    city: "",
  });
  const inputRef = useRef(null);


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleInputChange(e) {
    const newFormStates = {...formState}
    newFormStates[e.target.id] = e.target.value;
    setFormState(newFormStates)
  }

  function submitForm(e) {
    e.preventDefault();
    setSearch(formState.city)
  }


  return (
    <div>
    <SearchContainer onSubmit={(e) => submitForm(e)}>
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder="Procure por uma cidade"
        id="city"
        value={formState.city}
        onChange={(e) => handleInputChange(e)}
      />
      <SearchIcon className="search-icon" />
    </SearchContainer>
    </div>
  );
}

const SearchContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 100%;
  min-height: 50px;
  width: 100%;
  min-width: 90%;
  border: none;
  border-radius: 15px;
  background-color: #ededef;
  color: #434242;
  font-size: 16px;
  margin-top: 50px;
  padding-left: 40px;
  margin-left: 50px;
  margin-right: 50px;
  outline: 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &::placeholder {
    color: #424243;
    font-size: 1.1vw;
  }
`;

const SearchIcon = styled(CiSearch)`
  position: absolute;
  left: 30px;
  top: 64%;
  width: 100%;
  max-width: 2vw;
  height: 100%;
  max-height: 22px;
  color: #8b9caf;
`;