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

function sliceOldMatch() {
  return {
    type: 'SLIDE_OLD_MATCH'
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

export function nextMatch (authid, config) {
  return (dispatch) => {
    dispatch( getNextMatch() );
      console.log(authid, config, 'authid, config outside')

    axios.get('http://localhost:3000/profile-user?authid='+ authid, config)
    .then( result => {
      var id = result.data.id;
      var allMatches = JSON.parse(result.data.daily_all_matches);
      allMatches.shift();
      return {slicedMatches: allMatches, id:id};
    })
    .then( ({slicedMatches, id}) => {
      var slicedMatches = JSON.stringify(slicedMatches)
      axios.post('http://localhost:3000/insert-connection/slice-match', {
        id: id,
        daily_all_matches: slicedMatches
      }, config)
      .then( result => {
        dispatch( sliceOldMatch() );
      })
    })
    .catch( error => {
      dispatch(getMatchesError(error))
    });

  }
};