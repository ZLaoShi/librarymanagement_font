import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query GetAccounts($page: Int, $size: Int, $orderBy: String) {
    accounts(page: $page, size: $size, orderBy: $orderBy) {
      content {
        id
        username
        email
        createdAt
        lastLogin
        status
      }
      pageInfo {
        currentPage
        pageSize
        totalPages
        totalElements
        hasNext
      }
    }
  }
`;