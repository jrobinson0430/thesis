
mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=roles --drop --jsonArray --file=db/collections/roles.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=users --drop --jsonArray --file=db/collections/users.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=donations --drop --jsonArray --file=db/collections/donations.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=adoptions --drop --jsonArray --file=db/collections/adoptions.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=animals --drop --jsonArray --file=db/collections/animals/dogs.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=animals  --jsonArray --file=db/collections/animals/cats.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=animals  --jsonArray --file=db/collections/animals/lizards.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=animals  --jsonArray --file=db/collections/animals/horses.json

mongoimport --uri mongodb+srv://admin:FishPark5@cluster0.yc8oupt.mongodb.net --db=thesis --collection=animals  --jsonArray --file=db/collections/animals/birds.json


