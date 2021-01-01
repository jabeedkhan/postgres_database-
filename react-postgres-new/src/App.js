import React, {useState, useEffect} from 'react';
function App() {
  const [users, setUsers] = useState(false);
  useEffect(() => {
    // getUserInformation();
    getUsers();
  }, []);

  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
          console.log('response ', response);
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }
  
  function getUserInformation(username, passwrod) {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, passwrod}),
    }).then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUserInformation();
      });
  }
  function createNewUser(username, firstname, lastname, passwrod, city) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, firstname, lastname, passwrod, city}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUserInformation();
      });
  }
  return (
    <div>
      {users ? users : 'There is no merchant data available'}
      <br />
      <button onClick={getUsers}>Add merchant</button>
      <br />
    </div>
  );
}
export default App;