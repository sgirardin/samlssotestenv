# samlssotestenv
Easily comprehensible env. to test SAML SSO

The content of this repository is the result of the following article: https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9

1. Install docker, pull the docker container for the idp
```
docker pull kristophjunge/test-saml-idp
```
and launch it
```
docker run --name='testsamlidp' -p 8080:8080 -p 8443:8443 -e SIMPLESAMLPHP_SP_ENTITY_ID=saml-poc -e SIMPLESAMLPHP_SP_ASSERTION_CONSUMER_SERVICE=http://localhost:4300/login/callback -d kristophjunge/test-saml-idp
```
2. Install node and create new project
```
npm init
```
3. Update the project or install the following packages
```
npm install express
npm install express-session
npm install body-parser
npm install cookie-parser
npm install passport
npm install passport-saml
```
4. Start node server
```
node index
```
5. Login through the idp with user1 and user1pass
http://localhost:4300/login
6. Install SAML plugin for your favorite browser to see the SAML Dance
