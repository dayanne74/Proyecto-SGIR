import Card from 'react-bootstrap/Card';
import "../dashboard/InicioExcursiones.css"
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Excursiones() {
  return (
    <>
    <div className='bienvenidos'>
      <h1>Bienvenido a la seccion de Excursiones</h1>
      <h3>Para vivir experiencias memorables con tu grupo de amigos y crear recuerdos unicos</h3><hr />
    </div>

    <Container>
      <Row>
        <Col xs>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="../../src/Images/eje_cafetero.jpg" />
          <Card.Body>
            <Card.Title>Excursion 1</Card.Title>
            <h4>Descubre el encanto del Eje cafetero: Una aventura en el corazón de Colombia</h4>
            <Card.Text>
              Únete  a nosotros en una emocionante excursion al Eje Cafetero,
              una región que combina la belleza natural de los Andes Colombianos 
              con la riqueza cultural de sus pueblos y tradición cafetera.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><h5>Duracion:</h5> 5 Dias</ListGroup.Item>
            <ListGroup.Item><h5>Precio:</h5> $1`400.000</ListGroup.Item>
            <ListGroup.Item><h5>Incluye:</h5>
            • Transporte en vehiculo conforatable.
            • Alojamiento en hotel.
            • Desayuno, alumerzo, cena. 
            • Guia especializado.
            • Entrada a lugares turisticos.
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="outline-primary">Ver Mas</Button>
          </Card.Body>
        </Card>
        </Col>


        <Col xs={{ order: 2}}>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>Excursion 2</Card.Title>
            <h4>Descubre el paraiso del Caribe Colombiano: Una experiencia tropical que te dejara grandes recuerdos.</h4>
            <Card.Text>
              Únete a una experiencia unica con tus amigos y familiares por este ambiente tropical que nos brinda
              la Costa Caribe rodeada de lugares emblematicos y una cultura que te encantara.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><h5>Duracion:</h5> 7 Dias</ListGroup.Item>
            <ListGroup.Item><h5>Destinos:</h5> 
            Santa Marta 
            Barranquilla 
            Cartegena
            </ListGroup.Item>
            <ListGroup.Item><h5>Precio:</h5> $1`600.000</ListGroup.Item>
            <ListGroup.Item><h5>Incluye:</h5>
            • Transporte en vehiculo conforatable.
            • Alojamiento en hotel.
            • Desayuno, alumerzo, cena. 
            • Guia especializado.
            • Entrada a lugares turisticos.
            • Actividades recreativas
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="outline-primary">Ver Mas</Button>
          </Card.Body>
        </Card>
        </Col>

        <Col xs={{ order: 3 }}>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>Excursion 3</Card.Title>
            <h4>El Cabo de la Vela:: Una aventura donde descubriras muchas cosas, un destino unico lleno de adrenalina.</h4>
            <Card.Text>
              Una experiencia unica para los amantes de lo extremo, un recorrido por el desierto de la Guajira al norte de Colombia
              te sorprendera. 
              </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item><h5>Duracion:</h5> 9 Dias</ListGroup.Item>
            <ListGroup.Item><h5>Destinos:</h5> 
            Valledupar 
            Cabo de la Vela
            Santa Marta
            Barranquilla
            Cartegena
            La Guajira
            </ListGroup.Item>
            <ListGroup.Item><h5>Precio:</h5> $1`800.000</ListGroup.Item>
            <ListGroup.Item><h5>Incluye:</h5>
            • Transporte en vehiculo conforatable.
            • Transporte en vehiculo 4 x 4.
            • Alojamiento en hotel.
            • Visita a la comunidad wayúu.
            • Desayuno, alumerzo, cena. 
            • Guia especializado.
            • Entrada a lugares turisticos.
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="outline-primary">Ver Mas</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>    
    </>
  )
}

export default Excursiones;
