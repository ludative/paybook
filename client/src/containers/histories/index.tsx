import React, { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Button, Icon, List, Table } from "semantic-ui-react";
import { add, sub, isEqual, startOfDay, format } from "date-fns";
import "../../styles/histories/index.scss";
import useRequest from "../../utils/swr";
import { IHistory } from "../../interfaces/IHistories";
import { ClassificationType } from "../../enum/histories";

const classificationKR = {
  [ClassificationType.DEPOSIT]: "입금",
  [ClassificationType.WITHDRAWAL]: "출금",
};
const Histories: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const onChange = (event, data) => setDate(data.value);
  const { data, mutate } = useRequest<IHistory[]>({
    url: `/api/histories/daily?date=${format(date, "yyyy-MM-dd")}`,
  });

  console.log(data);

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

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>입/출</Table.HeaderCell>
            <Table.HeaderCell>유형</Table.HeaderCell>
            <Table.HeaderCell>내용</Table.HeaderCell>
            <Table.HeaderCell>금액</Table.HeaderCell>
            <Table.HeaderCell>지불 수단</Table.HeaderCell>
            <Table.HeaderCell>메모</Table.HeaderCell>
            <Table.HeaderCell>관리</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{classificationKR[item.classification]}</Table.Cell>
              <Table.Cell>{item.typeCode.name}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.paymentCode.name}</Table.Cell>
              <Table.Cell>{item.memo}</Table.Cell>
              <Table.Cell>
                <Button>수정</Button>
                <Button negative>삭제</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Histories;
