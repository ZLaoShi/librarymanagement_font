import { useState } from 'react';
import { useAtom } from 'jotai';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes';
import { LOGIN } from '../../graphql/mutations/auth';
import { loginAction } from '../../stores/authActions';


export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [,login] = useAtom(loginAction);
  // 获取用户之前尝试访问的页面
  const from = location.state?.from?.pathname || "/";
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      // 使用 action 来更新状态
      login({
        token: data.login.token,
        username: data.login.username
      });
      // 登录成功后导航到原来想访问的页面
      navigate(from, { replace: true });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('请填写用户名和密码');
      return;
    }
    
    try { 
      await loginMutation({
        variables: {
          username,
          password,
        },
      });
    } catch (err) {
      // GraphQL 错误已在 onError 中处理
    }
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Card size="3" style={{ width: '100%', maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4" p="4">
            <Text size="5" weight="bold" align="center">登录</Text>
            
            <Box>
              <TextField.Root
                  placeholder="用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                >
              </TextField.Root>
            </Box>

            <Box>
              <TextField.Root 
                  type="password"
                  placeholder="密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              >
              </TextField.Root>
            </Box>

            {error && (
              <Text color="red" size="2">
                {error}
              </Text>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};