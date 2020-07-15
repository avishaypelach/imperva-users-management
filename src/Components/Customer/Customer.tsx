import React from 'react';
import Style from "./Customer.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { choseUser, toggleActivation } from "../../Actions/AppActions";
import { history } from '../../Router';
import leftArrow from "./leftArrow.svg";
import Switch from 'react-switch';

export default () => {
  const { chosenUser } = useSelector(({ AppReducer }: IStore) => AppReducer);
  const dispatch = useDispatch();
  const handleBackPress = () => {
    dispatch(choseUser(null));

    history.replace('/customers')
  }
  const userStatus = chosenUser?.isActive ? "active" : "deactivated"

  return (
    <div className={Style.container}>
      {
        chosenUser ?
          <div className={Style.userContainer}>
            <div className={Style.userHeader}>
              <div className={Style.back} onClick={handleBackPress}>
                <img src={leftArrow} alt="go back" />
                Back to table
            </div>
              <div className={Style.activationMessage}>User is currently
              <span className={Style[userStatus]}>
                  {" " + userStatus}
                </span>
              </div>
              <Switch
                onChange={() => dispatch(toggleActivation(chosenUser._id))}
                checked={chosenUser.isActive}
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onHandleColor="#2693e6"
                uncheckedIcon={false}
                handleDiameter={30}
                onColor="#86d3ff"
                height={20}
                width={48}
              />
            </div>
            <div className={Style.userInfo}>
              <div className={Style.left}>
                <img src={chosenUser.picture} alt="profile" className={Style.profileImage} />
                <div className={Style.name}>{chosenUser.name}</div>
                <div className={Style.infoContainer}>
                  <div className={Style.info}><strong>Age:</strong> {chosenUser.age}</div>
                  <div className={Style.info}><strong>Phone:</strong> {chosenUser.phone}</div>
                  <div className={Style.info}><strong>Email:</strong> {chosenUser.email}</div>
                  <div className={Style.info}><strong>Eye color:</strong> {chosenUser.eyeColor}</div>
                  <div className={Style.info}><strong>Address:</strong> {chosenUser.address}</div>
                </div>
              </div>
              <div className={Style.right}>
                <div className={Style.infoContainer}>
                  <div className={Style.about}><strong>About:</strong> <br /> {chosenUser.about}</div>
                  <div className={Style.info}><strong>Company Name:</strong> {chosenUser.company}</div>
                  <div className={Style.info}><strong>Current Balance:</strong> {chosenUser.balance}</div>
                  <div className={Style.info}><strong>Registered on:</strong> {chosenUser.registered}</div>
                </div>
              </div>
            </div>
          </div>
          :
          null
      }
    </div>
  );
};