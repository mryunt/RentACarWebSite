import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, ModalBody, ModalHeader, ModalFooter, Form, Row, Label, Col, FormGroup, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { addCustomer, deleteCustomer, updateCustomer, getCustomerList } from '../config/services/CustomerService';
import Swal from 'sweetalert2';

const CustomerList = () => {

    const [customerList, setCustomerList] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [customerObject, setCustomerObject] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modalAddCustomer, setModalAddCustomer] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);
    const toggleAddCustomer = () => setModalAddCustomer(!modalAddCustomer);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    useEffect(() => {
        getCustomerList().then(res => setCustomerList(res));
    }, []);

    const addCustomerForm = (data) => {
        const customerObject = {
            tcNo: data.cusTcNo,
            name: data.cusName,
            surname: data.cusSurname
        }
        addCustomer(customerObject).then(res => {
            Swal.fire(
                'Ekleme İşlemi Başarılı',
                'Müşteri Başarıyla Eklendi',
                'success'
            )
            getCustomerList().then(data => setCustomerList(data));
        })
        toggleAddCustomer();
        document.getElementById("addCustomerForm").reset();
    }

    const updateCustomerForm = (data) => {
        const customerObject = {
            tcNo: data.cusTcNo,
            name: data.cusName,
            surname: data.cusSurname
        }
        updateCustomer(customerId, customerObject).then(res => {
            if (res.code.statusCode === 1000) {
                Swal.fire(
                    'Güncelleme Başarılı',
                    'Güncelleme Başarılı',
                    'success'
                )
                getCustomerList().then(res => setCustomerList(res));
            } else {
                Swal.fire(
                    'Güncelleme Başarısız',
                    'Tekrar Deneyiniz',
                    'error'
                )
            }
        });
        document.getElementById("updateCustomerForm").reset();
        toggle();
    }
    const updateCustomerFunc = (customerObjc) => {
        setCustomerId(customerObjc.id);
        toggle();
    }

    const detailCustomer = (customerObjc) => {
        setCustomerObject(customerObjc);
        toggle2();
    }

    const deleteCustomerFunc = (customerId) => {
        deleteCustomer(customerId).then(res => {
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
                    getCustomerList().then(res => setCustomerList(res));
                }
            })
        })
    }
    const ModalAddCustomer = () => {
        return (
            <Modal isOpen={modalAddCustomer} toggle={toggleAddCustomer} >
                <ModalHeader toggle={toggleAddCustomer} close={closeBtn}>Modal title</ModalHeader>
                <Form id="addCustomerForm" onSubmit={handleSubmit(addCustomerForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Müşteri TC Kimlik Numarası: </Label>
                                    <Input
                                        type="text"
                                        name="cusTcNo"
                                        placeholder="Lutfen müşteri tc nosunu giriniz" //{`${CustomerId}`}
                                        {...register("cusTcNo", {
                                            required: {
                                                value: true,
                                                message: "Lütfen müşteri tc nosunu giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.cusTcNo && <span style={{ color: "red" }}>{errors.cusTcNo.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Müşteri İsmi: </Label>
                                    <Input
                                        type="text"
                                        name="cusName"
                                        placeholder="Lütfen müşteri ismini giriniz."
                                        {...register("cusName", {
                                            required: {
                                                value: true,
                                                message: "Lütfen müşteri ismini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.cusName && <span style={{ color: "red" }}>{errors.cusName.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Müşteri Soyismi: </Label>
                                    <Input
                                        type="text"
                                        name="cusSurname"
                                        placeholder="Lütfen müşteri soyismini giriniz."
                                        {...register("cusSurname", {
                                            required: {
                                                value: true,
                                                message: "Lütfen müşteri soyismini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.cusSurname && <span style={{ color: "red" }}>{errors.cusSurname.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Ekle</Button>{' '}
                            <Button color="secondary" onClick={toggleAddCustomer}>Cancel</Button>
                        </FormGroup>
                    </ModalFooter>
                </Form>
            </Modal >
        )
    }
    return (
        <div>
            <Row>
                <Col lg="12" className="mb-3">
                    {ModalAddCustomer()}
                    <Button color="primary" onClick={toggleAddCustomer}> Müşteri Ekle + </Button>
                </Col>
                <div>
                    <Table striped style={{ width: "100%", textAlign: "center" }}  >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>TcNo</th>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th style={{ textAlign: "center" }} >İşlemler</th>
                            </tr>
                        </thead>
                        {
                            customerList.map((item) => (
                                <tbody>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.tcNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="primary" outline onClick={() => detailCustomer(item)}>Detay</Button>
                                            <Button color="warning" outline onClick={() => updateCustomerFunc(item)} 
                                            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} >Güncelle</Button>
                                            <Button color="danger" outline onClick={() => deleteCustomerFunc(item.id)}>Sil</Button>
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
                <Form id="updateCustomerForm" onSubmit={handleSubmit(updateCustomerForm)}>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>TcNo: </Label>
                                    <Input
                                        type="text"
                                        name="tcNo"
                                        placeholder="Lutfen TC Kimlik Numarasını giriniz" //{`${CustomerId}`}
                                        {...register("tcNo", {
                                            required: {
                                                value: true,
                                                message: "Lütfen TC Kimlik Numarasını giriniz"
                                            }
                                        })}
                                    />
                                    {
                                        errors.tcNo && <span style={{ color: "red" }}>{errors.tcNo.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Müşteri İsmi: </Label>
                                    <Input
                                        type="text"
                                        name="cusName"
                                        placeholder="Lütfen Müşteri İsmini giriniz."
                                        {...register("cusName", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Müşteri İsmini giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.cusName && <span style={{ color: "red" }}>{errors.cusName.message}</span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Müşteri Soyismi: </Label>
                                    <Input
                                        type="text"
                                        name="cusSurname"
                                        placeholder="Lütfen Müşteri Soyisminı giriniz."
                                        {...register("cusSurname", {
                                            required: {
                                                value: true,
                                                message: "Lütfen Müşteri Soyisminı giriniz."
                                            }
                                        })}
                                    />
                                    {
                                        errors.cusSurname && <span style={{ color: "red" }}>{errors.cusSurname.message}</span>
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
                    <div>{customerObject?.id}</div>
                    <div>{customerObject?.tcNo}</div>
                    <div>{customerObject?.name}</div>
                    <div>{customerObject?.surname}</div>
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

export default CustomerList;