const country_list = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  GBP: "GB",
  GEL: "GE",
  GHS: "GH",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MUR: "MU",
  MVR: "MV",
  MXN: "MX",
  MYR: "MY",
  NGN: "NG",
  NIO: "NI",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TRY: "TR",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
//selection of required elements through dom and css selectors.
const fromSelector=document.getElementById("from-selector")
const toSelector=document.getElementById("to-selector")
const fromCountryImg=document.getElementById("from-country-img")
const toCountryImg = document.getElementById("to-country-img");
const getExchangeButton=document.querySelector(".get-exchange")
const errorMessage=document.querySelector(".error-message")
const finalMessage=document.querySelector(".final-message")
// to generate code to provide all options in list dynamically
for (let currencyCode in country_list){
     let optionTag=document.createElement("option");
     optionTag.innerText=currencyCode
     optionTag.value=currencyCode
     
     fromSelector.appendChild(optionTag);
     toSelector.appendChild(optionTag.cloneNode(true)); //copy and append to another selector because it's a single brick,a single brick cannot be used in two different walls at the same time
}
//currency variables for getting flags, to include in fetch url and get exchange rate.
let baseCurrency=fromSelector.value
let targetCurrency = toSelector.value; //default selected values
// amount input field
let amountEnteredInput=document.querySelector("#amount-entered")
//event handling
amountEnteredInput.addEventListener('click',()=>{
  errorMessage.innerText=''
  finalMessage.innerHTML=''
})
//to get flags based in selected currency from flag API.
fromSelector.addEventListener('change',()=>{
     baseCurrency=fromSelector.value
    fromCountryImg.src = `https://flagsapi.com/${country_list[baseCurrency]}/flat/64.png`; 
    // with .countryName JS searches for the key named "countryName" which does not exist
})

toSelector.addEventListener("change", () => {
   targetCurrency = toSelector.value;
  toCountryImg.src = `https://flagsapi.com/${country_list[targetCurrency]}/flat/64.png`; // with .countryName JS searches for the key named "countryName" which does not exist
});
// an async fn to work with fetch API,promises and response objects. and updating webpage using dom accordingly.
async function getExchangeRate(params) {
      let promise = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`
      );
      
      let data= await promise.json()
      if (promise.status != 200) { // if api's response is unsuccessful
        finalMessage.innerText = data.message;
      } else{
            ratesPair = data["rates"];
            exchangeRate = ratesPair[targetCurrency];
            let answer = exchangeRate * amountEntered;
            //final msg display if successful
            finalMessage.innerText=`${amountEntered}${baseCurrency} => ${answer}${targetCurrency}`
      }
      
     
      
      
}

// event handling of getexchange button
let amountEntered;
getExchangeButton.addEventListener("click", () => {
  finalMessage.innerText='Loading..'
  if (Number(amountEnteredInput.value)>0) {
      amountEntered=Number(amountEnteredInput.value)
      getExchangeRate()
      
  } else{
      errorMessage.innerText="Enter a valid positive number.."
      finalMessage.innerText="Invalid Input"
  }
 
  
});



