import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Jurusan() {
  const [jrs, setJrsn] = useState([]);
  const [show, setShow] = useState(false);
  const [namaJurusan, setNamaJurusan] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      const data = await response.data.data;
      setJrsn(data);
    } catch (error) {
      console.error("Kesalahan: ", error);
    }
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleNamaJurusanChange = (e) => {
    setNamaJurusan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/jurusan", {
        nama_jurusan: namaJurusan,
      });
      navigate("/jrsn");
      fetchData();
    } catch (error) {
      console.error("Kesalahan: ", error);
      setValidation(error.response.data);
    }
  };

  const [editData, setEditData] = useState({
    id_j: null,
    nama_jurusan: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (data) => {
    setEditData(data);
    setShowEditModal(true);
    setShow(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({
      id_j: null,
      nama_jurusan: "",
    });
  };

  const handleEditDataChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (editData.id_j === null || editData.id_j === undefined) {
      console.error("Kesalahan: ID data tidak valid.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/jurusan/${editData.id_j}`, {
        nama_jurusan: editData.nama_jurusan,
      });

      navigate("/jrsn");
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Kesalahan:", error);
      setValidation(error.response.data);
    }
  };

  const handleDelete = (id_j) => {
    console.log("Trying to delete data with ID:", id_j);

    axios
      .delete(`http://localhost:3000/jurusan/${id_j}`)
      .then((response) => {
        console.log('Data berhasil dihapus');
        const updatedJrs = jrs.filter((item) => item.id_j !== id_j);
        setJrsn(updatedJrs);
      })
      .catch((error) => {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi atau hubungi administrator.');
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Data Jurusan</h2>
          <Button variant="primary" onClick={handleShow}>
            Tambah
          </Button>
        </Col>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Jurusan</th>
              <th scope="col" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jrs.map((jr, index) => (
              <tr key={jr.id_j}>
                <td>{index + 1}</td>
                <td>{jr.nama_jurusan}</td>
                <td>
                  <button onClick={() => handleShowEditModal(jr)} className="btn btn-sm btn-info">
                    Edit
                  </button>
                </td>
                <button onClick={() => handleDelete(jr.id_j)} className='btn btn-sm btn-danger'>Hapus</button>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <Row>
        <Table striped bordered hover></Table>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Jurusan:</label>
              <input
                type="text"
                className="form-control"
                value={namaJurusan}
                onChange={handleNamaJurusanChange}
              />
            </div>
            <button onClick={handleClose} type="submit" className="btn btn-primary">
              Kirim
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Nama Jurusan:</label>
              <input
                type="text"
                className="form-control"
                value={editData ? editData.nama_jurusan : ''}
                onChange={(e) => handleEditDataChange('nama_jurusan', e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Jurusan;