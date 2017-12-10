cd ~/PlantronicsDeviceHub/scripts
mongoexport --db rest_test -c products --out ./dbexport.json --jsonArray --quiet
python ./reset-sql.py
python ./mongo-sql-convert.py > ./temp

