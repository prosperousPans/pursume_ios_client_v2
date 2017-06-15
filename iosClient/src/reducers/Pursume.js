const initialState = {
  sendingResponse: null,
  sendingResponse: null,
  matchStatus: null
};

const Pursume = (state = initialState, action) => {
  switch(action.type) {
    case 'SENDING_RESPONSE':
      return {
        ...state,
        sendingResponse: true        
      }
    case 'SENT_RESPONSE':
      return {
        ...state,
        matchStatus: action.matchStatus
      }
    case 'SEND_RESPONSE_ERROR':
      return {
        ...state,
        sendResponseError: action.getError,
        sendingResponse: false
      }
    default:
      return state;
  }
};

export default Pursume; 