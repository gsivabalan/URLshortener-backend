const bcrypt = require('bcrypt');
const iplocate = require('node-iplocate');

exports.getIpLocation = async (ipAddress) => {
    try {
        const location = await iplocate(ipAddress);
        return location;
    } catch (err) {
        // console.log(err);
        return {};
    }
};

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};
