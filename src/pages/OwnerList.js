import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Label, Col, FormGroup, Input } from 'reactstrap';
import { useForm } from 'react-hook-form'
import {
    addOwner,
    deleteOwner,
    updateOwner,
    getOwnerList
} from '../config/services/OwnerService'
import Swal from 'sweetalert2'


const OwnerList = () => {

    //COMPONENT STATES
    const [ownerList, setOwnerList] = useState([]);
    const [ownerId, setOwnerId] = useState(0);
    const [ownerObject, setOwnerObject] = useState();

    //FORM VARIABLES
    const { register, handleSubmit, formState: { errors } } = useForm();

    // MODAL STATES
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modalAddOwner, setModalAddOwner] = useState(false);

    const toggle = () => {
        setModal(!modal)
    };
    const toggle2 = () => {
        setModal2(!modal2)
    };
    const toggleAddOwner = () => {
        setModalAddOwner(!modalAddOwner)
    };

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;


    useEffect(() => {
        getOwnerList().then(res => setOwnerList(res));
    }, [])



    //ADD Owner

    const addOwnerForm = (data) => {
        const ownerObject = {
            name: data.ownerName,
            surname: data.ownerSurname
        }
        console.log("add form owner Obj : ", ownerObject)
        addOwner(ownerObject).then(res => {
            console.log(res)
            Swal.fire(
                'Ekleme İşlemi Başarılı',
                'Araba Sahibi Başarıyla Eklendi',
                'success'
            )
            getOwnerList().then(data => setOwnerList(data));
        })
        toggleAddOwner();
        document.getElementById("addOwnerForm").reset();

    }

    //UPDATES Owner 
    const updateOwnerForm = (data) => {
        console.log("data:", data)
        const ownerObject = {
            name: data.ownerName,
            surname: data.ownerSurname
        }
        updateOwner(ownerId, ownerObject).then(res => {
            console.log("res : ", res)
            if (res.code.statusCode === 1000) {
                Swal.fire(
                    'Güncelleme Başarılı',
                    'Güncelleme Başarılı',
                    'success'
                )
                getOwnerList().then(res => setOwnerList(res));
            } else {
                alert(`hata oluştu : ${res.code.message}`)
                Swal.fire(
                    'Güncelleme Başarısız',
                    'Tekrar Deneyiniz',
                    'error'
                )
            }
        });
        document.getElementById("updateOwnerForm").reset();
        toggle();
    }

    const updateOwnerFunc = (ownerObjc) => {
        setOwnerId(ownerObjc.id)
        toggle();

    }

    const detailOwner = (ownerObjc) => {
        setOwnerObject(ownerObjc);
        toggle2();
    }

    const deleteOwnerFunc = (ownerId) => {
        deleteOwner(ownerId).then(res => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    getOwnerList().then(res => setOwnerList(res));
                }
            })
        })
    }


    //Modal Function
    const ModalAddOwner = () => {
        return (
            <Modal isOpen={modalAddOwner} toggle={toggleAddOwner} >
                <ModalHeader toggle={toggleAddOwner} close={closeBtn}>Modal title</ModalHeader>
                <Form id="addOwnerForm" onSubmit={handleSubmit(addOwnerForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Sahibinin İsmi: </Label>
                                    <Input
                                        type="text"
                                        name="ownerName"
                                        placeholder="Lutfen Araba Sahibinin İsmini giriniz" //{`${ownerId}`}
                                        {...register("ownerName", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Araba Sahibinin İsmini giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerName && <span style={{ color: "red" }}>{errors.ownerName.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Sahibinin Soyismi: </Label>
                                    <Input
                                        type="text"
                                        name="ownerSurname"
                                        placeholder="Lütfen Araba Sahibinin Soyismini giriniz."
                                        {...register("ownerSurname", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Araba Sahibinin Soyismini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerSurname && <span style={{ color: "red" }}>{errors.ownerSurname.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Do Something</Button>{' '}
                            <Button color="secondary" onClick={toggleAddOwner}>Cancel</Button>
                        </FormGroup>
                    </ModalFooter>
                </Form>
            </Modal >
        )
    }
    return (
        <div >
            <Row>
                <Col lg="12" className="mb-3">
                    {ModalAddOwner()}
                    <Button color="primary" onClick={toggleAddOwner}> Araba Sahibi Ekle + </Button>
                </Col >
                <div>

                    <Table striped style={{ width: "100%", textAlign: "center" }}  >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th style={{ textAlign: "center" }} >İşlemler</th>
                            </tr>
                        </thead>
                        {
                            ownerList.map((item) => (
                                <tbody>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="primary" outline onClick={() => detailOwner(item)}>Detay</Button>
                                            <Button color="warning" outline onClick={() => updateOwnerFunc(item)} 
                                            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} >Güncelle</Button>
                                            <Button color="danger" outline onClick={() => deleteOwnerFunc(item.id)}>Sil</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </Table>

                </div>
            </Row>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
                <Form id="updateOwnerForm" onSubmit={handleSubmit(updateOwnerForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Sahibinin İsmi: </Label>
                                    <Input
                                        type="text"
                                        name="ownerName"
                                        placeholder="Lutfen Araba Sahibinin İsmini giriniz" //{`${ownerId}`}
                                        {...register("ownerName", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Araba Sahibinin İsmini giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerName && <span style={{ color: "red" }}>{errors.ownerName.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Sahibinin Soyismi: </Label>
                                    <Input
                                        type="text"
                                        name="ownerSurname"
                                        placeholder="Lütfen Araba Sahibinin Soyismini giriniz."
                                        {...register("ownerSurname", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Araba Sahibinin Soyismini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerSurname && <span style={{ color: "red" }}>{errors.ownerSurname.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Güncelle</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Çıkış</Button>
                        </FormGroup>
                    </ModalFooter>
                </Form>
            </Modal >
            <Modal isOpen={modal2} toggle={toggle2}>
                <ModalHeader toggle={toggle2} close={closeBtn}>Detaylar</ModalHeader>
                <ModalBody>
                    <div>{ownerObject?.id}</div>
                    <div>{ownerObject?.name}</div>
                    <div>{ownerObject?.surname}</div>
                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Button color="secondary" onClick={toggle2}>Kapat</Button>
                    </FormGroup>
                </ModalFooter>
            </Modal >
        </div>
    )
}

export default OwnerList;
