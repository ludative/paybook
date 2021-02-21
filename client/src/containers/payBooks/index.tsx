import React, {SyntheticEvent, useMemo, useState} from 'react';
import "../../styles/payBooks/index.scss"
import {Button, ButtonProps, Dropdown, Form, Header, Icon, Input, Modal} from "semantic-ui-react";
import useRequest from "../../utils/swr";
import {Icons} from "../../enum/icons";
import {ICreatePayBookInfo, IGetPayBookApi, IPayBookDropDown} from "../../interfaces/IPayBooks";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import {CreatedPayBookKeys, SelectedPayBookTypes} from "../../enum/payBooks";
import {CheckboxProps} from "semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox";
import generateUniqueString from "../../utils/generateUniqueString";
import {createPayBookApi, createPayBookByInvitedCodeApi} from "../../api/payBooks";
import useConfirm from "../../hooks/useConfirm";
import {RouteComponentProps} from "react-router-dom"
import cookies from "browser-cookies";
import {CookieNames} from "../../enum/cookies";

const initialCreatedPayBookInfo: ICreatePayBookInfo = {name: "", isShare: false, inviteCode: ""};

const PayBooks: React.FC<RouteComponentProps> = props => {
    const {data, mutate} = useRequest<IGetPayBookApi[]>({url: "/api/pay-books"});
    const [selectedPayBookType, setSelectedPayBookType] = useState<SelectedPayBookTypes>(undefined);
    const [isOpenSelectTypeModal, setIsOpenSelectTypeModal] = useState<boolean>(false);
    const [invitedCode, setInvitedCode] = useState<string>("");
    const [createPayBookInfo, setCreatePayBookInfo] = useState<ICreatePayBookInfo>(initialCreatedPayBookInfo);
    const { confirmModal, ModalConfirm } = useConfirm();

    const dropDownOptions: IPayBookDropDown[] = useMemo(() => {
        return data?.map(payBook => ({
            key: payBook.id,
            value: payBook.id,
            text: payBook.name,
            icon: payBook.isShare ? Icons.USERS : Icons.USER
        })) ?? []
    }, [data]);

    const selectPayBook = (e: SyntheticEvent<HTMLElement>, dropDownProps: DropdownProps): void => {
        cookies.set(CookieNames.PAY_BOOK_ID, String(dropDownProps.value));
        props.history.push('/histories')
    }

    const initializeSelectedPayBookType = (initializeModalInfoFn?: () => void) => {
        if (initializeModalInfoFn) initializeModalInfoFn();
        setSelectedPayBookType(undefined);
    }

    const toggleSelectTypeModal = () => {
        if (isOpenSelectTypeModal) initializeSelectedPayBookType();
        setIsOpenSelectTypeModal(state => !state);
    }

    const selectPayBookType = (e: React.MouseEvent<HTMLButtonElement>, buttonProps: ButtonProps):void => {
        setSelectedPayBookType(SelectedPayBookTypes[buttonProps.value]);
        setIsOpenSelectTypeModal(false);
    }

    const changeInvitedCode = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInvitedCode(e.target.value);
    }

    const changeCreatedPayBookInfo = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setCreatePayBookInfo(state => ({...state, [e.target.name]: e.target.value}))
    }

    const changeCreatedPayBookInfoIsShared = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps):void => {
        setCreatePayBookInfo(state => ({...state, isShare: data.value === SelectedPayBookTypes.INVITED, inviteCode: ""}));
    }

    const changeCreatedPayBookInfoInvitedCode = ():void => {
        setCreatePayBookInfo(state => ({...state, inviteCode: generateUniqueString()}));
    }

    const closeCreatePayBookModal = () => {
        initializeSelectedPayBookType(() => setCreatePayBookInfo(initialCreatedPayBookInfo))
    }

    const closeInvitedPayBookModal = () => {
        initializeSelectedPayBookType(() => setInvitedCode(""))
    }

    const copyToClipBoard = () => {
        const textAreaElement = document.createElement("textarea");
        document.body.appendChild(textAreaElement);
        textAreaElement.value = createPayBookInfo.inviteCode;
        textAreaElement.select();
        document.execCommand('copy');
        document.body.removeChild(textAreaElement);
    }

    const showCreatePayBookConfirmModal = () => {
        confirmModal({
            message: "가계부를 생성하시겠습니까?",
            onOk: createPayBook
        });
    }

    const createPayBook = async (): Promise<void> => {
        try {
            await createPayBookApi(createPayBookInfo);
            closeCreatePayBookModal();
            await mutate();
        } catch (e) {
            alert(e.message)
        }
    }

    const showInvitePayBookConfirmModal = () => {
        confirmModal({
            message: "공용 가계부를 추가하시겠습니까?",
            onOk: createPayBookByInvitedCode
        });
    }

    const createPayBookByInvitedCode = async (): Promise<void> => {
        try {
            await createPayBookByInvitedCodeApi(invitedCode);
            closeInvitedPayBookModal();
            await mutate();
        } catch (e) {
            alert(e.message)
        }
    }

    const {isOpenInvitedPayBookModal, isOpenNewPayBookModal} = useMemo(() => ({
        isOpenInvitedPayBookModal: selectedPayBookType === SelectedPayBookTypes.INVITED,
        isOpenNewPayBookModal: selectedPayBookType === SelectedPayBookTypes.NEW
    }), [selectedPayBookType]);

    const isDisabledCreatePayBook = useMemo(() => {
        if (!createPayBookInfo.name) return true;
        return createPayBookInfo.isShare && !createPayBookInfo.inviteCode;
    }, [createPayBookInfo])

    return (
        <div className="payBookContainer">
            <div className="buttonWrapper">
                <Button primary fluid onClick={toggleSelectTypeModal}>새로운 가계부 추가 +</Button>
            </div>
            <Dropdown
                placeholder='가계부를 선택하세요.'
                fluid
                multiple
                search
                selection
                options={dropDownOptions}
                onChange={selectPayBook}
                closeOnChange
            />
            <Modal
                closeIcon
                open={isOpenSelectTypeModal}
                onClose={toggleSelectTypeModal}
                size={"tiny"}
            >
                <Header icon={Icons.BOOK} content={`가계부 추가`} />
                <Modal.Content className={"selectPayBookType"}>
                    <Button.Group>
                        <Button primary value={SelectedPayBookTypes.NEW} onClick={selectPayBookType}>새로운 가계부 추가</Button>
                        <Button.Or />
                        <Button positive value={SelectedPayBookTypes.INVITED} onClick={selectPayBookType}>초대 코드 입력</Button>
                    </Button.Group>
                </Modal.Content>
            </Modal>
            <Modal
                closeIcon
                open={isOpenNewPayBookModal}
                onClose={closeCreatePayBookModal}
                size={"tiny"}
            >
                <Header icon={Icons.BOOK} content={`새로운 가계부 추가`} />
                <Modal.Content className={"createPayBook"}>
                    <Form>
                        <Form.Group inline>
                            <label>가계부 이름</label>
                            <Input placeholder='이름 입력' value={createPayBookInfo.name} name={CreatedPayBookKeys.NAME} onChange={changeCreatedPayBookInfo}/>
                        </Form.Group>
                        <Form.Group inline>
                            <label>공유 여부</label>
                            <Form.Radio
                                label='공유'
                                value={SelectedPayBookTypes.INVITED}
                                checked={createPayBookInfo.isShare}
                                onChange={changeCreatedPayBookInfoIsShared}
                            />
                            <Form.Radio
                                label='비공유'
                                value={SelectedPayBookTypes.NEW}
                                checked={!createPayBookInfo.isShare}
                                onChange={changeCreatedPayBookInfoIsShared}
                            />
                        </Form.Group>
                        {
                            createPayBookInfo.isShare && (
                                <Form.Group inline className={"invitedCode"}>
                                    <label>초대 코드</label>
                                    <Header as='h3'>{createPayBookInfo.inviteCode}</Header>
                                    <Button className={"createCode"} onClick={changeCreatedPayBookInfoInvitedCode}>생성</Button>
                                    <Button onClick={copyToClipBoard}>복사</Button>
                                </Form.Group>
                            )
                        }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={closeCreatePayBookModal}>
                        <Icon name='remove' /> 취소
                    </Button>
                    <Button color='green' disabled={isDisabledCreatePayBook} onClick={showCreatePayBookConfirmModal}>
                        <Icon name='checkmark' /> 저장
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                closeIcon
                open={isOpenInvitedPayBookModal}
                onClose={closeInvitedPayBookModal}
                size={"tiny"}
            >
                <Header icon={Icons.BOOK} content={`초대 코드 입력`} />
                <Modal.Content className={""}>
                    <Input fluid placeholder='초대 코드를 입력해주세요.' value={invitedCode} onChange={changeInvitedCode}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={closeInvitedPayBookModal}>
                        <Icon name='remove' /> 취소
                    </Button>
                    <Button color='green' disabled={!invitedCode} onClick={showInvitePayBookConfirmModal}>
                        <Icon name='checkmark' /> 저장
                    </Button>
                </Modal.Actions>
            </Modal>
            {ModalConfirm}
        </div>
    )
};

export default PayBooks
