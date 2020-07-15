import React from 'react';
import Style from './App.module.scss';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import Routes, { history } from "./Router";
import { loadUsers, loadUsersDigest, chunkSize } from "./Actions/AppActions";


class App extends React.Component<NApp.IProps, NApp.IState> {
  static MSTP = (store: IStore) => store;

  static MDTP = (dispatch: Dispatch) =>
    // This function connects the action creators with the dispatch, so instead of writing:
    // dispatch(actionCreator(payload)), redux already connects them so you just call the name of the actionCreator
    bindActionCreators({
      loadUsers,
      loadUsersDigest
    }, dispatch);

  _renderRoutes = (IMPERVARoute: IIMPERVARoute, idx: number) => <Route key={idx} {...IMPERVARoute} />;

  componentDidMount() {
    history.push("/customers");

    this.props.loadUsers();
  }

  componentDidUpdate(prevProps: any) {
    const { ittr, users } = this.props.AppReducer;
    const maxIttr = Math.ceil(users.length / chunkSize);

    if (prevProps.AppReducer.ittr !== ittr && ittr <= maxIttr) {
      this.props.loadUsersDigest();
    }
  }

  howManyActiveUsers = () => {
    const { users } = this.props.AppReducer

    return users.filter(({ isActive }: IConvertedUser) => isActive).length
  }

  render() {
    return (
      <Router history={history}>
        <div className={Style.container}>
          <h1>User management - {this.howManyActiveUsers()} active users</h1>
          {Routes.map(this._renderRoutes)}
        </div>
      </Router>
    );
  }
}

export default connect(App.MSTP, App.MDTP)(App);