import logo from './logo.svg';
import 'antd/dist/antd.css';
import { Card, Button, Col, Row, Modal, Input } from 'antd';
import './App.css';
import {useState, useEffect} from 'react';
import {Deploy} from './Component/Deploy/Deploy';
import axios from 'axios';

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    fetch("/api").then(response => {
      if(response.status == 200){
        return response.json()
      }
    }).then(data => setState(data))
    .then(error => console.log(error))
  },[])

  const items = [
    { name: "test1", price: 1 },
    { name: "test2", price: 2 },
    { name: "test3", price: 3 },
    { name: "test4", price: 4 },
  ]

  const total = [
    { name: "price", price: 5 },
    { name: "priceAfterTax", price: 3 },
  ]

  const headers = { "Content-Type": "application/json" };
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([])
  const [couponCode, setCouponCode] = useState("")

  async function handleSubmit(item) {
    setCount(count + item.price)
    setCart([...cart, item])
  }

  async function handleCoupon() {
    try {
      axios.post("http://localhost:5000/", {
        code: couponCode,
      }, headers)
        .then((response) => {
          console.log(response.data.couponValid);
        }, (error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* <Deploy prop={state}/> */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}><Button type="primary" onClick={showModal}>
        Open Cart
      </Button>
      </div>
      <Modal title="Cart Items" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Your total price is: {count}</p>
        <p>Your final price after taxes is: {(count * 1.13).toFixed(2)}</p>
        {cart.map((item) => (
          <Col span={6}><Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <Button onClick={() => handleSubmit(item)}>random</Button>
          </Card>
          </Col>
        ))}
      </Modal>
      <Row gutter={[16, 16]}>{items.map((item) => (
        <Col span={6}><Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <Button onClick={() => handleSubmit(item)}>random</Button>
        </Card>
        </Col>
      ))}</Row>
      <Input.Group compact>
        <Input onChange={(e) => setCouponCode(e.target.value)} style={{ width: "200px" }} placeholder="Apply Coupon Here" />
        <Button onClick={() => handleCoupon()} type="primary">Submit</Button>
      </Input.Group>
    </div>
  );
}

export default App;
