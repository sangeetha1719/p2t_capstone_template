import { create } from 'zustand';
import { categorySlice } from './categorySlice';
import { userSlice } from './userSlice';
import { cartSlice } from './cartSlice';

const useStore = create((...set) => ({
    ...categorySlice(...set),
    ...userSlice(...set),
    ...cartSlice(...set),
}));

export default useStore;
