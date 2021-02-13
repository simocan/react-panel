import ProjectList from "../Proje/ProjectList";
import UserServices from "../library/UserServices";
import interceptor from "../library/interceptor";
import React, { Fragment ,useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";
import {useHistory,
} from "react-router-dom";


const Dashboard = () => {

  const history = useHistory();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = 'Hoş Geldiniz';
  
  });

  const handleOk = () => {
    setShowConfirmationModal(false);
    localStorage.clear();
    history.push("/login");
};

const handleCancel = () =>{
    setShowConfirmationModal(false);
};
 

  return (
    <>

<div class="card text-center" style={{minHeight: "100vh"}}>
  <div class="card-header " >
    <ul class="nav nav-pills card-header-pills">
      <li class="nav-item">
        <a class="nav-link" href="/dashboard">Home</a>
      </li>


      <li class="nav-item ml-auto">
        <a class="nav-link" href="#"><button className="btn btn-outline-success my-2 my-sm-0"  onClick={() => setShowConfirmationModal(true)}>Güvenli Çıkış</button></a>
      </li>
    </ul>
  </div>
  <div class="card-body">
  <ProjectList />
  </div>

  <div class="card-footer text-muted">
  Hoş geldiniz! {UserServices.getFullName()+' '}
  </div>

           <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered dialogClassName={`modal-xs`}>
                <Modal.Body>
                    <label>Sayın {UserServices.getFullName()+' '} Çıkış Yapmak istiyor musunuz ?</label>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success" onClick={handleCancel}>Vazgeç</button>
                    <button className="btn btn-danger" onClick={handleOk}>Çıkış</button>
                </Modal.Footer>
            </Modal>

</div>


    

    </>
  );
};

export default Dashboard;
