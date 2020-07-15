import { ExportReducer } from "../Utils";

const defaultState: IAppReducer = {
  ittr: 0,
  users: [],
  pageNumber: 1,
  chosenUser: null
};

const setUsers = (state: IAppReducer, users: any) => {
  return { ...state, users }
}

const toggleActivation = (state: IAppReducer, id: string) => {
  const newUsers = [...state.users];

  let user = newUsers.find(({ _id }) => _id === id);

  if (user) {
    user.isActive = !user?.isActive;
  }

  return { ...state, users: newUsers }
}

const choseUser = (state: IAppReducer, chosenUser: IConvertedUser | null) => {
  return { ...state, chosenUser }
}

const setUsersDigest = (state: IAppReducer, digestResponse: any) => {
  const newUsers = [...state.users];

  digestResponse.forEach(({ res, _id }: { res: any, index: IConvertedUser["index"], _id: IConvertedUser["_id"] }) => {
    const { Digest } = res;

    newUsers.forEach(user => {
      if (user._id === _id) {
        user.digest = Digest
      }
    });
  });

  return { ...state, users: newUsers, ittr: state.ittr + 1 }
}

const onPageChange = (state: IAppReducer, pageNumber: number) => {

  return { ...state, pageNumber }
}

const ActionMap: any = {
  SET_USERS: setUsers,
  CHOSE_USER: choseUser,
  ON_PAGE_CHANGE: onPageChange,
  SET_USERS_DIGEST: setUsersDigest,
  TOGGLE_ACTIVATION: toggleActivation
};

export default ExportReducer(ActionMap, defaultState);
