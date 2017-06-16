import axios from 'axios';

function gettingData (userID) {
  return {
    type: 'GETTING_DATA',
    userID
  }
};

function gotAllConnect (results) {
  return {
    type: 'GOT_ALL_CONNECT',
    results
  }
};

function gotAllAccept (results) {
  return {
    type: 'GOT_ALL_ACCEPT',
    results
  }
};

function gotPercentMatches (results) {
  return {
    type: 'GOT_PERCENT_MATCHES',
    results
  }
};

function gotTopReason (results) {
  return {
    type: 'GOT_TOP_REASON',
    results
  }
};

function gotTopVertical (results) {
  return {
    type: 'GOT_TOP_VERTICAL',
    results
  }
};

function gotAllIndustry (results) {
  return {
    type: 'GOT_ALL_INDUSTRY',
    results
  }
};

function getDataError(getError) {
  return {
    type: 'GET_DATA_ERROR',
    getError
  }
}

export function getData (authid, config) {
  return (dispatch) => {
    dispatch(gettingData(authid));

    axios.get('http://localhost:3000/profile-user?authid='+ authid, config)
    .then( result => {
      var userID = result.data.id;
      return userID;
    })
    .then( (userID) => {
      config.params = {users_b_id: userID, status: 'accept'};

      axios.all([
        axios.get('http://localhost:3000/get-connect', config),
        axios.get('http://localhost:3000/get-connect/get-accept', config),
        axios.get('http://localhost:3000/get-connect/get-reason', config),
        axios.get('http://localhost:3000/get-connect/get-vertical', config),
        axios.get('http://localhost:3000/get-connect/get-all-industry', config)
      ])
      .then(axios.spread( (allConnect, allAccept, topReason, topVertical, allIndustry) => {
        dispatch( gotAllConnect(allConnect.data) );
        dispatch( gotAllAccept(allAccept.data) );

        var percentMatches = allAccept.data.length / allConnect.data.length;
        dispatch( gotPercentMatches(percentMatches) );

        dispatch( gotTopReason(topReason.data) );
        dispatch( gotTopVertical(topVertical.data) );
        dispatch( gotAllIndustry(allIndustry.data) );
      }))
      .catch ( error => {
        dispatch( getDataError(error) );
      })      
    })




  }
};
