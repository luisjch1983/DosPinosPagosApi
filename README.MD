# A NODE.JS EXPRESS Server example to implement Microservices
  
This is an example how to implement different Microservices in Nodejs  
  
This API allows to get Country, Town, Weather, and Currency data  
  
## COUNTRY DATA - EXAMPLE FOR STORED JSON DATA
countrydata.js is an exported const from https://restcountries.eu/rest/v2/all  
The file stores all countries of the world with their most important data  
  
The country data is stored in countrydata.js
  
## TOWN DATA 1 - EXAMPLE FOR LOCAL POSTGRES DATABASE ACCESS
  
For town data a local PostgreSQL or SQL Server database is used.  
In order to use the local Postgres example you need to use town-pg.js.  
  
This data can be retrieved by using PostgreSQL from Docker in this repo:  
https://github.com/Cookiemovies/postgresql  
  
Once the PostgreSQL container is running, this API can access the POSTGRESQL data.  
In order to use this you must uncomment require town-pg in controller.js.  
  
## TOWN DATA 2 - EXAMPLE USING LOCAL SQL SERVER
For town data a local SQL Server database used.  
In order to use this you must uncomment require town-sql in controller.js.  
You must have a running local SQL Server on your machine.
  
## TOWN DATA 3 - EXAMPLE USING SQL SERVER RUNNING ON AZURE
For town data a SQL Server database on Azure is used.  
In order to use this you must uncomment require town-azure in controller.js.  
You must have a running SQL Server on Azure.
  
## TOWN DATA 4 - EXAMPLE USING LOCAL SQL SERVER RUNNING IN DOCKER CONTAINER
For town data a local SQL Server database running in a Docker container is used.  
In order to use this you must uncomment require town-dsql in controller.js.  
You must have a running local SQL Server in a Docker container.

**Run the SQL SERVER Docker Container**
  
This example will pull and run the Docker container from Micorsoft.  
You must use the environment variable ACCEPT_EULA=Y, SA_PASSWORD and MSSQL_PID.  
You must mount a volume to /var/opt/mssql to persist the data in the container.  
Port 1434 is used on your host machine to avoid conflicts with any locally running SQL Servers.  
  
```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=%SQLPASS%" -e "MSSQL_PID=Express" -v mssql:/var/opt/mssql -p 1434:1433 --name MSSQL -d mcr.microsoft.com/mssql/server   
```
  
You can backup your data from MSSQL when you want to stop and remove the container and delete the mssql volume.

**Backup the database**  
First stop the containers and then run the backup
```
docker container stop MSSQL
docker run --rm --volumes-from MSSQL -v C:\Users\marti\Projects\node-ms:/backup alpine sh -c "cd /var/opt/mssql && tar cvf /backup/mssql_db_data.tar ."
```
When you want to delete everything then  
```
docker container rm MSSQL
docker volume rm mssql
```
**Restore the backup**  
```
docker run --rm -v mssql:/recover -v C:\Users\marti\Projects\node-ms:/backup alpine sh -c "cd /recover && tar xvf /backup/mssql_db_data.tar"
```
  
## WEATHER DATA  
For weather data openweathermap.org API is used.  
In order to work properly the environment variable WEATHERAPIKEY must be set.   
You can retrieve your API key at any time, when you sign in to your openweathermap,org account.    
  
## CURRENCY DATA  
For currency data cnb.cz is used. Their API returns a txt file with major currencies in comparison to CZK.   
This txt file is then converted to JSON format.
This example is only valuable for converting CZK to other currencies.
  
## API Calls
  
The API utilizes several calls to retrieve data:  
(When deploying node-ms as a Docker Container on Azure then use your URI shown in Aure)  
  
localhost:3000/countries            -   Get all countries  
Example: http://localhost:3000/countries  
  
localhost:3000/countryname/:name    -   Get country by name  
Example: http://localhost:3000/countryname/Germany  
  
localhost:3000/countryid2/:id2      -   Get country by 2 digit country code  
Example: http://localhost:3000/countryid2/DE  
  
localhost:3000/towns                -   Get all towns (huge)  
Example: http://localhost:3000/towns  
  
localhost:3000/townid/:id           -   Get town by id  
Example: http://localhost:3000/townid/1   
  
localhost:3000/townname/:name       -   Get town by name  
Example: http://localhost:3000/townname/Munich   
  
localhost:3000/towncc/:cc           -   Get town by country code  
Example: http://localhost:3000/towncc/DE   
  
localhost:3000/weather/:name        -   Get weather by townname  
Example: http://localhost:3000/weather/Munich   
  
localhost:3000/weathercondition/:name  - Return a website with the Town, Weather Condition and Temperature  
Example: http://localhost:3000/weathercondition/Munich   
  
localhost:3000/currencies              - Returns all listed currencies and the amount in CZK (available in CNB)
Example: http://localhost:3000/currencies   
  
localhost:3000/currency/:currname  - Returns a specific currency and the amount in CZK
Example: http://localhost:3000/currency/EUR   
  
## Build the Docker image
  
With this command you can build your Dockerimage.  
```
docker build -f Dockerfile -t node-ms .
```
  
## Run the image
  
With this command you can run your created Dockerimage locally.  
Don´t forget either to set the environment variables like WEATHERAPIKEY, SQLPASS and PORT on your host or pass it with -e on the run conmand.  
  
```
docker run -e WEATHERAPIKEY -e SQLPASS -e PORT -p 3000:3000 --name node-ms -d node-ms
```
    
## Stop and Remove the Image

```
docker container stop node-ms
docker container rm node-ms

```
  
## Deploying Docker Image to Azure
  
When you want to deploy this dockerimage to Azure just use the Github actions in this repository.  
Don´t forget to set all necessary environment variables as secrets in this repository.  
  
## Github Actions Script
  
**The script will do 5 steps:**  
  
* Checkout from GitHub  
* Login with your Azure Account  
* Login to your Azure Registry  
* Build the Dockerimage and push the image to Azure  
* Deploy the Container to Azure  