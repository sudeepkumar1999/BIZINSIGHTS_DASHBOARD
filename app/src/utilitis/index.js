import React from 'react'
import {store} from '../../index'
//import  Utf8 from 'crypto-js/enc-utf8'
const CryptoJS = require('crypto-js');
import sha1 from 'crypto-js/sha1';
import Base64 from 'crypto-js/enc-base64';

export const generateDate=()=>
{
    let date= new Date();
    let dateISO = date.toISOString().split('.')[0]+"Z";
    //console.log( now.toISOString().split('.')[0]+"Z" );
    console.log("date in iso"+ dateISO)
    return dateISO
}

export const generateHashCode=(appId, securityCode,generateTime)=> 
{
     let myString=(appId+securityCode+generateTime)
   
     let encodedWord = CryptoJS.enc.Utf8.parse(myString);
     let hashDigest = sha1(encodedWord);
     let  hmacDigest = Base64.stringify(hashDigest);
    
    return hmacDigest;

    

   
}

export function generateUUID() {
    const uuid = require("uuid/v1");
    const id = uuid();
    return id;
  }

export function fetchBusinessDate()
{
const moment = require('moment');
let currDate = new Date();
let currTime = parseInt(moment(currDate).format('HH'));
let businessStartTime=parseInt(store.getState().dashboard.startTime??6);
 
 if(currTime<businessStartTime) 
 currDate.setDate(currDate.getDate() - 1);
 
 console.log("currant date " + currDate);

 let formatedDate = moment(currDate).format('YYYY-MM-DD');
 let formatedTime= moment(currDate).format('hh:mm'); // 
 return {formatedDate, formatedTime}
 

}