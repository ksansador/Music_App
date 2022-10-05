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

     await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
        role: 'user',
    });

    const [dateArtist, kingArtist] = await Artist.create({
        title: 'Свидание',
        description: 'московский музыкальный коллектив, основанный в 2015-м году Андреем Зеберти. Группе свойственны минималистичное звучание в духе 60-х и лиричный настрой текстов. ',
        image: 'fixtures/группа свидание.jpeg',
        publish: true,
    }, {
        title: 'Король и Шут',
        description: 'оветская и российская хоррор-панк-группа из Санкт-Петербурга. Группа была образована в Ленинграде в 1988 году. ',
        image: 'fixtures/king.jpg',
        publish: true,
    });

    const [ firstAlbum, secondAlbum, salesAlbum, theatreAlbum] = await Album.create({
        title: 'Первое',
        artist: dateArtist._id,
        year: 2016,
        image: 'fixtures/первое.jpeg',
        publish: true,
    },{
        title: '№2',
        artist: dateArtist._id,
        year: 2019,
        image: 'fixtures/№2.jpeg',
        publish: true,
    },{
        title: 'Продавец кошмаров',
        artist: kingArtist._id,
        year: 2006,
        image: 'fixtures/продавец.jpg',
        publish: true,
    },{
        title: 'Театръ Демона',
        artist: kingArtist._id,
        year: 2010,
        image: 'fixtures/театр.jpg',
        publish: true,
    });

    await Track.create({
        title: 'Родинки',
        album: firstAlbum._id,
        duration: '00:03:51',
        number: 1,
        url: 'https://www.youtube.com/watch?v=_LtSuhUm5fc',
        publish: true,
    },{
        title: 'Барто',
        album: firstAlbum._id,
        duration: '00:03:45',
        number: 2,
        publish: true,
    },{
        title: 'Я и твой кот',
        album: firstAlbum._id,
        duration: '00:04:04',
        number: 3,
        url: 'https://www.youtube.com/watch?v=3u9M6NzP0R0',
        publish: true,
    },{
        title: 'Меняться телами',
        album: firstAlbum._id,
        duration: '00:04:03',
        number: 4,
        publish: true,
    },{
        title: 'Дельфины',
        album: firstAlbum._id,
        duration: '00:02:36',
        number: 5,
        publish: true,
    },{
        title: 'Весна предала',
        album: secondAlbum._id,
        duration: '00:03:17',
        number: 1,
        publish: true,
    },{
        title: 'Случайная любовь',
        album: secondAlbum._id,
        duration: '00:03:43',
        number: 2,
        publish: true,
    },{
        title: 'Цветы',
        album: secondAlbum._id,
        duration: '00:02:16',
        number: 3,
        publish: true,
    },{
        title: 'Детективы',
        album: secondAlbum._id,
        duration: '00:02:25',
        number: 4,
        publish: true,
    },{
        title: 'Так хороши',
        album: secondAlbum._id,
        duration: '00:03:02',
        number: 5,
        publish: true,
    },{
        title: 'Дочка вурдалака',
        album: salesAlbum._id,
        duration: '00:04:08',
        number: 1,
        publish: true,
    },{
        title: 'Гробовщик',
        album: salesAlbum._id,
        duration: '00:03:35',
        number: 2,
        publish: true,
    },{
        title: 'Отражение',
        album: salesAlbum._id,
        duration: '00:05:32',
        number: 3,
        publish: true,
    },{
        title: 'Та что смотрит из пруда',
        album: salesAlbum._id,
        duration: '00:03:11',
        number: 4,
        publish: true,
    },{
        title: 'Джокер',
        album: salesAlbum._id,
        duration: '00:03:16',
        number: 5,
        publish: true,
    },{
        title: 'Театр злобного гения',
        album: theatreAlbum._id,
        duration: '00:03:56',
        number: 1,
        publish: true,
    },{
        title: 'Фокусник',
        album: theatreAlbum._id,
        duration: '00:03:33',
        number: 2,
        publish: true,
    },{
        title: 'Король вечного сна',
        album: theatreAlbum._id,
        duration: '00:05:02',
        number: 3,
        publish: true,
    },{
        title: 'Послание',
        album: theatreAlbum._id,
        duration: '00:01:57',
        number: 4,
        publish: true,
    },{
        title: 'Киногерой',
        album: theatreAlbum._id,
        duration: '00:03:35',
        number: 5,
        publish: true,
    });

    await mongoose.connection.close();
};

run().catch(console.error);