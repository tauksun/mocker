echo -e 'Building backend ...'
cd ./backend

echo 'Removing previous backend build ...'
if [ -d "./dist" ]
then
    rm -rf ./dist
fi

echo 'Installing node_modules ...'
npm install

echo 'Compiling TypeScript...'
./node_modules/typescript/bin/tsc

echo 'Copying runtime environemnts & their ldd ...'
cp -r ./environments ./dist
cp -r ./node_modules ./dist
cp -r ./logs ./dist

cd ..

echo 'Building Frontend  : ::: : TODO : ::: :'
#
##
#
#

echo 'Building final distributable ...'
if [ -d "./dist" ]
then
    rm -rf ./dist
fi


mkdir ./dist

echo 'Copying backend distributable to final distributable...'
cp -r ./backend/dist/* ./dist
echo 'Copying frontend distributable to final distributable... :::: TODO ::::'


echo 'Copying environment variables & configuration files ...'
cp ./backend/.env ./dist
cp ./backend/package.json ./dist

echo "-- Build finished : DONE -- "

