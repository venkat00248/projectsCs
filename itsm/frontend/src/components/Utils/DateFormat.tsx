import moment from "moment";
export const DateFormat = (inputdate: any, isConvert:boolean = true) => {
    // console.log(`date format :: ${inputdate}, isSupportUnixFormat :; ${isConvert}`)
    if (inputdate) {
        const unixTimestamp = isConvert ? moment.unix(inputdate) : inputdate;
        return moment(unixTimestamp).format(
            "Do MMM YYYY h:mm A");
    }
    else {
        return inputdate;
    }
}
export const DateFormatForWF = (inputdate: any) => {
  // console.log(`date format :: ${inputdate}, isSupportUnixFormat :; ${isConvert}`)
  if (inputdate) {
      return moment(inputdate).format(
          "Do MMM YYYY");
  }
  else {
      return "";
  }
}

export const DateFormatView = (inputdate: any) => {
  if (inputdate) {
    const now = moment();
    const duration = moment.duration(now.diff(moment(inputdate)));
    const hours = Math.floor(duration.asHours());
    const minutes = moment.utc(duration.asMilliseconds()).format('mm');
    const seconds = moment.utc(duration.asMilliseconds()).format('ss');
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return inputdate;
  }
};

export const DateLastActivity=(inputdate:any)=>{
    // console.log("inputttttt",inputdate,typeof(inputdate))
if(inputdate){
   return moment(inputdate, "YYYY-MM-DD HH:mm:ss").format(
        "Do MMMM YYYY h:mm:ss");
   }
   else{
    return inputdate;
   }
}

export const convertUnixToJSDate = (timestamp: any) => {
    const unix_timestamp = timestamp
    // console.log(timestamp)
    const date = new Date(unix_timestamp * 1000);
    // console.log(`convertUnixToJSDate :: `, date)
    return DateFormat(date);
}
  
  
