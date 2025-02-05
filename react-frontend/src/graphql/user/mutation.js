import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation LoginUser($loginInfo: LoginInput!) {
    loginUser(loginInfo: $loginInfo) {
        id
        authToken
        email
        firstName
        fullName
        lastName
    }
  }
`;
