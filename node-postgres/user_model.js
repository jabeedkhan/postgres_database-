const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

(function dbConnection() {
  const query = `CREATE TABLE IF NOT EXISTS users ( emailId varchar NOT NULL PRIMARY KEY, firstName varchar, lastName varchar, password varchar, city varchar, imageUrl varchar)`;
  client.connect().
  then(() => {
    console.log('Database connected successfully');
  }).
  then(() => {
    client.query(query);
  }).
  then(() => {
    console.log('users table created successfully');
  }).
  catch((e) =>{
    console.log('Unable to connect db. Please check db config');
  });
})();

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    const query = `SELECT * FROM users `;
    console.log('query ', query);
    client.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getLoginUserInformatiomFromDb = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password } = body
    const query = `SELECT * FROM users WHERE emailId='${username}' AND password='${password}'`;
    console.log('query ', query);
    client.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const validatedEmailId = (body) => {
  return new Promise(function(resolve, reject) {
    const { username } = body
    const query = `SELECT * FROM users WHERE emailId='${username}'`;
    console.log('query ', query);
    client.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      if(results.rows.length > 0){
        userExits = true;
        resolve({status: 'error', type:'USER_EXITS'})
      } else {
        resolve({status: 'success'})
      }
    })
  }) 
}

const  insertNewUserInfomation = async (body) => {
  return new Promise(function(resolve, reject) {
    const { username, firstname, lastname, password, city } = body;
    const query = `
      INSERT INTO users (emailId, firstName, lastName, city, password)
      VALUES ('${username}', '${firstname}', '${lastname}', '${city}', '${password}')
    `;
  
      console.log('query ', query);
      client.query(query, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve({ status: 'success'});
      })
   
  })
}

  module.exports = {
    getLoginUserInformatiomFromDb,
    insertNewUserInfomation,
    validatedEmailId,
  }