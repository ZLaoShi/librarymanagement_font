import { atom } from 'jotai';
import { parseJwt } from '../utils/jwt';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  userId: string | null;
  isAdmin: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  let userId = null;
  let isAdmin = false;
  
  if (token) {
    const decoded = parseJwt(token);
    userId = decoded?.sub || null;
    isAdmin = decoded?.role === '1'; // 从 JWT 中解析角色信息
  }

  return {
    isAuthenticated: !!token,
    username,
    token,
    userId,
    isAdmin
  };
};

export const authAtom = atom<AuthState>(getInitialState());

// 添加一个派生 atom 用于角色检查
export const isAdminAtom = atom((get) => get(authAtom).isAdmin);