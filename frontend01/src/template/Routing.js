import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mahasiswa from '../pages/Mahasiswa';
import Jurusan from '../pages/Jurusan';


function Routing() {
    return (
        <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Frontend</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">


                <li className="nav-item">
                <Link className="nav-link active" to="/mhs">Mahasiswa</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/jrsn">Jurusan</Link>
                </li>
               
            </ul>
            </div>
        </div>
        </nav>


        <Routes>
            <Route path="/mhs" element={<Mahasiswa />} />
            <Route path="/jrsn" element={<Jurusan />} />
        </Routes>
        </div>
    </Router>
    );
}


export default Routing;