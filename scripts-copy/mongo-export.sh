mongoexport --db rest_test -c products --out ~/Collaborations/scripts/dbexport.json --jsonArray --quiet
python ./mongo-sql-convert.py > ./temp
#echo "[" > ~/Collaborations/scripts/dbedit.json
#cat ~/Collaborations/scripts/dbexport.json >> ~/Collaborations/scripts/dbedit.json
#echo "]" >> ~/Collaborations/scripts/dbedit.json
#sed "s/}\n{/} ,\n{/g" ~/Collaborations/scripts/dbedit.json > ~/Collaborations/scripts/dbfinal.json


mongoexport --db rest_test -c products --out ~/PlantronicsDeviceHub/serverui-1/src/dbexport.txt --quiet
sed "s/\"/\'/g" ~/PlantronicsDeviceHub/serverui-1/src/dbexport.txt > ~/PlantronicsDeviceHub/serverui-1/src/dbexport1.txt
sed ':a;N;$!ba;s/\n/ - - - - - - - - - - - - - - - - - - - - /g' ~/PlantronicsDeviceHub/serverui-1/src/dbexport1.txt > ~/PlantronicsDeviceHub/serverui-1/src/dbexport2.txt
perl -pi -e 'chomp if eof' ~/PlantronicsDeviceHub/serverui-1/src/dbexport2.txt
cat ~/PlantronicsDeviceHub/serverui-1/src/part1 > ~/PlantronicsDeviceHub/serverui-1/src/App.js
cat ~/PlantronicsDeviceHub/serverui-1/src/dbexport2.txt >> ~/PlantronicsDeviceHub/serverui-1/src/App.js
cat ~/PlantronicsDeviceHub/serverui-1/src/part2 >> ~/PlantronicsDeviceHub/serverui-1/src/App.js
