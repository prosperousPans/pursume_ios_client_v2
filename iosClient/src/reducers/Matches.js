const initialState = {
  gettingMatches: null,
  allMatches: null,
  currentMatch: null,
  // professionalExp: null,
  // educationExp: null,
  // projectExp: null,
  getMatchesError: null
};

const Matches = (state = initialState, action) => {
  switch(action.type) {
    case 'GETTING_MATCHES':
      return {
        ...state,
        gettingMatches: true
      }
    case 'GOT_MATCHES':
      return {
        ...state,
        allMatches: action.results,
        currentMatch: action.results[0],
        gettingMatches: false
      }

    //case for slicing a copy of the allMatches array - after submitting response
    case 'GET_NEXT_MATCH': {
      const newMatches = state.allMatches.slice(1);
      
      return {
        allMatches: newMatches,
        currentMatch: newMatches[0]
      }
    }
                     
    case 'GET_MATCHES_ERROR':
      return {
        ...state,
        getMatchesError: action.getError,
        gettingMatches: false
      }
    default:
      return state;
  }
};

export default Matches; 