'use client';

import { create } from 'zustand';

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  setSearch: (v: boolean) => void;
  setMobileMenu: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
  setSearch: (v) => set({ searchOpen: v }),
  setMobileMenu: (v) => set({ mobileMenuOpen: v }),
}));
