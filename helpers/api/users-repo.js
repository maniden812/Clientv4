// const fs = require('fs');
let users = require('../../data/users.json');
// users in JSON file for simplicity, store in a db for production applications


export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
    sale,
    delete: _delete
};

function create(user) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

//figure this out ana

function update(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());


    // fullname
    user.fullname = params.fullname;
    //address1
    user.address1 = params.address1;
    //address2
    user.address2 = params.address2;
    //city
    user.city = params.city;
    //state
    user.state = params.state;
    //zipcode
    user.zipcode = params.zipcode;


    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}
//figure this out manasa
function sale(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());
    // set sale data into db 
    user.sale = user.sale.append(params);
    user.dateUpdated = new Date().toISOString();

    Object.assign(user, params);
    saveData();

}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();

}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}