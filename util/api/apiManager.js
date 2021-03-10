
const apiResponse = {
  data: false,
  msg: '',
  variant: "error",
}

export async function sendDataApi(api, method, dataSend){

    var url = "http://localhost:3000/api" + api;

    var response = fetch(url, {
      method: method,
      body: JSON.stringify(dataSend),
    })
    .then(res => {
      
      var status = res.status;
      var variant = verifyStatus(status);
      return res.json().
      then(dataRes => {
        console.log(dataRes);
        setApiResponse(variant, dataRes);
        return apiResponse;
      })
    })
    .catch(error => {
      setApiError(error);
      return apiResponse;
    });

    return response;
}

function verifyStatus(status){
  return (status >= 200 && status < 300)? "success": "error";
}

function setApiError(error){
  apiResponse.msg = error;
}

function setApiResponse(variant, res){
  apiResponse.variant = variant;
  apiResponse.data = res.reply;
  apiResponse.msg = res.msg;
}