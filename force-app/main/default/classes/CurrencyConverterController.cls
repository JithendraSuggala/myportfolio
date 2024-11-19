public with sharing class CurrencyConverterController {

    @AuraEnabled(cacheable=true)
    public static string getAPIKey(){
        APIKey__mdt convertorKey = APIKey__mdt.getInstance('CurrencyConverterAPIKey');
        return convertorKey.Key__c;
    }
}