const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');


const meets = [
    {
        id: '1',
        topic: 'Cars',
        host: 'Toyo Tires',
        where: 'At Toyo Tires',
        when: '2021-10-18',
        start: '12:00',
        end: '11:59',
        details: "This is a Toyo Tires Meet",
        image: '/images/toyo.jpg'
        
    },
    {
        id: '2',
        topic: 'Cars',
        host: 'Soho Motorsport',
        where: 'At Toyo Tires',
        when: '2021-10-18',
        start: '18:00',
        end: '11:59',
        details: "This is a Soho Motorsport Meet",
        image: 'https://2.bp.blogspot.com/-b8-kxXlVkiE/UHyN5kEXsXI/AAAAAAAABOs/RAkGu4MsDLE/s800/419472_389932317745932_836099755_n.jpg'
    },

    {
        id: '3',
        topic: 'Cars',
        host: 'Z1 Motorsport',
        where: 'At Toyo Tires',
        when: '2021-11-15',
        start: '17:00',
        end: '11:00',
        details: "This is a Z1 Motorsport Meet",
        image: 'https://io.dropinblog.com/uploaded/blogs/34240099/files/Z1Motorsports_Showroom_2017.jpg'
    },
    {
        id: '4',
        topic: 'Coffee',
        host: 'Cars and Coffee - Charlotte',
        where: 'At Cars and Coffee - Charlote',
        when: '2021-10-19',
        start: '11:00',
        end: '18:59',
        details: "This is a cars and coffee Meet",
        image: 'https://www.steelstacks.org/wp-content/uploads/sites/3/2019/04/Cars_web.jpg'
    },
    {
        id: '5',
        topic: 'Coffee',
        host: 'Brads Coffee Bar',
        where: 'At Brads Coffee Bar',
        when: '2021-10-17',
        start: '13:00',
        end: '15:59',
        details: "This is a meet at Brads Coffee Bar to talk about cars",
        image: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=jpeg,quality=50/https://doordash-static.s3.amazonaws.com/media/store/header/524557a0-30ef-46a8-8108-08aa03cc5425.jpg'
    },
    {
        id: '6',
        topic: 'Coffee',
        host: 'Rocky River Coffee Company - Harriburg',
        where: 'Rocky River - Harriburg',
        when: '2021-10-15',
        start: '14:00',
        end: '17:59',
        details: "This is a meet at Rocky River Coffee Company - Harriburg",
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/2b/62/63/photo3jpg.jpg'
    },
];

exports.getTopics = () => {
    let array = [];
    for (i = 0; i < meets.length; i++) {

        if (!array.includes(meets[i].topic)){
            array.push(meets[i].topic);
        }
    
      //  console.log(meets[i].topic);

}
    return array;
}

exports.find = () =>  meets;

exports.findById = id => meets.find(meet => meet.id === id);

exports.save = meet => {
    meet.id = uuidv4();
    meets.push(meet);
}

exports.updateById = function (id, newMeet){
    let meet = meets.find(meet => meet.id === id);
    if (meet){
        meet.topic = newMeet.topic;
        meet.host = newMeet.host;
        meet.where = newMeet.where;
        meet.when = newMeet.when;
        meet.start = newMeet.start;
        meet.end = newMeet.end;
        meet.details = newMeet.details;
        meet.image = newMeet.image;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function (id) {
    let index = meets.findIndex(meet => meet.id === id);
    if (index !== -1) {
        meets.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

