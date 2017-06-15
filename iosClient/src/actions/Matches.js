import axios from 'axios';

function gettingMatches (userID) {
  return {
    type: 'GETTING_MATCHES',
    userID
  }
};

function gotMatches (results) {
  return {
    type: 'GOT_MATCHES',
    results
  }
};

function getMatchesError(getError) {
  return {
    type: 'GET_MATCHES_ERROR',
    getError
  }
}

function getNextMatch() {
  return {
    type: 'GET_NEXT_MATCH'
  }
}

export function getMatches (authid, config) {
  return (dispatch) => {
    dispatch( gettingMatches(authid) );

    axios.get('http://localhost:3000/profile-user?authid='+ authid, config)
    .then( result => {
      var allMatches = JSON.parse(result.data.daily_all_matches);
      dispatch(gotMatches(allMatches));

      return allMatches;
    })
    .catch( error => {
      dispatch(getMatchesError(error))
    });
  }
};

export function nextMatch (userID) {
  return (dispatch) => {
    dispatch( getNextMatch() );
  }
};