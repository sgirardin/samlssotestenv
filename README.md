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
5. Run idp docker with following command
```
docker run --name='testsamlidp' -p 8080:8080 -p 8443:8443 -e SIMPLESAMLPHP_SP_ENTITY_ID=saml-poc -e SIMPLESAMLPHP_SP_ASSERTION_CONSUMER_SERVICE=http://localhost:4300/login/callback -d kristophjunge/test-saml-idp
```
6. Retrieve the content of the X509Certificate Tag and copy it in the idp_key.pem file from: http://localhost:8080/simplesaml/saml2/idp/metadata.php
7. Start node server
```
node index
```
7. Login through the idp with user1 and user1pass
http://localhost:4300/login
8. Install SAML browser plugins to see the SAML Dance
