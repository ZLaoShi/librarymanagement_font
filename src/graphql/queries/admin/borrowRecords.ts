import { gql } from '@apollo/client';

export const GET_ALL_BORROW_RECORDS = gql`
  query GetAllBorrowRecords($page: Int, $size: Int) {
    borrowRecords(page: $page, size: $size) {
      content {
        id
        userInfo {
          id
          fullName
          phone
        }
        book {
          id
          title
          author
          isbn
        }
        borrowDate
        dueDate
        returnDate
        status
        remarks
        createdAt
        updatedAt
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