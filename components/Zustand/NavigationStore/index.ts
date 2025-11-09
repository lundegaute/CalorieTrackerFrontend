import { create } from 'zustand';

interface NavigationState {
  isNavigating: boolean;
  navigationTarget: string | null;
  startNavigation: (target: string) => void;
  stopNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isNavigating: false,
  navigationTarget: null,
  startNavigation: (target: string) => set({ isNavigating: true, navigationTarget: target }),
  stopNavigation: () => set({ isNavigating: false, navigationTarget: null }),
}));