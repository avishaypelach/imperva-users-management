import { loadUsers, loadUsersDigest } from "./Actions/AppActions";
import { RouteProps } from "react-router";

declare global {

  interface IIMPERVARoute extends RouteProps { }

  interface IAppReducer {
    ittr: number;
    pageNumber: number;
    users: IConvertedUser[];
    chosenUser: IConvertedUser | null;
  }

  interface IStore {
    AppReducer: IAppReducer;
  }

  declare namespace NUsersResponse {

    interface Name {
      first: string;
      last: string;
    }

    interface Friend {
      id: number;
      name: string;
    }

    interface RootObject {
      _id: string;
      index: number;
      guid: string;
      isActive: boolean;
      balance: string;
      picture: string;
      age: number;
      eyeColor: string;
      name: Name;
      company: string;
      email: string;
      phone: string;
      address: string;
      about: string;
      registered: string;
      latitude: string;
      longitude: string;
      tags: string[];
      range: number[];
      friends: Friend[];
      greeting: string;
      favoriteFruit: string;
    }
  }

  interface IConvertedUser {
    _id: string;
    index: number;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    tableAddress: string;
    about: string;
    registered: string;
    digest: string;
    nameForServer: string;
  }

  /**
   * Containers
   */

  declare namespace NApp {
    interface IProps extends RouteComponentProps, IStore {
      loadUsers: typeof loadUsers;
      loadUsersDigest: typeof loadUsersDigest;
    }

    interface IState { }
  }
}