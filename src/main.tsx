import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { client } from './lib/apollo.ts'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"
import { Toast } from "radix-ui"
import { Provider } from 'jotai';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Theme accentColor="grass" panelBackground="solid" radius="small">
          <Provider>
            <Toast.Provider>
              <App />
              <Toast.Viewport />
            </Toast.Provider>
          </Provider>
      </Theme>
    </StrictMode>
  </ApolloProvider>
);