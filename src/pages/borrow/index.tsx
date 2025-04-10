import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Card, Flex, Text, Button } from '@radix-ui/themes';
import { Toast } from 'radix-ui'
import { GET_MY_BORROW_RECORDS } from '../../graphql/queries/borrowRecordList';
import { RETURN_BOOK } from '../../graphql/mutations/borrowRecord';
import { BorrowRecordList } from '../../components/borrow/borrowRecordList';
import { BorrowRecord } from '../../types/borrowRecord';
import './index.scss';

interface BorrowRecordsData {
  myBorrowRecords: {
    content: BorrowRecord[];
    pageInfo: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalElements: number;
      hasNext: boolean;
    };
  };
}

export const BorrowPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const { loading, error, data, refetch } = useQuery<BorrowRecordsData>(GET_MY_BORROW_RECORDS, {
    variables: { page: currentPage, size: pageSize },
    fetchPolicy: 'network-only'
  });

  const [returnBook, { loading: returningBook }] = useMutation(RETURN_BOOK, {
    onCompleted: (data) => {
      setIsSuccess(true);
      setToastMessage(`《${data.returnBook.book.title}》归还成功！`);
      setToastOpen(true);
      refetch();
    },
    onError: (error) => {
      setIsSuccess(false);
      setToastMessage(`归还失败: ${error.message}`);
      setToastOpen(true);
      console.error('归还失败详情:', error);
    }
  });

  const handleReturn = async (recordId: string) => {
    try {
      await returnBook({
        variables: {
          input: {
            recordId
          }
        }
      });
    } catch (error) {
      // 已在 onError 回调中处理错误
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const borrowRecords = data?.myBorrowRecords?.content || [];
  const totalPages = data?.myBorrowRecords?.pageInfo?.totalPages || 1;

  return (
    <Box className="borrow-page">
      <Toast.Root 
        open={toastOpen} 
        onOpenChange={setToastOpen}
        type="foreground"
        className={isSuccess ? 'success-toast' : 'error-toast'}
      >
        <Toast.Title>{isSuccess ? '操作成功' : '操作失败'}</Toast.Title>
        <Toast.Description>{toastMessage}</Toast.Description>
        <Toast.Close />
      </Toast.Root>

      <Card>
        <Flex direction="column" gap="4" p="4">
          <Flex justify="between" align="center">
            <Text size="6" weight="bold">我的借阅</Text>
            <Button onClick={() => refetch()} disabled={loading}>
              刷新
            </Button>
          </Flex>
          
          {loading ? (
            <Flex justify="center" p="4">
              <Text>加载中...</Text>
            </Flex>
          ) : error ? (
            <Flex justify="center" p="4" direction="column" align="center" gap="2">
              <Text color="red">加载失败: {error.message}</Text>
              <Button onClick={() => refetch()}>重试</Button>
            </Flex>
          ) : (
            <>
              <BorrowRecordList 
                records={borrowRecords} 
                onReturn={handleReturn}
                loading={returningBook}
              />
              
              {totalPages > 1 && (
                <Flex justify="center" gap="2" mt="4" className="pagination">
                  <Button 
                    variant="soft" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    上一页
                  </Button>
                  
                  <Flex gap="1" align="center">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const start = Math.max(1, currentPage - 2);
                      const end = Math.min(totalPages, start + 4);
                      return start + i <= end ? start + i : null;
                    })
                    .filter(Boolean)
                    .map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "solid" : "soft"}
                        onClick={() => handlePageChange(page!)}
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
              )}
            </>
          )}
        </Flex>
      </Card>
    </Box>
  );
};