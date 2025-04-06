import { Flex, Text, Button, Card, Badge } from "@radix-ui/themes";
import './bookCard.scss'; 
import { Book } from '../../types/book';

type BookCardProps = Book;

export const BookCard = ({ 
  title, 
  author, 
  isbn, 
  publishDate, 
  publisher, 
  availableCopies,
  totalCopies,
  category,
  id 
}: BookCardProps) => {
  return (
    <Card className="book-card">
      <Flex direction="column" gap="2">
        <Flex justify="between" align="center">
          <Text size="5" weight="bold">{title}</Text>
          <Badge color={availableCopies > 0 ? "green" : "red"}>
            {availableCopies > 0 ? "可借阅" : "已借完"}
          </Badge>
        </Flex>
        
        <Flex direction="column" gap="1">
          <Text>作者: {author}</Text>
          <Text>ISBN: {isbn}</Text>
          <Text>出版社: {publisher}</Text>
          <Text>出版日期: {new Date(publishDate).toLocaleDateString()}</Text>
          <Text>分类: {category}</Text>
          <Text>可借数量: {availableCopies}/{totalCopies}</Text>
        </Flex>

        <Button 
          variant="solid" 
          disabled={availableCopies === 0}
          onClick={() => {/* TODO: 跳转到详情页 */}}
        >
          查看详情
        </Button>
      </Flex>
    </Card>
  );
};