# samlssotestenv
Easily comprehensible env. to test SAML SSO

The content of this repository is the result of the following article: https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9

1. Install docker and pull docker container for the idp
```
docker pull kristophjunge/test-saml-idp
```
2. Install node and create new project
```
npm init
```
3. Install the following packages
```
npm install express
npm install express-session
npm install body-parser
npm install cookie-parser
npm install passport
npm install passport-saml
```
4. Create Certificats
```
openssl req -x509 -newkey rsa:4096 -keyout certs\key.pem 
-out certs\cert.pem -nodes -days 900
```
