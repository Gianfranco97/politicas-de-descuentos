import React, { Component } from 'react'

class Descuento extends Component {
    render() {
      return (
        <div className="descuento">
            <p>
              <button 
                className="button alert tiny" 
                style={{margin: '5px'}}
                onClick={() => this.props.eliminarDescuento(this.props.politica, this.props.nombre)}
              >
                x
              </button>
              {this.props.nombre}
            </p>
            {
              this.props.descuento.campos.map((campo, index) => {
                return (
                  <React.Fragment key={`descuento-input-${index}`}>
                    <label> {campo.label} </label>
                    <input
                      name={campo.nombre}
                      value={campo.valor}
                      type="number"
                      onChange={e => this.props.editarDescuento(this.props.politica, this.props.nombre, index, e)}
                      placeholder={campo.placeholder}
                      {...campo.propsAdicionales}
                    />
                  </React.Fragment>
                )
              })
            }
        </div>
      )
    }
  }
  
  export default Descuento