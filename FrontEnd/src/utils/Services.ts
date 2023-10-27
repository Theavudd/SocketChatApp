import axios from 'axios';
import ScreenNames from './ScreenNames';
import {Platform} from 'react-native';
import CommonFunction from './CommonFunctions';
import {store} from '../redux/store';
import {navigationRef} from './navigationSevices';
import Config from 'react-native-config';

const isAndroid = Platform.OS === 'android';
const PlatformNumber = isAndroid ? 0 : 1;
const ENV_DATA = {
  BASE_URL: Config.BASE_URL,
};

const deviceId = CommonFunction.getDeviceDetail();

const devicedetail = {
  deviceId:
    typeof deviceId === 'object'
      ? 'not available'
      : deviceId || 'not available',
  deviceToken: '',
  deviceType: Platform.OS === 'android' ? 0 : 1,
};

/**
 * create axios instance
 */
const $http = axios.create({
  baseURL: ENV_DATA.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    offset: `${new Date().getTimezoneOffset()}`,
    basicauth: `basic Zml2ZXN0YXI6WHp5cyV7Sk5edzlBc0M=`,
  },
});

/**
 * check error message from response and show message according to screen
 */
// $http.interceptors.response.use(
//   (config: any) => config,
//   (error: any) => {
//     if (
//       error?.message?.includes('403') ||
//       error?.message?.includes('401') || //Session expire
//       error?.message?.includes('498')
//     ) {
//       const route = navigationRef.current?.getCurrentRoute().name;

//       if (
//         route !== ScreenNames.SignIn &&
//         route !== ScreenNames.ForgotPassword &&
//         route !== ScreenNames.SignUp &&
//         route !== ScreenNames.FINDACCOUNT &&
//         route !== ScreenNames.ForgotPassword
//       ) {
//         handleApiError();
//       } else {
//         if (
//           !error?.message?.includes('401') &&
//           !error?.message?.includes('498')
//         )
//           commonFunction.showSnackbar(error?.response?.data?.message);
//       }
//     } else {
//       commonFunction.showSnackbar(error?.response?.data?.message);
//     }
//     return error as unknown;
//   },
// );

/**
 * navigate to session expiry screen if error occurs
 */
// const handleApiError = () => {
//   navigationRef.current.navigate(ScreenNames.SessionExpiry);
// };

// /**
//  * add auth token and other details using request interceptors
//  */
// $http.interceptors.request.use(
//   (req: any) => {
//     if (req?.headers) {
//       const getState = store?.getState();
//       if (getState) {
//         const {authToken = '', pushToken = ''} = getState.Auth;

//         if (pushToken && pushToken.length > 0) {
//           //@ts-ignore
//           $http.defaults.headers['devicedetails'] = JSON.stringify({
//             ...devicedetail,
//             ...{deviceToken: pushToken},
//           });
//         }

//         if (authToken && authToken.length > 0) {
//           $http.defaults.headers.common.Authorization = `Bearer ${authToken}`;
//         }
//       }
//     }
//     return req as unknown;
//   },
//   (err: any) => {
//     return err as unknown;
//   },
// );

/**
 * user to set auth token in headers
 * @param token auth token
 * @param _
 */
const setAuthorizationToken = (token: string) => {
  if (token) {
    $http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete $http.defaults.headers.common.devicedetails;
  }
};

let status_code = {
  success: 200,
  successAction: 201,
  notFound: 204,
  badRequest: 400,
  Unauthorized: 401,
  invalid: 400,
  timeout: 408,
  userDelete: 410,
  serverError: 500,
};

/**
 * post api call common function
 * @param endPoint endpoint of api
 * @param params data to send
 * @param successCallback called after success
 * @param errorCallback called after error
 */
const postApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  $http
    .post(endPoint, params)
    .then((response: any) => {
      if (
        (response && response?.status === 200) ||
        (response && response?.data?.status === 200)
      ) {
        successCallback(response?.data);
      } else {
        if (response?.response?.status === 400) {
          successCallback(response?.response?.data);
        }
        successCallback(response?.data);
      }
    })
    .catch((error: any) => {
      console.log('config', Config);
      console.log('error', error);
      errorCallback && errorCallback(error?.response);
    });
};

/**
 * put api call common function
 * @param endPoint endpoint of api
 * @param params data to send
 * @param successCallback called after success
 * @param errorCallback called after error
 */
const putApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  $http
    .put(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error?.response);
    });
};

/**
 * get api call common function
 * @param endPoint endpoint of api
 * @param paramsData data to send
 * @param successCallback called after success
 * @param errorCallback called after error
 */
const getApiCall = (
  endPoint: string,
  paramsData = '',
  successCallback: Function,
  errorCallback: Function,
) => {
  $http
    .get(endPoint + paramsData, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error?.response);
    });
};

/**
 * patch api call common function
 * @param endPoint endpoint of api
 * @param params data to send
 * @param successCallback called after success
 * @param errorCallback called after error
 */
const patchApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  $http
    .patch(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error?.response);
    });
};

/**
 * delete api call common function
 * @param endPoint endpoint of api
 * @param paramsData data to send
 * @param successCallback called after success
 * @param errorCallback called after error
 */
const deleteApiCall = (
  endPoint: string,
  paramsData = '',
  successCallback: Function,
  errorCallback: Function,
) => {
  $http
    .delete(endPoint + paramsData, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error?.response);
    });
};

export default {
  postApiCall,
  getApiCall,
  patchApiCall,
  putApiCall,
  deleteApiCall,
  //   handleApiError,
  isAndroid,
  setAuthorizationToken,
  PlatformNumber,
  status_code,
  $http,
};
