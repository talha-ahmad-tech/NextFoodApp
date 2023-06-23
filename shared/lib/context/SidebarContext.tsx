import { createContext } from 'react';

export const SidebarContextHandler = createContext<() => void>(() => undefined);
