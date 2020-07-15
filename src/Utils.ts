export const ExportReducer = (actionMap: any, defaultState: any) => (
  state = defaultState,
  action: any
) => {
  const { type } = action;

  // Clone state
  const clonedState = { ...state };

  // Check if the reducer should handle the current type
  if (type in actionMap) {
    return actionMap[type](clonedState, action.payload);
  }

  // If not type triggers a reducer, return the previous state
  return clonedState;
};

export const getUsersResponse = async () => {
  try {
    const url = `https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0`;
    const req = new Request(url);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(req, options);
    const res = await response.json();

    return Promise.resolve(res);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

export const getUserDigest = async ({ nameForServer, _id }: IConvertedUser) => {
  const url = `https://api.hashify.net/hash/md4/hex?value=${nameForServer}`;
  const req = new Request(url);
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(req, options)
    const res = await response.json()

    return Promise.resolve({ res, _id });
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Converting server users to user friendly
 */
export const handleUsers = (users: NUsersResponse.RootObject[]) => {
  const convertedUsers: IConvertedUser[] = [];

  users.forEach(({
    isActive,
    company,
    address,
    _id,
    age,
    email,
    about,
    eyeColor,
    phone,
    registered,
    picture,
    balance,
    name: { first, last } }, idx: number) => {

    const convertedUser: IConvertedUser = {
      _id,
      age,
      email,
      about,
      phone,
      company,
      address,
      picture,
      balance,
      eyeColor,
      isActive,
      registered,
      digest: "",
      index: idx + 1,
      name: first + " " + last,
      nameForServer: first + last,
      tableAddress: handleAddress(address)
    }

    convertedUsers.push(convertedUser)
  });

  return convertedUsers;
}

function handleAddress(address: string) {
  const splittedAddress = address.split(",");

  return splittedAddress[1] + "," + splittedAddress[2];
}
