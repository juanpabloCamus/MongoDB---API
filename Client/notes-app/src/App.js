import { useEffect, useState } from "react";
import Login from "./components/Login";
import axios from 'axios';

function App() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [notes, setNotes] = useState([])

  useEffect(()=>{
      axios.get(`http://localhost:3000/api/users/${user?.id}`,
        { headers: {"Authorization" : `Bearer ${user?.token}`} }
      )
      .then(resp => setNotes(resp.data.notes))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className="App">
      <h1>Notes App</h1>
      {
        user?.token 
        ?
        <div>
          <h1>Mis notas</h1>
          {
            notes.map(n => (
              <p key={n.id}>{n.content}</p>
            ))
          }
        </div>
        :
        <Login/>
      }
    </div>
  );
}

export default App;
