exports.handler = async (event) => {
    console.log(event)
    const userID = event.pathParameters.user;
    const user = {'userID': userID, 'userName': "User " + userID };
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(user),
    };
    return response;
};