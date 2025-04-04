import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/books';
import { BookCard } from '../../components/book/BookCard';
import { Book } from '../../types/book';
import { Button, Flex } from '@radix-ui/themes';
import './index.scss';
import { useState } from 'react';

interface BooksResponse {
  books: {
    content: Book[];
    pageInfo: {
      totalPages: number;
      hasNext: boolean;
    };
  };
}

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery<BooksResponse>(GET_BOOKS, {
    variables: {
      page: currentPage,
      size: 10
    }
  });

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  const totalPages = data?.books.pageInfo.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-container">
      <h1 className="page-title">图书列表</h1>
      <div className="book-list">
        {data?.books.content.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      
      <Flex className="pagination" justify="center" gap="2" mt="4">
        <Button 
          variant="soft" 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          上一页
        </Button>
        
        <Flex gap="1" align="center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "solid" : "soft"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </Flex>

        <Button 
          variant="soft"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          下一页
        </Button>
      </Flex>
    </div>
  );
};