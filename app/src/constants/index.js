import { Platform } from "react-native";

// Globle Constants

export const APP_IDENTIFIER = "Insight Analytics";

export const PACKAGE_VERSION= "2.140.1"//"2.110.0";
export const CURRENT_VERSION="2.110.5";

export const APP_ID = "com.semnox.analyticsdashboardapp"  // "com.semnox.analyticsdashboardapp"
// export const APP_VERSION="V_2.110.5"



export const PUBLIC_SERVER_IP = "https://semnoxapps.parafait.com"; //production

// export const PUBLIC_SERVER_IP_LOCAL = 'http://192.168.20.140:86';

//export const PUBLIC_SERVER_IP_LOCAL = 'https://guestappdemo.parafait.com'; //aws

export const PUBLIC_SERVER_IP_LOCAL = "https://parafaitapihqdemo.parafait.com";

// export const PUBLIC_SERVER_IP_LOCAL = 'http://192.168.43.63:85';

// export const PUBLIC_SERVER_IP_LOCAL = 'http://192.168.1.36:86';

export const REQUEST_TIMEOUT = 59000;

export const SPLASH_SCREEN_TIMEOUT = 1000;

export const DEFAULT_HEADER = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Origin: "mQ/btZP6wd74Sgd59JETzEtAkBO8QIL4KpE2pjz9hRg="
};

export const MACHINE_NAME = "CustomerApp";

export const EXTERNAL_USER = "External POS";

//Keys Used For Async Storage

export const UUID = "UUID";
export const GATEWAY_URL = "GATEWAY_URL"
export const USER_ID = "USER_ID"
export const SET_ON_CHECK="SET_ONCHECK"
export const SET_ON_CHECK_LOGIN="SET_ONCHECK_LOGIN"
export const PASSWORD = "PASSWORD"
export const CLIENT_DTO = "CLIENT_DTO"
export const DEVICE_GUID= "DEVICE_GUID"
export const IS_LOG_IN = "IS_LOG_IN"
export const USER_ID_LOGIN = "USER_ID_LOGIN"
export const PASSWORD_LOGIN = "PASSWORD_LOGIN"
export const USER_NAME="USER_NAME"
export const USER_PASSWORD="USER_PASSWORD"
export const SECURITY_CODE="SECURITY_CODE"
export const LOGIN_DATE= "CURRENT_DATE"
export const SET_AUTH="SET_AUTH"
export const LOGIN_TOKEN="LOGIN_TOKEN"
export const SET_USER_ID="SET_USER_ID"


export const SET_DB_QUERY="SET_DB_QUERY"
export const SET_REPORT_ID="SET_REPORT_ID"
export const SET_REPORT_NAME="REPORT_NAME"
export const SET_DASHBOARD="SET_DASH_BOARD"
export const SET_START_TIME="SET_START_TIME"

export const SET_GUID="SET_GUID"




// URIs

export const _URI = "ClientAppServices.asmx/GetClientInfo";

export const APP_ACCESS_URI = "CustomerApp/CustomerAppConfiguration";

export const CUSTOMER_UI_METADATA = "Customer/CustomerUIMetadata";

export const CONTACT_TYPE = "Customer/ContactType";

export const OTP_VALIDATION = "CustomerApp/OTP";

export const RESEND_OTP = "CustomerApp/ResendOTP";

export const SITES = "SiteSetup/Site";

export const SITES_URL = "Home/Sites";

export const CUSTOMER = "Customer/Customer";

export const CUSTOMER_UUID = "Customer/CustomerDeviceVerification";

export const VALIDATE_CUSTOMER = "Customer/ValidateCustomer";

export const CUSTOMER_ACCOUNTS = "Customer/Account/Accounts";



//strings

export const STR_SERVICE_CALL_NON_OK_MESSAGE = "Internal Error - ";

export const STR_ALERT_MESSAGE = "Message : ";

export const MAINTENANCE=" Maintenance"

export const BUSINESS_DAY_START_TIME="BUSINESS_DAY_START_TIME"
export const isActive ="Y"

export const SHOW_SECURITY_CODE="SHOW_SECURITY_CODE"
export const REGISTER_CLIENT="REGISTER_CLIENT"



// boolean

 export const IS_DASH_BOARD=true







export const FONT_FAMILY =
  Platform.OS === "ios" ? "HelveticaNeue" : "HelveticaNeue.ttf";


  //Text box Allert

  export const LOGIN_ID_ALERT= "Please enter loginId"
  export const PASS_WORD_ALERT= "Please enter password"
  export const SECURITY_CODE_ALERT= "Please enter security code"


//Error message

export const UNKNOWN_ERROR_MESSAGE="Oops! Something went wrong! The application has encountered an unknown error\n Please email us a screenshot of the error you are facing along with your mobile number at support@semnox.com so we can look into this for you. We apologise for any inconvenience. "
export const  DASHBOARD_NOTFOUND_ERROR="Dashboard details not found"
export const UPDATE_DASHBOARD_ERROR="Error occurred while updating dashboard "
export  const  VALID_LICENCE_ERROR="valid licence not found"

export  const  SESSION_EXPIRE_MESSAGE="Session expired please restart"


export const loginmsg= "Please enter loginId"
export const  passwordmsg= "Please enter Password"
export   const verifymsg = " Please enter verificationCode "
export const DATA_CLEAR_MESSAGE="This action will clear your data"
