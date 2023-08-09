const axios = require('axios');
const { faker } = require('@faker-js/faker');

const apiUrl = 'http://localhost:5000/data';

const sendData = () => {

    const now = new Date();
    const gmtPlus7 = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    const appNames = [
        "AppX",
        "AwesomeApp",
        "SuperApp",
        "AppGenius",
        "Appify",
        "AppWorld",
        "AppMaster",
        "AppStar",
        "AppNation",
        "AppWizard",
        "AppHub",
        "AppZone",
        "AppLand",
        "AppMania",
        "AppPlanet",
        "AppExpress",
        "AppPower",
        "AppMagic",
        "AppCentral",
        "AppConnect",
        "AppForge",
        "AppLaunch",
        "AppVelocity",
        "AppBlast",
        "AppMega",
        ];

    function getRandomAppName() {
        const randomIndex = Math.floor(Math.random() * appNames.length);
        return appNames[randomIndex];
    }
    
    const data = {
    sumber: "ME",
    timestamp: gmtPlus7.toISOString(),
    app_name: getRandomAppName(),
    pengukuran: 'RTS',
    value: faker.number.int(10),
    unit: 'second',
    satuan: 's',
    status: faker.helpers.arrayElement(['normal','warning']),
    status_reading: faker.helpers.arrayElement(['OK',' ']),
    };

    axios
    .post(apiUrl, data)
    .then((response) => {
        console.log('Data sent successfully:', response.data);
    })
    .catch((error) => {
        console.error('Error sending data:', error.message);
    });
};

setInterval(sendData, 1000);