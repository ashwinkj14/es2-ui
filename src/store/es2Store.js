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

export const usePresentationGridStore = create()(
    devtools((set) => ({
      gridRefresh: false,
      setGridRefresh: () => {
        set((state) => ({gridRefresh: !state.gridRefresh}));
      },

      selectedRecord: null,
      setSelectedRecord: (value) => set((state) => ({selectedRecord: value})),

      presentationList: '',
      setPresentationList: (value) => set({presentationList: value}),

      presentationRequest: null,
      setPresentationRequest: (value) => set({presentationRequest: value}),

      isAddPresentation: false,
      setIsAddPresentation: (value) => set({isAddPresentation: value}),
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

// export const useProjectNavigation = create()(
//     devtools((set) => ({
//       selectedTab: 'search',
//       setSelectedTab: (value) => {
//         set((state) => ({selectedTab: value}));
//       },
//     })),
// );

// export const usePresentationNavigation = create()(
//     devtools((set) => ({
//       selectedTab: 'search',
//       setSelectedTab: (value) => {
//         set((state) => ({selectedTab: value}));
//       },
//     })),
// );

export const useProjectGridStore = create()(
    devtools((set) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => set((state) => ({selectedTab: value})),

      selectedRecord: null,
      setSelectedRecord: (value) => set((state) => ({selectedRecord: value})),

      projectList: '',
      setProjectList: (value) => set({projectList: value}),

      commentsProjectId: '',
      setCommentsProjectId: (value) => set({commentsProjectId: value}),
    })),
);


