import { gql } from '@apollo/client';

export const CREATE_USER_INFO = gql`
  mutation CreateUserInfo($input: UserInfoInput!) {
    createUserInfo(input: $input) {
      id
      fullName
      phone
      address
      maxBorrowBooks
      createdAt
      updatedAt
    }
  }
`;