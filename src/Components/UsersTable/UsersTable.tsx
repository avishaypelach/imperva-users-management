import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Style from "./UsersTable.module.scss";
import { toggleActivation, choseUser, onPageChange } from "../../Actions/AppActions";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Switch from "react-switch";
import { history } from '../../Router';

export default () => {
  const users = useSelector(({ AppReducer }: IStore) => AppReducer.users);
  const pageNumber = useSelector(({ AppReducer }: IStore) => AppReducer.pageNumber);
  const dispatch = useDispatch();

  const paginationFactoryOption = {
    page: pageNumber,
    sizePerPage: 10,
    hideSizePerPage: true,
    onPageChange: (pageNumber: number) => dispatch(onPageChange(pageNumber))
  }

  const rowEvents = {
    onDoubleClick: (e: any, chosenUser: IConvertedUser) => {
      const { isActive, _id } = chosenUser;

      if (isActive) {
        dispatch(choseUser(chosenUser))

        history.push(`/customer?id=${_id}`);
      }
    }
  };

  const activationButton = (isActive: boolean, { _id }: IConvertedUser) => {
    return (
      <Switch
        checked={isActive}
        onChange={() => dispatch(toggleActivation(_id))}
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        onHandleColor="#2693e6"
        uncheckedIcon={false}
        handleDiameter={30}
        onColor="#86d3ff"
        height={20}
        width={48}
      />
    )
  }

  const columns = [
    {
      dataField: 'index',
      text: '#',
    },
    {
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'company',
      text: 'Company'
    },
    {
      dataField: 'tableAddress',
      text: 'Address'
    },
    {
      dataField: 'digest',
      text: 'Digest'
    },
    {
      dataField: 'isActive',
      text: 'User Activation',
      formatter: activationButton,
    }
  ];

  const rowStyle = ({ isActive }: IConvertedUser) => {
    if (isActive) {
      return {
        cursor: "pointer",

      }
    } else {
      return {
        color: "grey",
        cursor: "not-allowed",
      }
    }
  };

  return (
    <div className={Style.container}>
      <BootstrapTable
        pagination={paginationFactory(paginationFactoryOption)}
        headerWrapperClasses={Style.headerWrapperClasses}
        rowEvents={rowEvents}
        rowStyle={rowStyle}
        columns={columns}
        keyField='_id'
        data={users}
        striped
        hover
      />
    </div>
  );
};