import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const Home = (props) => {
  return (
    <Row style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Col sm="4">
        <Card body>
          <CardTitle tag="h5">Araba Bilgileri</CardTitle>
          <CardText>Araba listesini gör, araba bilgisi ekle, araba bilgisi güncelle veya araba bilgisi sil</CardText>
          <Button href="/Carlist">Git</Button>
        </Card>
      </Col>
      <Col sm="4">
        <Card body>
          <CardTitle tag="h5">Müşteri Bilgileri</CardTitle>
          <CardText>Müşteri listesini gör, müşteri bilgisi ekle, müşteri bilgisi güncelle veya müşteri bilgisi sil</CardText>
          <Button href="/CustomerList">Git</Button>
        </Card>
      </Col>
      <Col sm="4">
        <Card body>
          <CardTitle tag="h5">Araç Sahibi Bilgileri</CardTitle>
          <CardText>Araç sahibi listesini gör, araç sahibi bilgisi ekle, araç sahibi bilgisi güncelle veya araç sahibi bilgisi sil</CardText>
          <Button href="OwnerList">Git</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;