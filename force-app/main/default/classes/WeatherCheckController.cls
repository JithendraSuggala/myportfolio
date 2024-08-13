public with sharing class WeatherCheckController {

    @AuraEnabled
    public static string getWeatherDetails(string input) {
    string url ='https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=metric'+getKey();
    string response= getResponse(url);
    return response;
}
public static string getResponse(string strUrl){
    Http h = new Http();
    HttpRequest req = new HttpRequest();
    HttpResponse res = new HttpResponse();
    req.setmethod('GET');
    req.setEndpoint(strUrl);
    req.setTimeout(120000);
    res = h.send(req);
    String responseBody = res.getBody();
    return responseBody;
}
    public static string getKey(){
        string key='0115b6bc0198dcbddba5c6b98015c0c8';
        string output ='&appid='+key;
        return output;

    }

}