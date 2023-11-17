const { User } = require('../models');

const userData = [
    {
        id: "287cab39-24c1-47d3-a053-55131ef12b26",
        name :"Doro Phillpot",
        phone :"1776783145",
        email :"dphillpot0@irs.gov",
        password :"Password123!"
    },
    {
        id: "ad143d8b-99e4-4ec0-b1c6-be0e8c26fabd",
        name :"Barbara Roskelley",
        phone :"2299648129",
        email :"broskelley1@mayoclinic.com",
        password :"Password123!"
    },
    {
        id: "3598a10f-260f-4c77-8f2d-9b17904acbf8",
        name :"Mollee McLeoid",
        phone :"6219744334",
        email :"mmcleoid2@last.fm",
        password :"Password123!"
    },
    {
        id: "fa8396b6-0efc-47bb-9e2e-8582c8a22357",
        name :"Jaynell McGrory",
        phone :"1585580140",
        email :"jmcgrory3@cdc.gov",
        password :"Password123!"
    },
    {
        id: "3fdcc6a4-a99a-45ad-8f23-30b45e7929d9",
        name :"Uri Linn",
        phone :"9701735866",
        email :"ulinn4@etsy.com",
        password :"Password123!"
    },
];

const seedUsers = async () => {
    for (const user of userData) {
        await User.create(user);
    }
};

module.exports = seedUsers;