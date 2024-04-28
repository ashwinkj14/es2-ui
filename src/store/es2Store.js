/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {FAILURE, displayToast} from '../components/ToastUtil';
import httpClient from '../helper/httpClient';

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
    devtools((set, get) => ({
      gridRefresh: false,
      setGridRefresh: () => {
        set((state) => ({gridRefresh: !state.gridRefresh}));
      },

      selectedRecord: null,
      setSelectedRecord: (value) => set((state) => ({selectedRecord: value})),

      presentationList: {},
      setPresentationList: (value) => set({presentationList: value}),

      presentationRequest: null,
      setPresentationRequest: (value) => set({presentationRequest: value}),

      isAddPresentation: false,
      setIsAddPresentation: (value) => set({isAddPresentation: value}),

      pageSize: 10,
      setPageSize: (size) => set({pageSize: size}),

      currentPage: 1,
      setCurrentPage: (page) => set({currentPage: page}),

      renderNoData: <></>,
      setRenderNoData: (value) => set({renderNoData: value}),

      getPresentationList: async () => {
        const {setPresentationList, presentationRequest, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          projectId: presentationRequest.project_id,
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/project/presentation/list`, {
            params: requestData,
          });

          const result = response.data;
          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setPresentationList(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      getUserPresentations: async () => {
        const {setPresentationList, presentationRequest, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          projectId: presentationRequest.project_id,
          page: currentPage,
          pageSize: pageSize,
        };
        try {
          const response = await httpClient.get(`/api/project/presentation/manage`, {
            params: requestData,
          });

          const result = response.data;
          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setPresentationList(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      resetPresentationStore: () => {
        const {setPresentationList, setSelectedRecord, setRenderNoData, setCurrentPage, setPageSize} = get();
        setPresentationList({});
        setSelectedRecord(null);
        setRenderNoData(<></>);
        setCurrentPage(1);
        setPageSize(10);
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
    devtools((set, get) => ({
      selectedTab: 'search',
      setSelectedTab: (value) => {
        set((state) => ({selectedTab: value}));
        const resetPresentationRequest = usePresentationGridStore.getState().setPresentationRequest;
        resetPresentationRequest(null);
      },

      selectedRecord: null,
      setSelectedRecord: (value) => set((state) => ({selectedRecord: value})),

      commentsProjectId: '',
      setCommentsProjectId: (value) => set({commentsProjectId: value}),

      projectList: {},
      setProjectList: (results) => set({projectList: results}),

      pageSize: 10,
      setPageSize: (size) => set({pageSize: size}),

      currentPage: 1,
      setCurrentPage: (page) => set({currentPage: page}),

      renderNoData: <></>,
      setRenderNoData: (value) => set({renderNoData: value}),

      getProjectList: async () => {
        const {setProjectList, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/project/list`, {
            params: requestData,
          });

          const result = response.data;
          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setProjectList(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      getUserProjects: async () => {
        const {setProjectList, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/project/manage`, {
            params: requestData,
          });

          const result = response.data;
          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setProjectList(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      resetProjectStore: () => {
        const {setProjectList, setCommentsProjectId, setSelectedRecord, setRenderNoData, setCurrentPage, setPageSize} = get();
        setProjectList({});
        setCommentsProjectId('');
        setSelectedRecord(null);
        setRenderNoData(<></>);
        setCurrentPage(1);
        setPageSize(10);
      },
    })),
);

export const usePublicationStore = create()(
    devtools((set, get) => ({
      searchField: '',
      setSearchField: (field) => set({searchField: field}),

      searchFromDate: '',
      setSearchFromDate: (date) => set({searchFromDate: date}),

      searchToDate: '',
      setSearchToDate: (date) => set({searchToDate: date}),

      searchType: 'title',
      setSearchType: (type) => set({searchType: type}),

      searchResults: {},
      setSearchResults: (results) => set({searchResults: results}),

      pageSize: 10,
      setPageSize: (size) => set({pageSize: size}),

      currentPage: 1,
      setCurrentPage: (page) => set({currentPage: page}),

      renderNoData: <></>,
      setRenderNoData: (value) => set({renderNoData: value}),

      handleSearch: async () => {
        const {searchField, searchFromDate, searchToDate, searchType,
          setSearchResults, setRenderNoData, pageSize, currentPage} = get();

        const requestData = {
          search: searchField,
          fromDate: searchFromDate,
          toDate: searchToDate,
          type: searchType,
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/publication/search`, {
            params: requestData,
          });

          const result = response.data;

          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setSearchResults(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        }
      },

      listPublications: async () => {
        const {setSearchResults, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/publication/list`, {
            params: requestData,
          });
          const result = response.data;

          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setSearchResults(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      resetPublicationStore: () => {
        const {setSearchField, setSearchFromDate, setSearchToDate, setSearchType,
          setSearchResults, setRenderNoData, setPageSize, setCurrentPage} = get();
        setSearchField('');
        setSearchFromDate('');
        setSearchToDate('');
        setSearchType('title');
        setSearchResults({});
        setRenderNoData(<></>);
        setPageSize(10);
        setCurrentPage(1);
      },

    })),
);


export const usePatentStore = create()(
    devtools((set, get) => ({
      searchField: '',
      setSearchField: (field) => set({searchField: field}),

      searchType: 'title',
      setSearchType: (type) => set({searchType: type}),

      searchResults: {},
      setSearchResults: (results) => set({searchResults: results}),

      pageSize: 10,
      setPageSize: (size) => set({pageSize: size}),

      currentPage: 1,
      setCurrentPage: (page) => set({currentPage: page}),

      renderNoData: <></>,
      setRenderNoData: (value) => set({renderNoData: value}),

      handleSearch: async () => {
        const {searchField, searchType,
          setSearchResults, setRenderNoData, pageSize, currentPage} = get();

        const requestData = {
          search: searchField,
          type: searchType,
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/patent/search`, {
            params: requestData,
          });

          const result = response.data;

          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setSearchResults(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        }
      },

      listPatents: async () => {
        const {setSearchResults, setRenderNoData, currentPage, pageSize} = get();
        const requestData = {
          page: currentPage,
          pageSize: pageSize,
        };

        try {
          const response = await httpClient.get(`/api/patent/list`, {
            params: requestData,
          });

          const result = response.data;
          if (result.data.length == 0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }

          setSearchResults(result);
        } catch (error) {
          displayToast('Error occurred', FAILURE);
        };
      },

      resetPatentStore: () => {
        const {setSearchField, setSearchType,
          setSearchResults, setRenderNoData, setPageSize, setCurrentPage} = get();
        setSearchField('');
        setSearchType('title');
        setSearchResults({});
        setRenderNoData(<></>);
        setPageSize(10);
        setCurrentPage(1);
      },

    })),
);
