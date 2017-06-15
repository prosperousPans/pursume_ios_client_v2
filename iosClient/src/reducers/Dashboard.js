const initialState = {
  gettingData: null,
  allConnect: null,
  allAccept: null,
  topReason: null,
  topVertical: null,
  getDataError: null
};

const Dashboard = (state = initialState, action) => {
  switch(action.type) {
    case 'GETTING_DATA':
      return {
        ...state,
        gettingData: true
      }
    case 'GOT_ALL_CONNECT':
      return {
        ...state,
        allConnect: action.results
      }
    case 'GOT_ALL_ACCEPT':
      return {
        ...state,
        allAccept: action.results
      }
    case 'GOT_PERCENT_MATCHES':
      return {
        ...state,
        percentMatches: action.results,
        gettingData: true        
      }  
    case 'GOT_TOP_REASON':
      return {
        ...state,
        topReason: action.results,
        gettingData: true        
      }  
    case 'GOT_TOP_VERTICAL':
      return {
        ...state,
        topVertical: action.results,
        gettingData: true        
      }                  
    case 'GET_DATA_ERROR':
      return {
        ...state,
        getDataError: action.getError,
        gettingData: false
      }
    default:
      return state;
  }
};

export default Dashboard; 