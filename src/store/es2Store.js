import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export const useUserStore = create()(
    devtools((set) => ({
      userTypeId: 0,
      setUserTypeId: (value) => {
        set((state) => ({userTypeId: value}));
      },
    })),
);

export const useGridStore = create()(
    devtools((set) => ({
      gridRefresh: false,
      setGridRefresh: () => {
        set((state) => ({gridRefresh: !state.gridRefresh}));
      },
    })),
);

export const usePublicationGridStore = create()(
    devtools((set) => ({
      gridRefresh: false,
      setGridRefresh: () => {
        set((state) => ({gridRefresh: !state.gridRefresh}));
      },
    })),
);


export const usePatentNavigation = create()(
    devtools((set) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => {
        set((state) => ({selectedTab: value}));
      },
    })),
);

export const usePublicationNavigation = create()(
    devtools((set) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => {
        set((state) => ({selectedTab: value}));
      },
    })),
);

export const useProjectNavigation = create()(
    devtools((set) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => {
        set((state) => ({selectedTab: value}));
      },
    })),
);

export const usePresentationNavigation = create()(
    devtools((set) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => {
        set((state) => ({selectedTab: value}));
      },
    })),
);
