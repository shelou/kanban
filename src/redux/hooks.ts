import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// While it's possible to import the RootState and AppDispatch types into each component,
// it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.
// Use throughout your redux instead of plain `useDispatch` and `useSelector`
// https://react-redux.js.org/tutorials/typescript-quick-start
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
