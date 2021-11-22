
# Hashx ContentPermission CUD Microservice

Microservice to implement ContentPermission Table Create Update and Delete operations.

Run using - npm install npm start (OR) node index.js

# Routes

## /transferTokens

Creates a Wallet Transaction :

Request Body -
-req.body.Amount : Amount to be sent   
- req.body.FromWalletUUID : UUID of the wallet from which the amount is sent
- req.body.ToWalletUUID : UUID of the wallet to which the amount is sent
- req.body.ToWalletType : Type of the Wallet sent to
-   req.body.ToUsername : Username of the Wallet sent to.
-   req.body.TransactionStatus : status of the transaction.
- req.body.,TransactionType : Type of Transaction
- req.body.Note : Additional note that contains the transaction details

Response Body -
{'Balance', 'FromWalletUUID' , 'ToWalletUUID', 'TransactionUUID'}



# Response Format

[err,data,msg]

-   err : Error message from SQL try block
-   data : Data returned by SQL query
-   msg : Custom message defined in API

> Written with [StackEdit](https://stackedit.io/).
