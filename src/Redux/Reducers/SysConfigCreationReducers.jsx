import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const sysconfigcreationReducers = (state = initialState, action) => {

  switch (action.type) {      
    case actions.POST_SYSCONFIGCREATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };
    
    case actions.POST_SYSCONFIGCREATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: true,
      };
    case actions.POST_SYSCONFIGCREATION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      }; 
      case actions.GET_GLPRIMARY_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          message: "",
          isSuccess: false,
        };
      
      case actions.GET_GLPRIMARY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          message: action.payload?.Data?.message,
          isSuccess: true,
        };
      case actions.GET_GLPRIMARY_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload?.Data?.message,
          isSuccess: false,
        };     
    default:
      return { ...state };
  }
};

export default sysconfigcreationReducers;
