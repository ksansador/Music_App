const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require("./config");

const User = require("./models/User");
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

   const [adminUser, rootUser] = await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
       displayName: 'Admin',
       avatarImage: 'http://localhost:8000/fixtures/adminAvatar.jpg'
    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'User',
       avatarImage: 'http://localhost:8000/fixtures/userAvatar.png'
    });

    const [dateArtist, kingArtist] = await Artist.create({
        title: 'Свидание',
        user: adminUser._id,
        description: 'московский музыкальный коллектив, основанный в 2015-м году Андреем Зеберти. Группе свойственны минималистичное звучание в духе 60-х и лиричный настрой текстов. ',
        image: 'fixtures/группа свидание.jpeg',
        publish: true,
    }, {
        title: 'Король и Шут',
        user: adminUser._id,
        description: 'оветская и российская хоррор-панк-группа из Санкт-Петербурга. Группа была образована в Ленинграде в 1988 году. ',
        image: 'fixtures/king.jpg',
        publish: true,
    });

    const [ firstAlbum, secondAlbum, salesAlbum, theatreAlbum] = await Album.create({
        title: 'Первое',
        user: adminUser._id,
        artist: dateArtist._id,
        year: 2016,
        image: 'fixtures/первое.jpeg',
        publish: true,
    },{
        title: '№2',
        user: adminUser._id,
        artist: dateArtist._id,
        year: 2019,
        image: 'fixtures/№2.jpeg',
        publish: true,
    },{
        title: 'Продавец кошмаров',
        user: adminUser._id,
        artist: kingArtist._id,
        year: 2006,
        image: 'fixtures/продавец.jpg',
        publish: true,
    },{
        title: 'Театръ Демона',
        user: adminUser._id,
        artist: kingArtist._id,
        year: 2010,
        image: 'fixtures/театр.jpg',
        publish: true,
    });

    await Track.create({
        title: 'Родинки',
        user: adminUser._id,
        album: firstAlbum._id,
        duration: '00:03:51',
        number: 1,
        url: 'https://www.youtube.com/watch?v=_LtSuhUm5fc',
        publish: true,
    },{
        title: 'Барто',
        user: adminUser._id,
        album: firstAlbum._id,
        duration: '00:03:45',
        number: 2,
        publish: true,
    },{
        title: 'Я и твой кот',
        user: adminUser._id,
        album: firstAlbum._id,
        duration: '00:04:04',
        number: 3,
        url: 'https://www.youtube.com/watch?v=3u9M6NzP0R0',
        publish: true,
    },{
        title: 'Меняться телами',
        user: adminUser._id,
        album: firstAlbum._id,
        duration: '00:04:03',
        number: 4,
        publish: true,
    },{
        title: 'Дельфины',
        user: adminUser._id,
        album: firstAlbum._id,
        duration: '00:02:36',
        number: 5,
        publish: true,
    },{
        title: 'Весна предала',
        user: adminUser._id,
        album: secondAlbum._id,
        duration: '00:03:17',
        number: 1,
        publish: true,
    },{
        title: 'Случайная любовь',
        user: adminUser._id,
        album: secondAlbum._id,
        duration: '00:03:43',
        number: 2,
        publish: true,
    },{
        title: 'Цветы',
        user: adminUser._id,
        album: secondAlbum._id,
        duration: '00:02:16',
        number: 3,
        publish: true,
    },{
        title: 'Детективы',
        user: adminUser._id,
        album: secondAlbum._id,
        duration: '00:02:25',
        number: 4,
        publish: true,
    },{
        title: 'Так хороши',
        user: adminUser._id,
        album: secondAlbum._id,
        duration: '00:03:02',
        number: 5,
        publish: true,
    },{
        title: 'Дочка вурдалака',
        user: rootUser._id,
        album: salesAlbum._id,
        duration: '00:04:08',
        number: 1,
        publish: true,
    },{
        title: 'Гробовщик',
        user: rootUser._id,
        album: salesAlbum._id,
        duration: '00:03:35',
        number: 2,
        publish: true,
    },{
        title: 'Отражение',
        user: adminUser._id,
        album: salesAlbum._id,
        duration: '00:05:32',
        number: 3,
        publish: true,
    },{
        title: 'Та что смотрит из пруда',
        user: adminUser._id,
        album: salesAlbum._id,
        duration: '00:03:11',
        number: 4,
        publish: true,
    },{
        title: 'Джокер',
        user: adminUser._id,
        album: salesAlbum._id,
        duration: '00:03:16',
        number: 5,
        publish: true,
    },{
        title: 'Театр злобного гения',
        user: adminUser._id,
        album: theatreAlbum._id,
        duration: '00:03:56',
        number: 1,
        publish: true,
    },{
        title: 'Фокусник',
        user: adminUser._id,
        album: theatreAlbum._id,
        duration: '00:03:33',
        number: 2,
        publish: true,
    },{
        title: 'Король вечного сна',
        user: adminUser._id,
        album: theatreAlbum._id,
        duration: '00:05:02',
        number: 3,
        publish: true,
    },{
        title: 'Послание',
        user: adminUser._id,
        album: theatreAlbum._id,
        duration: '00:01:57',
        number: 4,
        publish: true,
    },{
        title: 'Киногерой',
        user: adminUser._id,
        album: theatreAlbum._id,
        duration: '00:03:35',
        number: 5,
        publish: true,
    });

    await mongoose.connection.close();
};

run().catch(console.error);