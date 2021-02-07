import React, {useMemo, useState} from 'react';
import {Button, Form, Header, Icon, Image, Input, Modal, Table} from 'semantic-ui-react'
import "../../../styles/admin/codes.scss"
import useRequest from "../../../utils/swr";
import {ICode, IGetCodesApi, IModalCode} from "../../../interfaces/ICodes";
import {CodeDataKeys, CodeTypes} from "../../../enum/codes";
import {addCodeApi, updateCodeApi} from "../../../api/codes";
import useConfirm from "../../../hooks/useConfirm";

const initialCodeData: IModalCode = {
    code: "",
    name: "",
    icon: "",
    type: CodeTypes.TYPE
}

const AdminCodes: React.FC = () => {
    const {data, mutate} = useRequest<IGetCodesApi>({url: "/api/codes"});
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [code, setCode] = useState<IModalCode>(undefined);
    const { confirmModal, ModalConfirm } = useConfirm();

    const isDisabledModalSave = useMemo<boolean>(() => {
        if (!code) return true;

        const isDisabled:boolean = !(code.code && code.name);
        if (code.type === CodeTypes.TYPE) {
            return isDisabled || !code.icon
        } else {
            return isDisabled;
        }
    }, [code])

    const addCode = (type: CodeTypes):void => {
        const codeData: IModalCode = {...initialCodeData, type}
        setCode(codeData);
        setIsOpenModal(true);
    }

    const updateCode = (codeData: ICode):void => {
        const {createdAt, updatedAt, ...modifyCodeData} = codeData;
        setCode(modifyCodeData);
        setIsOpenModal(true);
    }

    const initializeCode = ():void => {
        setCode(initialCodeData);
        setIsOpenModal(false);
    }

    const changeCode = (key:CodeDataKeys) => (e:React.ChangeEvent<HTMLInputElement>):void => {
        setCode(state => ({...state, [key]: e.target.value}))
    }

    const showConfirmModal = () => {
        confirmModal({
            message: "코드를 저장하시겠습니까?",
            onOk: saveCode
        });
    }

    const saveCode = async (): Promise<void> => {
        try {
            if (code.id) await updateCodeApi(code);
            else await addCodeApi(code);

            initializeCode();
            await mutate();
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <>
            <div className={"AdminCodesContainer"}>
                <div className={"AdminCodesCodeWrapper"}>
                    <Header as='h3'>유형 코드</Header>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>아이콘</Table.HeaderCell>
                                <Table.HeaderCell>이름</Table.HeaderCell>
                                <Table.HeaderCell>Code</Table.HeaderCell>
                                <Table.HeaderCell/>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                data?.types?.map(type => (
                                    <Table.Row key={type.id}>
                                        <Table.Cell>
                                            <Image src={type.icon} size='tiny' circular />
                                        </Table.Cell>
                                        <Table.Cell>{type.name}</Table.Cell>
                                        <Table.Cell>{type.code}</Table.Cell>
                                        <Table.Cell>
                                            <Icon name={"pencil"} size={"large"} onClick={() => updateCode(type)}/>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Button
                                        floated='right'
                                        icon
                                        labelPosition='left'
                                        primary
                                        size='small'
                                        onClick={() => addCode(CodeTypes.TYPE)}
                                    >
                                        <Icon name='plus' /> 추가
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
                <div className={"AdminCodesCodeWrapper"}>
                    <Header as='h3'>지불 코드</Header>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>이름</Table.HeaderCell>
                                <Table.HeaderCell>Code</Table.HeaderCell>
                                <Table.HeaderCell/>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                data?.payments?.map(payment => (
                                    <Table.Row key={payment.id}>
                                        <Table.Cell>{payment.name}</Table.Cell>
                                        <Table.Cell>{payment.code}</Table.Cell>
                                        <Table.Cell>
                                            <Icon name={"pencil"} size={"large"} onClick={() => updateCode(payment)}/>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Button
                                        floated='right'
                                        icon
                                        labelPosition='left'
                                        primary
                                        size='small'
                                        onClick={() => addCode(CodeTypes.PAYMENT)}
                                    >
                                        <Icon name='plus' /> 추가
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </div>
            <Modal
                closeIcon
                open={isOpenModal}
                onClose={initializeCode}
                size={"tiny"}
            >
                <Header icon='archive' content={`${code?.id ? '코드 수정' : '코드 추가'}`} />
                <Modal.Content className={"AdminCodesModalContent"}>
                    <Form>
                        <Form.Field inline>
                            <label>code</label>
                            <Input placeholder='Code 입력' value={code?.code} onChange={changeCode(CodeDataKeys.CODE)}/>
                        </Form.Field>
                        <Form.Field inline>
                            <label>이름</label>
                            <Input placeholder='이름 입력' value={code?.name} onChange={changeCode(CodeDataKeys.NAME)} />
                        </Form.Field>
                        {
                            code?.type === CodeTypes.TYPE && (
                                <Form.Field inline>
                                    <label>icon</label>
                                    <Input placeholder='icon 이미지 경로 입력' value={code?.icon} onChange={changeCode(CodeDataKeys.ICON)} />
                                </Form.Field>
                            )
                        }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={initializeCode}>
                        <Icon name='remove' /> 취소
                    </Button>
                    <Button color='green' disabled={isDisabledModalSave} onClick={showConfirmModal}>
                        <Icon name='checkmark' /> 저장
                    </Button>
                </Modal.Actions>
            </Modal>
            {ModalConfirm}
        </>
    )
};

export default AdminCodes
