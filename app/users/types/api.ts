export type RandomUserResult = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { medium: string };
  location: { city: string; country: string };
};

export type RandomUserResponse = {
  results: RandomUserResult[];
};
