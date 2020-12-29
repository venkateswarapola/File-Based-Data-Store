# CRD on File Based Data Storage using NodeJS
##### RUN
* node app.js
##### RUN IN CUSTOM PATH
* node app.js path
* example : node app.js C:\Users\GuestUser\Desktop\
##### Created API's for CRD operations and also a simple HTML web page to use it. We can also use it with POSTMAN.
.
#### API's are 
##### 1. CREATE - http://localhost:3000/create/:key/:value/:ttl?  (Here TTL is optional)
##### 2. READ - http://localhost:3000/read/:key
##### 2. DELETE - http://localhost:3000/delete/:key
.
## UNIT TESTING USING MOCHA and CHAI 
#### 15 Tests are available.
##### RUN
* mocha unitTest.js

| ![test](./ScreenShots/testing.png) |
|:--:| 
| *15 TEST RESULTS* |

.
## WEB PAGE
##### RUN
* Open index.html in UI folder

.
## SNAPSHOTS OF POSTMAN
| ![create](./ScreenShots/create2.png) |
|:--:| 
| *INSERT DATA* |

| ![create](./ScreenShots/create1.png) |
|:--:| 
| *KEY ALREADY EXISTS* |

| ![create](./ScreenShots/create4.png) |
|:--:| 
| *VALUE NOT OBJECT TYPE ERROR* |

| ![create](./ScreenShots/create5.png) |
|:--:| 
| *KEY VALUE > 32 CHARACTERS ERROR* |

| ![read](./ScreenShots/read2.png) |
|:--:| 
| *READ DATA* |

| ![read](./ScreenShots/read1.png) |
|:--:| 
| *KEY EXPIRED CANNOT READ* |

| ![read](./ScreenShots/read3.png) |
|:--:| 
| *KEY DOES NOT EXIST* |

| ![delete](./ScreenShots/delete2.png) |
|:--:| 
| *DELETE DATA* |

| ![delete](./ScreenShots/delete1.png) |
|:--:| 
| *KEY EXPIRES CANNOT DELETE* |

## SNAPSHOTS OF WEBPAGE

| ![SELECTE OPERATION](./ScreenShots/indexPage.png "SELECT OPERATION") |
|:--:| 
| *SELECT OPERATION* |

| ![CREATE FORM](./ScreenShots/createPage1.png "CREATE FORM") |
|:--:| 
| *CREATE FORM* |

| ![CREATE RESPONSE](./ScreenShots/createPage2.png "CREATE RESPONSE") |
|:--:| 
| *CREATE RESPONSE* |

| ![READ FORM](./ScreenShots/readPage1.png "READ FORM") |
|:--:| 
| *SELECT OPERATION* |

| ![READ SUCCESS RESPONSE](./ScreenShots/readPage2.png "READ SUCCESS RESPONSE") |
|:--:| 
| *READ SUCCESS RESPONSE* |

| ![READ FAILED DUE TO KEY EXPIRY](./ScreenShots/readPage3.png "READ FAILED DUE TO KEY EXPIRY") |
|:--:| 
| *READ FAILED DUE TO KEY EXPIRY* |

| ![DELETE FORM](./ScreenShots/deletePage1.png "DELETE FORM") |
|:--:| 
| *DELETE FORM* |

| ![DELETE SUCCESS RESPONSE](./ScreenShots/deletePage2.png "DELETE SUCCESS RESPONSE") |
|:--:| 
| *DELETE SUCCESS RESPONSE* |

| ![DELETE FAILED DUE TO KEY EXPIRY](./ScreenShots/deletePage3.png "DELETE FAILED DUE TO KEY EXPIRY") |
|:--:| 
| *DELETE FAILED DUE TO KEY EXPIRY* |