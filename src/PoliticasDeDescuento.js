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
                        <button onClick={() => this.props.eliminarDescuento(this.props.nombre, key)}>
                        -
                        </button>
                        <Descuento 
                            nombre={key}
                            descuento={descuento}
                            politica={this.props.nombre}
                            editarDescuento={this.props.editarDescuento}
                        />
                    </li>
                )
            }
        }
        return (
            <ul className="lista-descuentos">
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
                            <li key={`descuento-${index}`}>
                                {descuento.nombre} 
                                <span onClick={() => this.props.agregarDescuento(this.props.nombre, descuento)}>+</span>
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
                <h3> {this.props.nombre} </h3>
                <h4>Lista de posibles descuentos</h4>
                { this.listaDePosiblesDescuentos() }
                <h4>Lista de descuentos aplicados</h4>
                { this.listaDeDescuentosAplicados() }
            </div>
        )
    }
}
    
export default PoliticasDeDescuento