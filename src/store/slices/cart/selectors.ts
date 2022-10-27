import { RootState } from "../..";

export const cartSelector = (state: RootState) => state.cart;
// export const cartSelectorItems = (state) => state.cart.items.find((obj) => obj.id === id);
export const cartSelectorItems = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);