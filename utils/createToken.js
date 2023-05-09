import jwt from "jsonwebtoken";
export const createToken = (data, exp) => {
  const token = jwt.sign( data , "abcdefg", {
    expiresIn: exp,
  });
  return token;
};
