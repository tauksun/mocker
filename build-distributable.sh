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

## Frontend ##
echo 'Building Frontend...'
cd ./frontend

echo 'Removing previous frontend build ...'
if [ -d "./dist" ]
then
    rm -rf ./dist
fi

echo 'Installing node_modules ...'
npm install
npm run build

cd ..

echo 'Building final distributable ...'
if [ -d "./dist" ]
then
    rm -rf ./dist
fi

mkdir ./dist

echo 'Copying backend distributable to final distributable...'
cp -r ./backend/dist/* ./dist
echo 'Copying frontend distributable to final distributable...'
cp -r ./frontend/dist ./dist/frontend


echo 'Copying environment variables & configuration files ...'
cp ./backend/.env ./dist
cp ./backend/package.json ./dist

echo "-- Build finished : DONE -- "

