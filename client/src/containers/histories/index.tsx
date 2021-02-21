import React, { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Icon, List } from "semantic-ui-react";
import { add, sub, isEqual, startOfDay, format } from "date-fns";
import "../../styles/histories/index.scss";
import useRequest from "../../utils/swr";
import { IHistory } from "../../interfaces/IHistories";
import Grid from "./Grid";

const Histories: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const onChange = (event, data) => setDate(data.value);
  const { data } = useRequest<IHistory[]>({
    url: `/api/histories/daily?date=${format(date, "yyyy-MM-dd")}`,
  });

  return (
    <div className="Histories">
      <div className="HistoriesDatePicker">
        <Icon
          name="angle left"
          onClick={() => setDate(sub(date, { days: 1 }))}
        />
        <SemanticDatepicker
          format="YYYY.MM.DD"
          locale="ko-KR"
          allowOnlyNumbers
          datePickerOnly
          clearOnSameDateClick={false}
          clearable={false}
          onChange={onChange}
          iconPosition="left"
          value={date}
          maxDate={new Date()}
        />
        <Icon
          name="angle right"
          disabled={isEqual(startOfDay(date), startOfDay(new Date()))}
          onClick={() => setDate(add(date, { days: 1 }))}
        />
      </div>

      <List>
        <List.Item>총 입금:</List.Item>
        <List.Item>총 출금:</List.Item>
        <List.Item>합계:</List.Item>
      </List>

      <Grid date={date} />
    </div>
  );
};

export default Histories;
