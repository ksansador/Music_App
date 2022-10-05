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
        image: 'fixtures/группа свидание.jpeg'
    }, {
        title: 'Король и Шут',
        description: 'оветская и российская хоррор-панк-группа из Санкт-Петербурга. Группа была образована в Ленинграде в 1988 году. ',
        image: 'fixtures/king.jpg',
    });

    const [ firstAlbum, secondAlbum, salesAlbum, theatreAlbum] = await Album.create({
        title: 'Первое',
        artist: dateArtist._id,
        year: 2016,
        image: 'fixtures/первое.jpeg'
    },{
        title: '№2',
        artist: dateArtist._id,
        year: 2019,
        image: 'fixtures/№2.jpeg'
    },{
        title: 'Продавец кошмаров',
        artist: kingArtist._id,
        year: 2006,
        image: 'fixtures/продавец.jpg'
    },{
        title: 'Театръ Демона',
        artist: kingArtist._id,
        year: 2010,
        image: 'fixtures/театр.jpg'
    });

    await Track.create({
        title: 'Родинки',
        album: firstAlbum._id,
        duration: '00:03:51',
        number: 1,
        url: 'https://www.youtube.com/watch?v=_LtSuhUm5fc',
    },{
        title: 'Барто',
        album: firstAlbum._id,
        duration: '00:03:45',
        number: 2,
    },{
        title: 'Я и твой кот',
        album: firstAlbum._id,
        duration: '00:04:04',
        number: 3,
        url: 'https://www.youtube.com/watch?v=3u9M6NzP0R0',
    },{
        title: 'Меняться телами',
        album: firstAlbum._id,
        duration: '00:04:03',
        number: 4,
    },{
        title: 'Дельфины',
        album: firstAlbum._id,
        duration: '00:02:36',
        number: 5,
    },{
        title: 'Весна предала',
        album: secondAlbum._id,
        duration: '00:03:17',
        number: 1,
    },{
        title: 'Случайная любовь',
        album: secondAlbum._id,
        duration: '00:03:43',
        number: 2,
    },{
        title: 'Цветы',
        album: secondAlbum._id,
        duration: '00:02:16',
        number: 3,
    },{
        title: 'Детективы',
        album: secondAlbum._id,
        duration: '00:02:25',
        number: 4,
    },{
        title: 'Так хороши',
        album: secondAlbum._id,
        duration: '00:03:02',
        number: 5,
    },{
        title: 'Дочка вурдалака',
        album: salesAlbum._id,
        duration: '00:04:08',
        number: 1,
    },{
        title: 'Гробовщик',
        album: salesAlbum._id,
        duration: '00:03:35',
        number: 2,
    },{
        title: 'Отражение',
        album: salesAlbum._id,
        duration: '00:05:32',
        number: 3,
    },{
        title: 'Та что смотрит из пруда',
        album: salesAlbum._id,
        duration: '00:03:11',
        number: 4,
    },{
        title: 'Джокер',
        album: salesAlbum._id,
        duration: '00:03:16',
        number: 5,
    },{
        title: 'Театр злобного гения',
        album: theatreAlbum._id,
        duration: '00:03:56',
        number: 1,
    },{
        title: 'Фокусник',
        album: theatreAlbum._id,
        duration: '00:03:33',
        number: 2,
    },{
        title: 'Король вечного сна',
        album: theatreAlbum._id,
        duration: '00:05:02',
        number: 3,
    },{
        title: 'Послание',
        album: theatreAlbum._id,
        duration: '00:01:57',
        number: 4,
    },{
        title: 'Киногерой',
        album: theatreAlbum._id,
        duration: '00:03:35',
        number: 5,
    });

    await mongoose.connection.close();
};

run().catch(console.error);