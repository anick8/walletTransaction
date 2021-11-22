var pgsql = require('../lib/pgsql')
var hash =require('../lib/hash')
const { response } = require('express')
exports.transferTokens = async (req) => {
    try{
        var Timestamp = Date.now()  
        var queries = []
        var {Balance,FromWalletUUID,ToWalletUUID,ToWalletType,Note,ToUsername,TransactionStatus,TransactionType} =req.body;
        var TransactionUUID =hash.hashing([FromWalletUUID,ToWalletUUID,Timestamp])
        var query1 ={
            'qname':'DebitfromWallet',
            'query':'update "Wallet" set "Balance" = "Balance"-$1 where "WalletUUID" = $2;',
            'qarg':[Balance,FromWalletUUID]
        }
        var query2 ={
            'qname':'CredittoWallet',
            'query':'update "Wallet" set "Balance" = "Balance"+$1 where "WalletUUID" = $2;',
            'qarg':[Balance,ToWalletUUID]
        }
        var query3 ={
            'qname':'createTransaction',
            'query':'insert into "WalletHistory" ("Amount","FromWalletUUID","ToWalletUUID","TransactionUUID","ToWalletType","Timestamp","Note","ToUsername","TransactionStatus","TransactionType") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
            'qarg':[Balance,FromWalletUUID,ToWalletUUID,TransactionUUID,ToWalletType,Timestamp,Note,ToUsername,TransactionStatus,TransactionType]
        }
        queries.push(query1)
        queries.push(query2)
        queries.push(query3);
        result = await pgsql.executetransaction(queries)
        console.log(result)
        if (('command' in result)){
            if(result.command =='COMMIT')
            {
                data ={'Balance':Balance,"FromWalletUUID":FromWalletUUID,"ToWalletUUID":ToWalletUUID,"TransactionUUID":TransactionUUID}
                return {'err':null,'data':data,'msg':'Transaction executed'}
            }
        }
        else
        {
            return {'err':result,'data':null,'msg':'Error creating Transaction'}
        }
    }
    catch(error){
        return{'err':error,'data':null,'msg':'Error in code transfertokens'}        
    }

}
