import { useState } from "react";
import Switch from "react-switch";
import styled from "styled-components";

export default function SwitchButton(props) {

  const {unit, setUnit} = props
  const [checked, setChecked] = useState(false);

  const handleChangeSwitch = (newChecked) => {
    //console.log("o que esta chegando no handlechangeswitch", newChecked);
    setChecked(newChecked);
    setUnit(newChecked ? "imperial" : "metric");
  };



    return (
      <div style={{width: '10vw'}}>
      <LeftBoxInfoUnit>
      <Switch
        checked={checked}
        onChange={handleChangeSwitch}
        onColor="#a19dc0"
        offColor="#E9E9EA"
        onHandleColor="#4d4494"
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={35}
        className="react-switch"
      />{" "}
        <p>°F</p>
    </LeftBoxInfoUnit>
    </div>
    );
  }
  
  const LeftBoxInfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 70px;

  p {
    font-size: 1.0vw;
    padding-left: 20px;

    @media (min-width: 600px) and (max-width: 1023px) {
    font-size: 1.8vw;
  }

  @media (max-width: 599px) {
    font-size: 3.2vw;
    }
  }
`;