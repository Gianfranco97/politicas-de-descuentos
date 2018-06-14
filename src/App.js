import React, { Component } from 'react'
import PoliticasDeDescuento from "./PoliticasDeDescuento"
import Totales from './Totales'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      politicasDeDescuento: {},
      productos: this.generarListaDeProductos()
    }
    this.numeroDePoliticas = 0
  }

  cambiarEstado(nombre, valor) {
    this.setState({
      [nombre]: valor
    })
  }

  numeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  generarListaDeProductos() {
    let productos = []
    for (let index = 1; index <= 5; index++) {
      productos.push({
          nombre: `producto ${index}`,
          valor: this.numeroAleatorio(100, 5000),
          cantidad: this.numeroAleatorio(1, 10)
      })
    }
    return productos
  }

  agregarPoliticaDeDescuento = () => {
    ++this.numeroDePoliticas
    this.setState({
      politicasDeDescuento: {
        ...this.state.politicasDeDescuento,
        [`Politica ${this.numeroDePoliticas}`]: {}
      }
    })
  }

  agregarDescuento = (politica, descuento) => {
    this.setState({
      politicasDeDescuento: {
        ...this.state.politicasDeDescuento,
        [politica]: {
          ...this.state.politicasDeDescuento[politica],
          [descuento.nombre]: {...descuento}
        }
      }
    })
  }

  listaDePoliticas = () => {
    let lista = []
    for (const key in this.state.politicasDeDescuento) {
      if (this.state.politicasDeDescuento.hasOwnProperty(key)) {
        const politica = this.state.politicasDeDescuento[key]
        lista.push(
          <React.Fragment key={key}>
            <PoliticasDeDescuento 
              nombre={key} 
              descuentos={politica} 
              agregarDescuento={this.agregarDescuento} 
              editarDescuento={this.editarDescuento}
              eliminarDescuento={this.eliminarDescuento} 
              eliminarPolitica={this.eliminarPolitica}
            />
          </React.Fragment>
        )
      }
    }
    return lista
  }

  listaDeProductos = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio por unidad</th>
            <th>Precio a pagar</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.productos.map((producto, index) => {
              return (
                <tr key={producto.nombre}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.valor} BsS.</td>
                  <td>{producto.valor * producto.cantidad} BsS.</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  actualizarObjetoEnUnArray(array, action) {
    return array.map( (item, index) => {
        if(index !== action.index) {
            return item
        }
        return {
            ...item,
            ...action.item
        }
    })
  }

  editarDescuento = (politica, descuento, index, e) => {
    this.setState({
      politicasDeDescuento: {
        ...this.state.politicasDeDescuento,
        [politica]: {
          ...this.state.politicasDeDescuento[politica],
          [descuento]: {
            ...this.state.descuento,
            campos: this.actualizarObjetoEnUnArray(this.state.politicasDeDescuento[politica][descuento].campos, {index, item: {valor: e.target.value}})
          }
        }
      }
    })
  }

  removerPropiedad = (obj, property) => {
    return  Object.keys(obj).reduce((acc, key) => {
      if (key !== property) {
        return {...acc, [key]: obj[key]}
      }
      return acc
    }, {})
  }

  eliminarPolitica = (politica) => {
    this.setState({
      politicasDeDescuento: this.removerPropiedad(this.state.politicasDeDescuento, politica)
    })
  }

  eliminarDescuento = (politica, descuento) => {
    this.setState({
      politicasDeDescuento: {
        ...this.state.politicasDeDescuento,
        [politica]: this.removerPropiedad(this.state.politicasDeDescuento[politica], descuento)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Generador de descuentos</h1>
        </header>
        <div className="App-content">
          <h2>Mis politicas de descuento</h2>
          { this.listaDePoliticas() }
          <button className="button" onClick={this.agregarPoliticaDeDescuento}>
            Agregar nueva politica
          </button>
          <h2>Lista de productos</h2>
          { this.listaDeProductos() }
          <Totales productos={this.state.productos} politicasDeDescuento={this.state.politicasDeDescuento}/>
        </div>
      </div>
    )
  }
}

export default App
