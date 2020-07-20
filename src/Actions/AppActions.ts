import { ThunkAction } from "redux-thunk";
import Types from "./index";
import { getUsersResponse, handleUsers, getUserDigest } from "../Utils";

export const chunkSize = 10;

const setLoadingState = (loading: boolean) => ({
  type: Types.SET_LOADING_STATE,
  payload: loading
})

const setUsers = (users: any) => ({
  type: Types.SET_USERS,
  payload: users
})

export const toggleActivation = (id: string) => ({
  type: Types.TOGGLE_ACTIVATION,
  payload: id
})

export const choseUser = (user: IConvertedUser | null) => ({
  type: Types.CHOSE_USER,
  payload: user
})

export const setUsersDigest = (digestResponse: any) => ({
  type: Types.SET_USERS_DIGEST,
  payload: digestResponse
})

export const onPageChange = (pageNumber: number) => ({
  type: Types.ON_PAGE_CHANGE,
  payload: pageNumber
})

export const loadUsers = (): ThunkAction<
  Promise<any>,
  IStore,
  any,
  any
> => async (dispatch) => {
  try {
    dispatch(setLoadingState(true));

    /**
     * Call server to get users.
     */
    const usersResponse = await getUsersResponse();
    // const usersResponse = usersMock;

    /**
     * Convert response to user friendly.
     */
    const users = handleUsers(usersResponse);

    /**
     * Save users in state.
     */
    dispatch(setUsers(users));

    /**
     * Call first chunk of digest.
     */
    dispatch(loadUsersDigest());

    dispatch(setLoadingState(false))
  } catch (error) {
    console.error("->>>>ERROR>>>>>>>", error);
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loadUsersDigest = (): ThunkAction<
  Promise<any>,
  IStore,
  any,
  any
> => async (dispatch, getStore: () => IStore) => {
  try {
    const { users, ittr } = getStore().AppReducer;

    /**
     * Getting digest value in chunks of 10.
     */
    const start = ittr * chunkSize;

    const end = start + chunkSize;

    const promises = users.slice(start, end).map(getUserDigest);

    const responses = await Promise.all(promises);

    await delay(5000);

    /**
     * Updating users list with each user digest.
     */
    dispatch(setUsersDigest(responses));

  } catch (error) {
    console.error("->>>>ERROR>>>>>>>", error);
  }
};
