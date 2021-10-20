import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Label, Col, FormGroup, Input } from 'reactstrap';
import { useForm } from 'react-hook-form'
import {
    addCar,
    deleteCar,
    updateCar,
    getCarList
} from '../config/services/CarService'
import Swal from 'sweetalert2'


const CarList = () => {

    //COMPONENT STATES
    const [carList, setCarList] = useState([]);
    const [carId, setCarId] = useState(0);
    const [carObject, setCarObject] = useState();

    //FORM VARIABLES
    const { register, handleSubmit, formState: { errors } } = useForm();

    // MODAL STATES
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modalAddCar, setModalAddCar] = useState(false);

    const toggle = () => {
        setModal(!modal)
    };
    const toggle2 = () => {
        setModal2(!modal2)
    };
    const toggleAddCar = () => {
        setModalAddCar(!modalAddCar)
    };

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;


    useEffect(() => {
        getCarList().then(res => setCarList(res));
    }, [])



    //ADD CAR

    const addCarForm = (data) => {
        const carObject = {
            brand: data.carBrand,
            model: data.carModel,
            year: data.carYear,
            gasDieselElectric: data.carFuel,
            ownerId: data.ownerId
        }
        console.log("add form car Obj : ", carObject)
        addCar(carObject).then(res => {
            console.log(res)
            Swal.fire(
                'Ekleme İşlemi Başarılı',
                'Araba Başarıyla Eklendi',
                'success'
            )
            getCarList().then(data => setCarList(data));
        })
        toggleAddCar();
        document.getElementById("addCarForm").reset();

    }

    //UPDATES CAR 
    const updateCarForm = (data) => {
        console.log("data:", data)
        const carObject = {
            brand: data.carBrand,
            model: data.carModel,
            year: data.carYear,
            gasDieselElectric: data.carFuel,
            ownerId: data.ownerId
        }
        updateCar(carId, carObject).then(res => {
            console.log("res : ", res)
            if (res.code.statusCode === 1000) {
                Swal.fire(
                    'Güncelleme Başarılı',
                    'Güncelleme Başarılı',
                    'success'
                )
                getCarList().then(res => setCarList(res));
            } else {
                alert(`hata oluştu : ${res.code.message}`)
                Swal.fire(
                    'Güncelleme Başarısız',
                    'Tekrar Deneyiniz',
                    'error'
                )
            }
        });
        document.getElementById("updateCarForm").reset();
        toggle();
    }

    const updateCarFunc = (carObjc) => {
        setCarId(carObjc.id)
        toggle();

    }

    //DETAIL CAR
    const detailCar = (carObjc) => {
        setCarObject(carObjc);
        toggle2();
    }

    //DELETE CAR 
    const deleteCarFunc = (carId) => {
        deleteCar(carId).then(res => {
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
                    getCarList().then(res => setCarList(res));
                }
            })
            // getCarList().then(res => setCarList(res));
        })
    }


    //Modal Function
    const ModalAddCar = () => {
        return (
            <Modal isOpen={modalAddCar} toggle={toggleAddCar} >
                <ModalHeader toggle={toggleAddCar} close={closeBtn}>Araba Ekle</ModalHeader>
                <Form id="addCarForm" onSubmit={handleSubmit(addCarForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Markası: </Label>
                                    <Input
                                        type="text"
                                        name="carBrand"
                                        placeholder="Lutfen araba markasını giriniz" //{`${carId}`}
                                        {...register("carBrand", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba markasını giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.carBrand && <span style={{ color: "red" }}>{errors.carBrand.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Modeli: </Label>
                                    <Input
                                        type="text"
                                        name="carModel"
                                        placeholder="Lütfen araba modelini giriniz."
                                        {...register("carModel", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba modelini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carModel && <span style={{ color: "red" }}>{errors.carModel.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Yılı: </Label>
                                    <Input
                                        type="text"
                                        name="carYear"
                                        placeholder="Lütfen araba yılını giriniz."
                                        {...register("carYear", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba yılını giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carYear && <span style={{ color: "red" }}>{errors.carYear.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Yakıt Türü: </Label>
                                    <Input
                                        type="text"
                                        name="carFuel"
                                        placeholder="Lütfen yakıt türünü giriniz."
                                        {...register("carFuel", {
                                            required: {
                                                value: true,
                                                message: "Lütfen yakıt türünü giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carFuel && <span style={{ color: "red" }}>{errors.carFuel.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Sahip ID: </Label>
                                    <Input
                                        type="text"
                                        name="ownerId"
                                        placeholder="Lütfen sahip ID giriniz"
                                        {...register("ownerId", {
                                            required: {
                                                value: true,
                                                message: "Lütfen sahip ID giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerId && <span style={{ color: "red" }}>{errors.ownerId.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Kaydet</Button>{' '}
                            <Button color="secondary" onClick={toggleAddCar}>Çıkış</Button>
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
                    {ModalAddCar()}
                    <Button color="primary" onClick={toggleAddCar}> Araba Ekle + </Button>
                </Col >
                <div>

                    <Table striped style={{ width: "100%", textAlign: "center" }}  >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Marka</th>
                                <th>Model</th>
                                <th>Yıl</th>
                                <th>Tür</th>
                                <th>Adı</th>
                                <th>Soyadı</th>
                                <th style={{ textAlign: "center" }} >İşlemler</th>
                            </tr>
                        </thead>
                        {
                            carList.map((item) => (
                                <tbody>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.year}</td>
                                        <td>{item.gasDieselElectric}</td>
                                        <td>{item.ownerName}</td>
                                        <td>{item.ownerSurname}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="primary" outline onClick={() => detailCar(item)}>Detay</Button>
                                            <Button color="warning" outline onClick={() => updateCarFunc(item)} style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} >Güncelle</Button>
                                            <Button color="danger" outline onClick={() => deleteCarFunc(item.id)}>Sil</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </Table>

                </div>
            </Row>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} close={closeBtn}>Araba Bilgisi Güncelle</ModalHeader>
                <Form id="updateCarForm" onSubmit={handleSubmit(updateCarForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Markası: </Label>
                                    <Input
                                        type="text"
                                        name="carBrand"
                                        placeholder="Lutfen araba markasını giriniz" //{`${carId}`}
                                        {...register("carBrand", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba markasını giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.carBrand && <span style={{ color: "red" }}>{errors.carBrand.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Modeli: </Label>
                                    <Input
                                        type="text"
                                        name="carModel"
                                        placeholder="Lütfen araba modelini giriniz."
                                        {...register("carModel", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba modelini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carModel && <span style={{ color: "red" }}>{errors.carModel.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Araba Yılı: </Label>
                                    <Input
                                        type="text"
                                        name="carYear"
                                        placeholder="Lütfen araba yılını giriniz."
                                        {...register("carYear", {
                                            required: {
                                                value: true,
                                                message: "Lütfen araba yılını giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carYear && <span style={{ color: "red" }}>{errors.carYear.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Yakıt Türü: </Label>
                                    <Input
                                        type="text"
                                        name="carFuel"
                                        placeholder="Lütfen yakıt türünü giriniz."
                                        {...register("carFuel", {
                                            required: {
                                                value: true,
                                                message: "Lütfen yakıt türünü giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.carFuel && <span style={{ color: "red" }}>{errors.carFuel.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Sahip ID: </Label>
                                    <Input
                                        type="text"
                                        name="ownerId"
                                        placeholder="Lütfen sahip ID giriniz"
                                        {...register("ownerId", {
                                            required: {
                                                value: true,
                                                message: "Lütfen sahip ID giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.ownerId && <span style={{ color: "red" }}>{errors.ownerId.message}</span>
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
                    <div>{carObject?.id}</div>
                    <div>{carObject?.brand}</div>
                    <div>{carObject?.model}</div>
                    <div>{carObject?.year}</div>
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

export default CarList
