import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function Datetime(props) {
  const { dt } = props;
  const dateObject = dayjs.unix(dt);

  const formattedDate1 = dateObject.format("DD/MM/YYYY");
  const formattedDate2 = dateObject.format("dddd, HH:mm");

  return (
    <DatetimeBox>
      <p>{formattedDate1}</p>
      <p>{formattedDate2}</p>
    </DatetimeBox>
  );
}

const DatetimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  p {
    font-size: 1.1vw;
  }
`;
