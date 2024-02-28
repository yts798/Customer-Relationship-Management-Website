# Welcome to New-Bee CRM!!  😄   

<h3>
   Website link:<br/>
   [New-Bee CRM](https://new-bee.netlify.app/)<br/>
   [New-Bee admin CRM](https://new-bee-admin.netlify.app/)
</h3>
This is the project for Unimelb COMP30019 IT-Project.
<br/>
A website customer relationship managemenet system, which is able to store, search, manage and share your address book for business easily!  

<h4>
   Contributors:<br/>
   Ziyu Qian   ziyuq@student.unimelb.edu.au<br/>
   Shengjun Su shengjuns@student.unimelb.edu.au<br/>
   Xinyu Wu xinyu3@student.unimelb.edu.au<br/>
   Yutong Sun  yssu3@student.unimelb.edu.au<br/>
   Shenggang Qian shenggangq@student.unimelb.edu.au<br/>
   Tutor:<br/>
   Zhe Wang zoe.wang1@unimelb.edu.au<br/>
</h4>


## Organisation of folders
* back/
   The server of our web app, containing both admin server and client server
* front/
   The front-end of our clinet web app
   /src
   Containing the components and web pages code of the web app
   /public
   Containg the pics and images used for the web app
* admin-front/
   The front-end of our admin web app


## Links to Tools
 * Confluence space - https://new-bees.atlassian.net/wiki/spaces/PROJ/overview
 * Trello board - https://trello.com/b/AXQhdvlp/new-bees-crm
 * server demo - https://new-bee-crm.herokuapp.com/
 * client demo - https://new-bee.netlify.app
 * admin demo - https://new-bee-admin.netlify.app

## Deployment
Algorithms in Action is written in JavaScript, using the React framework. To make it work locally, you need to install Node.js. NPM (Node package manager) will be installed alongside when you install Node.js. We use express framework to implement our back-end

Ensure you have node version 14.x and npm version 6.x
To check your version, type
node --version 
npm --version

Navigate into front and back folder seperately and run npm install to install all independecies in package.json

Running on local 
Navigate into front and back folder separtely and run npm start, it will start both front and back-end side of web
Front-end side of client will run in port 3000, and will be launched at browser http://
localhost:3000
Front-end side of admin  will run in port 3001, and will be launched at browser http://localhost:3001
Back-end of client side and admin will run in port 8000


## Demo
You can use https://new-bee.netlify.app to start the client website
You can use https://new-bee-admin.netlify.app to start the admin website
The server will automatically run in https://new-bee-crm.herokuapp.com

We have enabled automatic deploying of both webites. If we commited changes on our repo, the website will automatically updated to the newest version.

The CI of https://new-bee.netlify.app is CI=npm run build
The CI of https://new-bee-crm.herokuapp.com/ is CI=npm start
The CI of https://new-bee-admin.netlify.app is CI=npm run build
## Change Log
### SPRINT 1
 * US_01_REGISTER_FUNC 
 * US_03_LOG_IN_FUNC  
 * US_06_HOMEPAGE 
 * US_19_LOGIN_PAGE 
 * US_20_REGISTER_PAGE 
 * US_21_DATABASE 
 * Add initial user stories for the whole project
 * Motivational model 
 * Domain model
 * Group decision
 * Coding standard
 * Persona
 * Project requirements
 * Sprint 1 Task arrangement

### SPRINT 2
 * US_02_EDITINFO
 * US_04_EDITIMAGE
 * US_08_DASHBOARD
 * US_10_SEARCH_BY_ID 
 * US_11_ADD_FRIEND
 * US_12_LOG_OUT 
 * US_17_DELE_FRIEND
 * US_22_INFO_PAGE
 * US_23_INFO_PRIVACY
 * US_24_SEARCH_EXSITING_FRIEND
 * US_25_RETURN_FRIENDS_CONTACT
 * US_26_CHANGE_ID
 * Sprint 1 Retrospective (no work left for sprint 2)
 * Sprint 1 Review (client's advice for sprint 1)
 * Sprint 2 Task arrangement
 * User stories update
 * Motivational Model update
 * Domain model
 * Testing report
 * Project Deployment (fail at sprint 2)
 * Future work 

### Sprint 3
* US_24_SEARCH_EXSIT_FRIEND
* US_27_ADMIN_PAGE
* US_28_ADMIN_SERVER 
* US_29_ADMIN_DATABASE
* US_30_INFO_INIT 
* US_31_UI_IMPROVE
* US_32_UPDATE_CONTACT
* US_33_ANIMATION
* US_34_ERROR_SWITCHING
* US_35_DEPLOY
* Sprint 2 Retrospective (work left for sprint 2)
* Sprint 2 Review (client's advice for sprint 2)
* Sprint 3 Task arrangement  
* User stories update
* Design model update
* Project Deployment (success at sprint 3)


 ### User story completed
 ### SPRINT 1
 F = Front-end  B = Back-end

 | Feature | Story ID | Task | Story Estimate | Prioroty | Contributor |
 | :---: | :---: | :---: | :---: | :---: | :---: |
 | Home page | 6 | Build a home page to guide user to the app | 2 | HIGH | ShengGang Qian, Ziyu Qian |
 | Log in | 19 | Build a web page for login with email and password and redirect to dashboard| 5| HIGH | XinYu Wu |
 |  | 3 | Use passport to make user log in and send jwt| 5 | HIGH | Ziyu Qian|
 | Register | 1 | Use passport to verify info of new user and save in database | 5 | HIGH | Ziyu Qian|
  |   | 20 | Build a web page for register with some info | 2 | HIGH | Xinyu Wu, Yutong Sun, Ziyu Qian|


 ### Sprint 2
| Feature | Story ID | Task | Story Estimate | Prioroty | Contributor|
| :---: | :---: | :---: | :---: | :---: | :---: |
|Edit information | 2 | User can edit their information and choose to publish it | 5 | HIGH | Xinyu Wu (F), Ziyu Qian (B)|
|                 | 26 | User can edit their ID for others to add | 5 | HIGH | Xinyu Wu (F), Ziyu Qian (B)|
|          | 4 | User can upload an image as their profile image | 8 | HIGH |Xinyu Wu (F), Ziyu Qian (B)|
| Dashboard | 8 | Dashboard pages will display the info of user and redirect to differnet web pages | 8 | HIGH | Shengjun Su(F), Ziyu Qian(B)|
|         | 22 | User's information can be displayed in the dashboard for the user to check | 5 | HIGH | Xinyu Wu (F), Ziyu Qian (B) |
| Search User ID  | 10 | search by userID and user is able to add as friend | 8 | HIGH | Yutong Sun(F), Ziyu Qian (B)|
|                 | 25 | Display the result of searched user | 2 | HIGH | Yutong Sun(F), Ziyu Qian (B)|
| Add friend  | 11 | Send a request to the user to wait for accepting | 5 | HIGH | Yutong Sun(F), Ziyu Qian (B)|
| Log Out | 12 | Users can log out and change another account to log in | 5 | HIGH | Shengjun Su(F), Ziyu Qian(B)|
| Remark | 15 | Users can rename the friend for a easy way to remember | 3 | HIGH | ShengGang Qian(F), ShengGang Qian(B) |
| Delete Friend| 17 | Users can delete a friend from their contact list | 5 | HIGH | ShengGang Qian(F), ShengGang Qian(B) |


There are two user stories we haven't finished
 * US_23_INFO_PRIVACY
 * US_24_SEARCH_EXSITING_FRIEND
 We think these two functions are challenging so we will finish it if we have time in sprint 3
 

### Sprint 3
| Feature | Story ID | Task | Story Estimate | Prioroty | Contributor|
| :---: | :---: | :---: | :---: | :---: | :---: |
| Search | 24 | Search an exising user from contact list based on ID, name, tag and remark | 13 | HIGH | Shengjun Su Shenggang Qian |
| Admin | 27 | Build an admin page to manage all users, admin need to log in with account and password | 5 | HIGH |  Yutong Sun (F)|
|       | 28 | Build a server for admin web to complete the functions | 5 | HIGH | Ziyu Qian(B) |
|       | 29 | Build a model for admin and save the admin in database | 5 | HIGH | Ziyu Qian(B)| 
| User Information | 30 | Build a page for user to enter the initial info after successfully registering | 8 | HIGH |  Shengjun Su(F) |
|     | 31 | Update the UI present for the info page | 5 | HIGH | Xinyu Wu(F) |
| Contact Web update automatically | 32 | Make web automatically update the contact info after editing | 8 | HIGH | Shengjun Su(F) Shenggang Qian(F) |
| Animation | 33 |Add animation element in our webpage | 3 | MEDIUM | Xinyu Wu(F) |
| Log out and log in error | 34 | Fix the error in log out and relogin| 5 | HIGH |Shengjun Su(F)Ziyu Qian(B) |
| Deploy | 35 | We need to successfully deploy our app | 5 | HIGH | Shengjun Su,Ziyu Qian |


### Test User account
 |User Name             |Password                  |Comment                   |
 |:---:                 |:---:                     |:---:                     |
 |admin                 |12345678                  |admin account             |
 |jsaonqian@gmail.com   |Qsg12345678               |Normal user account       |
 |Yiyangqianxi@qq.com   |yiyangqianxi1128          |Normal user account       |
 |Wuxinyu@gmail.com     |Wuyinyu123                |Normal user account       |
 |sushengju@gmail.com   |ssjssjssj                 |Normal user account       |
 |qianziyu@gmail.com    |qzy228228                 |Normal user account       |
 |suyuntong@gmail.com   |syt111111                 |Normal user account       |
 |yangmi@qq.com         |yangmi100100              |Normal user account       |
 |xiaomeng@gmail.com    |xm123321                  |Normal user account       |
 |xiaoming@zoho.com     |xiaoming123!              |Normal user account       |
 |zhaoshengdou@gmail.com|zhaoshengdong199?         |Normal user account       |
 |zhaoxin@gmail.com     |zhaoxin898                |Normal user account       |
 


