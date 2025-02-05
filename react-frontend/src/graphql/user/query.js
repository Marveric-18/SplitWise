import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUserByEmail {
    fetchUser {
      email
      fullName
      groups {
        group_id
      }
      adminGroups {
        group_id
      }
    }
  }
`;
