import React, { Component } from 'react'
import Descuento from "./Descuento"
import TiposDescuentos from "./TiposDescuentos.json"

class PoliticasDeDescuento extends Component {
    listaDeDescuentosAplicados() {
        let descuentos = []
        for (const key in this.props.descuentos) {
            if (this.props.descuentos.hasOwnProperty(key)) {
                const descuento = this.props.descuentos[key]
                descuentos.push(
                    <li key={`descuentoAplicado-${key}`}>
                        <Descuento 
                            nombre={key}
                            descuento={descuento}
                            politica={this.props.nombre}
                            editarDescuento={this.props.editarDescuento}
                            eliminarDescuento={this.props.eliminarDescuento}
                        />
                    </li>
                )
            }
        }
        return (
            <ul className="lista-descuentos">
                {
                    descuentos.length > 0 ? 
                        <h4>Lista de descuentos aplicados</h4>
                        : null
                }
                { descuentos }
            </ul>
        )
    }

    listaDePosiblesDescuentos() {
        return (
            <ul className="lista-descuentos">
                {
                    TiposDescuentos.map((descuento, index) => {
                        return (
                            <li key={`descuento-${index}`} style={{margin: '10px 20px'}}>
                                <span 
                                    className="button tiny" 
                                    style={{margin: '0px 20px 5px'}}
                                    onClick={() => this.props.agregarDescuento(this.props.nombre, descuento)}
                                >
                                +
                                </span>
                                {descuento.nombre} 
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="politicas-de-descuento">
                <h3> 
                    <button 
                        style={{margin: '0 20px'}} 
                        className="button alert tiny" 
                        onClick={() => this.props.eliminarPolitica(this.props.nombre)}
                    >
                        x
                    </button>
                    {this.props.nombre} 
                </h3>
                <h4>Lista de posibles descuentos</h4>
                { this.listaDePosiblesDescuentos() }
                { this.listaDeDescuentosAplicados() }
            </div>
        )
    }
}
    
export default PoliticasDeDescuento