import React from "react";
import { Button, Table } from "semantic-ui-react";
import useRequest from "../../utils/swr";
import { IHistory } from "../../interfaces/IHistories";
import { format } from "date-fns";
import { ClassificationType } from "../../enum/histories";

const classificationKR = {
  [ClassificationType.DEPOSIT]: "입금",
  [ClassificationType.WITHDRAWAL]: "출금",
};

const Grid: React.FC<{ date: Date }> = ({ date }) => {
  const { data } = useRequest<IHistory[]>({
    url: `/api/histories/daily?date=${format(date, "yyyy-MM-dd")}`,
  });

  return (
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
        {data?.map((item) => (
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
  );
};

export default Grid;
