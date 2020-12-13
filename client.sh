#!/bin/sh
#cURL test client for API test demo server.
#Joey Whelan

echo '***CREATE***'
curl -i -w "\n%{time_total} sec" -H "Content-Type: application/json" -d '{"pageId":"testpage"}' http://localhost:8888/page
echo '\n************\n'

#RETRIEVE
echo '***RETRIEVE***'
curl -i -w "\n%{time_total} sec" http://localhost:8888/page/testpage/hitCount
echo '\n************\n'

#UPDATE
echo '***UPDATE***'
curl -i -w "\n%{time_total} sec" -X PATCH http://localhost:8888/page/testpage/hitCount
echo '\n************\n'

#DELETE
echo '***DELETE***'
curl -i -w "\n%{time_total} sec" -X DELETE http://localhost:8888/page/testpage
echo '\n************\n'









