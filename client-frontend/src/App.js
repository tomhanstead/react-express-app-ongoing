import { useState, useEffect } from "react"
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//Import styling
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URL, setURL] = useState('');

  const [title2, setTitle2] = useState('');
  const [description2, setDescription2] = useState('');
  const [URL2, setURL2] = useState('');

  const [id, setId] = useState(0)

  //Create a new web item
  function handleSubmit(e){
    fetch('http://localhost:8000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title, 
        description: description,
        URL: URL
      })
    })
    .then(res => res.json())
    .then(response => {
      // console.log("response", response)
      setData(response)
    })
  }

//Edit item 
  function handleUpdate(id){
    console.log(id)
    fetch(`http://localhost:8000/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title2, 
        description: description2,
        URL: URL2
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    setData(data)
    })
  }

  //DELETE ITEM
  function deleteItem(id){
console.log(id)
    fetch('http://localhost:8000/delete', {
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
})
.then(response => response.json())
.then(data => {
  console.log(data)
setData(data)
})
    }

  useEffect(() => {
    fetch('http://localhost:8000')
    .then(res => res.json())
    .then(response => {
      // console.log("response", response)
      setData(response)
    })
  }, [])

  //For the Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
        <input value={title} onChange={(e) => setTitle(e.target.value)}/> 
        <input value={description} onChange={(e) => setDescription(e.target.value)}/> 
        <input value={URL} onChange={(e) => setURL(e.target.value)}/> 
        <button onClick={handleSubmit}>Add</button>
    
      {/* <button onClick={handleEdit(id)}>Save edit</button> */} 
      <button onClick={handleUpdate(id)}>Save edit</button>

      {data.map((item, i) => (
        <div key={i}>
          <p>{item.id}</p>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.URL}</p>
          <RiCloseCircleLine
          onClick={()=>deleteItem(item.id)}
          className='delete-icon'
        />
          <TiEdit
          onClick={()=>setId(item.id)}
          className='edit-icon'
        />
         <Button variant="primary" onClick={handleShow}>
        Edit web item
      </Button>

        <Modal show={show} onHide={handleClose} onClick={()=>setId(item.id)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit web item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control as="textarea" rows={1} value={title2} onChange={(e) => setTitle2(e.target.value)}/>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={1} value={description2} onChange={(e) => setDescription2(e.target.value)}/>
              <Form.Label>URL</Form.Label>
              <Form.Control as="textarea" rows={1} value={URL2} onChange={(e) => setURL2(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={()=>handleUpdate(item.id)}>  */}
          <Button variant="primary" onClick={()=>handleUpdate(id)}> 
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      ))}
    </div>
   
  );
}

export default App;

//REFERENCES
//Added a modal button so that when the edit button is clicked the modal is revealed. 
// https://react-bootstrap.github.io/components/modal/