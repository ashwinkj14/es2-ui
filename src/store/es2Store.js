/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {useNavigate} from 'react-router-dom';
import {FAILURE, displayToast} from '../components/ToastUtil';
import {BASE_URL} from '../server-constants';

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
        const api = BASE_URL+`/publication/search`;

        const requestData = {
          search: searchField,
          fromDate: searchFromDate,
          toDate: searchToDate,
          type: searchType,
          page: currentPage,
          pageSize: pageSize,
        };

        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(api, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
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
          if (error.response && error.response.status == 401) {
            localStorage.removeItem('token');
            useNavigate('/');
          }
          displayToast('Error occurred', FAILURE);
        }
      },

      listPublications: async () => {
        const {setSearchResults, setRenderNoData, currentPage, pageSize} = get();
        const api = BASE_URL+`/publication/list`;
        const token = localStorage.getItem('token');

        try {
          const requestData = {
            page: currentPage,
            pageSize: pageSize,
          };
          const response = await axios.get(api, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
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
          if (error.response && error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
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
        const api = BASE_URL+`/patent/search`;

        const requestData = {
          search: searchField,
          type: searchType,
          page: currentPage,
          pageSize: pageSize,
        };

        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(api, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
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
          if (error.response && error.response.status == 401) {
            localStorage.removeItem('token');
            useNavigate('/');
          }
          displayToast('Error occurred', FAILURE);
        }
      },

      listPatents: async () => {
        const {setSearchResults, setRenderNoData, currentPage, pageSize} = get();
        const api = BASE_URL+`/patent/list`;
        const token = localStorage.getItem('token');

        try {
          const requestData = {
            page: currentPage,
            pageSize: pageSize,
          };
          const response = await axios.get(api, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
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
          if (error.response && error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
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
