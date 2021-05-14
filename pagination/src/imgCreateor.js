import React, { useState } from 'react'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'
import imageCompression from 'browser-image-compression'
import { Notify } from 'notiflix'
import { connect } from 'react-redux'
import { addProduct } from '../../Actions/Products'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'
const AddProducts = ({ addProduct }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  })

  const [file, setfile] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleChange2 = async (e) => {
    if (file.length == 0) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(e.target.files[0], options)

      console.log(compressedFile)

      setfile(compressedFile)
    }
  }

  const AddProduct = async () => {
    if (file) {
      let result = new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })

      let obj = {
        id: uuidv4(),
        ...values,
        base64: await result,
      }

      addProduct(obj)
      window.location.href = '/Products'
    }

    if (!file) {
      let obj = {
        id: uuidv4(),
        ...values,
      }
      addProduct(obj)
      window.location.href = '/Products'
    }
  }

  const onSubmit = () => {
    if (values.name == '') {
      Notify.Failure('Name cannot be empty')
    } else if (
      values.price.split('.').length == 1 ||
      values.price == '' ||
      !!(parseFloat(values.price) % 1) == false
    ) {
      Notify.Failure('Price should be  decimal or cannot be empty')
    } else if (
      values.quantity.split('.').length == 2 ||
      values.price == '' ||
      Number.isInteger(parseInt(values.quantity)) == false
    ) {
      Notify.Failure('Qunantity should be number or cannot be empty')
    } else {
      AddProduct()
    }
  }

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center mt-5">
        <Form className="w-50">
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
              value={values.name}
              type="text"
              name="name"
              id="exampleEmail"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Description</Label>
            <Input
              value={values.description}
              type="textarea"
              name="description"
              id="examplePassword"
              placeholder="Description"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Price</Label>
            <Input
              value={values.price}
              type="text"
              name="price"
              id="exampleEmail"
              placeholder="Price"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail">Quantity</Label>
            <Input
              value={values.quantity}
              type="text"
              name="quantity"
              id="exampleEmail"
              placeholder="quantity"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              File
            </Label>
            <Col sm={10}>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={(e) => handleChange2(e)}
              />
              <FormText color="muted">
                This is some placeholder block-level help text for the above
                input. It's a bit lighter and easily wraps to a new line.
              </FormText>
            </Col>
          </FormGroup>
          <Button onClick={() => onSubmit()}>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => {
    dispatch(addProduct(product))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts)
