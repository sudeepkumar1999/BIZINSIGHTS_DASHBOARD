export const FETCH_CLIENT_DETAIL = "FETCH_CLIENT_DETAIL"
const REQUEST = '_REQUEST';
const SUCCESS = '_SUCCESS';
const FAILURE = '_FAILURE';
export const SET_CLIENT_GATEWAY = "SET_CLIENT_GATEWAY";
export const CLEAR_CLIENT = "CLEAR_CLIENT"
// export const SET_TOKEN="SET_TOKEN"

//client action
export const FETCH_CLIENT_DETAILS = "FETCH_CLIENT_DETAILS"
export const FETCH_CLIENT_DETAILS_REQUEST = FETCH_CLIENT_DETAILS + REQUEST;
export const FETCH_CLIENT_DETAILS_SUCCESS = FETCH_CLIENT_DETAILS + SUCCESS;
export const FETCH_CLIENT_DETAILS_FAILURE = FETCH_CLIENT_DETAILS + FAILURE;

//user action

//Authenticate
const AUTHENTICATE_CLIENT_DETAILS = "AUTHENTICATE_CLIENT_DETAILS"
export const AUTHENTICATE_CLIENT_DETAILS_REQUEST = AUTHENTICATE_CLIENT_DETAILS + REQUEST;
export const AUTHENTICATE_CLIENT_DETAILS_SUCCESS = AUTHENTICATE_CLIENT_DETAILS + SUCCESS;
export const AUTHENTICATE_CLIENT_DETAILS_FAILURE = AUTHENTICATE_CLIENT_DETAILS + FAILURE;
export const SET_LOGIN_ID = "SET_LOGIN_ID"
export const SET_CHECKED = "SET_CHECKED"
export const SET_PASSWORD = "SET_PASSWORD"

//Register

const REGISTER_CLIENT_DETAILS = "REGISTER_CLIENT_DETAILS"
export const REGISTER_CLIENT_DETAILS_REQUEST = REGISTER_CLIENT_DETAILS + REQUEST;
export const REGISTER_CLIENT_DETAILS_SUCCESS = REGISTER_CLIENT_DETAILS + SUCCESS;
export const REGISTER_CLIENT_DETAILS_FAILURE = REGISTER_CLIENT_DETAILS + FAILURE;

//Authenticate
const FETCH_CLIENT_APP_DETAILS = " FETCH_CLIENT_APP_DETAILS"
export const FETCH_CLIENT_APP_DETAILS_REQUEST = FETCH_CLIENT_APP_DETAILS + REQUEST
export const FETCH_CLIENT_APP_DETAILS_SUCCESS = FETCH_CLIENT_APP_DETAILS + SUCCESS
export const FETCH_CLIENT_APP_DETAILS_FAILURE = FETCH_CLIENT_APP_DETAILS + FAILURE

//Login
const LOGIN_CLIENT_DETAILS = "LOGIN_CLIENT_DETAILS"
export const LOGIN_CLIENT_DETAILS_REQUEST = LOGIN_CLIENT_DETAILS + REQUEST;
export const LOGIN_CLIENT_DETAILS_SUCCESS = LOGIN_CLIENT_DETAILS + SUCCESS;
export const LOGIN_CLIENT_DETAILS_FAILURE = LOGIN_CLIENT_DETAILS + FAILURE;
// export const SET_SECURITY_CODE="SAVE_SECURITY_CODE"

//dashboard actoins
const FETCH_DASHBOARD_DETAILS = "FETCH_DASHBOARD_DETAILS"
export const FETCH_DASHBOARD_DETAILS_REQUEST = FETCH_DASHBOARD_DETAILS + REQUEST
export const FETCH_DASHBOARD_DETAILS_SUCCESS = FETCH_DASHBOARD_DETAILS + SUCCESS
export const FETCH_DASHBOARD_DETAILS_FAILURE = FETCH_DASHBOARD_DETAILS + FAILURE
export const FETCH_START_TIME = "FETCH_START_TIME"
export const SET_GUID = "SET_GUID"
export const SET_REPORT_ID = "SET_REPORT_ID"
export const SET_DB_QUERY = "SET_DB_QUERY"
export const SET_REPORT_NAME = "SET_REPORT_NAME"

export const STORE_REPORT_ID = "STORE_REPORT_ID"
export const STORE_DB_QUERY = "STORE_DB_QUERY"
export const FETCH_SALES_DASHBOARD="FETCH_SALES_DASHBOARD"

export const FETCH_START_TIME_REQUEST = FETCH_START_TIME + REQUEST
export const FETCH_START_TIME_SUCCESS = FETCH_START_TIME + SUCCESS
export const FETCH_START_TIME_FAILURE = FETCH_START_TIME + FAILURE

export const FETCH_SALES_DASHBOARD_REQUEST=FETCH_SALES_DASHBOARD + REQUEST
export const FETCH_SALES_DASHBOARD_SUCCESS=FETCH_SALES_DASHBOARD + SUCCESS
export const FETCH_SALES_DASHBOARD_FAILURE=FETCH_SALES_DASHBOARD + FAILURE

export const FETCH_TOKEN = "FETCH_TOKEN"
export const FETCH_TOKEN_REQUEST = FETCH_TOKEN + REQUEST
export const FETCH_TOKEN_SUCCESS = FETCH_TOKEN + SUCCESS
export const FETCH_TOKEN_FAILURE = FETCH_TOKEN + FAILURE
// handle error 
export const HANDLE_ERROR_SUCCESS = ' HANDLE_ERROR_SUCCESS    '

export const SET_WEB_VIEW_URL = 'SET_WEB_VIEW_URL'
export const UPDATE_REQUIRED="UPDATED_REQUIRED"



//device info reducer
export const SET_UUID = 'SET_UUID';
export const SET_TOKEN = 'SET_TOKEN'
export const SET_ERROR_CODE = 'SET_ERROR_CODE';

const FETCH_APP_VALIDITY = "FETCH_APP_VALIDITY"
export const SET_LAST_USED_TIME = "SET_LAST_USED_TIME";
export const FETCH_APP_VALIDITY_SUCCESS = FETCH_APP_VALIDITY + SUCCESS;

const SIGN_OUT_USER = " SIGN_OUT_USER "
export const SIGN_OUT_USER_REQUEST = SIGN_OUT_USER + REQUEST
export const SIGN_OUT_USER_SUCESS = SIGN_OUT_USER + SUCCESS
export const SIGN_OUT_USER_FAILURE = SIGN_OUT_USER + FAILURE

const FETCH_TABLEU_URL = "FETCH_TABLEU_URL"
export const FETCH_TABLEU_URL_REQUEST = FETCH_TABLEU_URL + REQUEST
export const FETCH_TABLEU_URL_SUCCESS = FETCH_TABLEU_URL + SUCCESS

export const SET_TOKEN_FOR_FAILURE = "  SET_TOKEN_FOR_FAILURE"

export const RESET_UI = "RESET_UI"
export const CLEAR_TOKEN = "CLEAR_TOKEN"

export const SET_USER_ID = "SET_USER_ID"
export const SET_USER_PASSWORD = "SET_USER_PASSWORD"
export const SET_SECURITY_CODE = "SET_SECURITY_CODE"
export const HIDE_SECURITY_CODE="HIDE_SECURITY_CODE"

export const SET_DEPRECATED="SET_DEPRECATED"

