import React, { Component } from 'react'

class Totales extends Component {
    aplicarDescuento(politica) {
        let total = this.totalesProductos()
        for (const key in politica) {
            if (politica.hasOwnProperty(key)) {
                const descuento = politica[key]
                switch (key) {
                    case 'Descuento plano':
                        total = {
                            ...total,
                            precio: descuento.campos[0].valor !== 0 ? total.precio - (total.precio * (descuento.campos[0].valor / 100)) :  total.precio
                        }
                        break
                    case 'Compra minima':
                        if (total.catidadProductos >= descuento.campos[0].valor) {
                            total = {
                                ...total,
                                precio: descuento.campos[1].valor !== 0 ? total.precio - (total.precio * (descuento.campos[1].valor / 100)) :  total.precio
                            }
                        }
                        break
                    case 'Compra maxima':
                        if (total.catidadProductos <= descuento.campos[0].valor) {
                            total = {
                                ...total,
                                precio: descuento.campos[1].valor !== 0 ? total.precio - (total.precio * (descuento.campos[1].valor / 100)) :  total.precio
                            }
                        }
                        break
                    case 'Gasto minimo':
                        if (total.precio >= descuento.campos[0].valor) {
                            total = {
                                ...total,
                                precio: descuento.campos[1].valor !== 0 ? total.precio - (total.precio * (descuento.campos[1].valor / 100)) :  total.precio
                            }
                        }
                        break    
                    case 'Gasto maximo':
                        if (total.precio <= descuento.campos[0].valor) {
                            total = {
                                ...total,
                                precio: descuento.campos[1].valor !== 0 ? total.precio - (total.precio * (descuento.campos[1].valor / 100)) :  total.precio
                            }
                        }
                        break                        
                    default:
                        break
                }
            }
        }
        return total
    }

    totalesProductos() {
        let total = {
            catidadProductos: 0,
            precio: 0
        }
        
        this.props.productos.forEach(producto => {
            total = {
                catidadProductos: total.catidadProductos + producto.cantidad,
                precio: total.precio + (producto.valor *  producto.cantidad)
            }
        })

        return total
    }

    listaDeTotales() {
        let lista = []
        for (const key in this.props.politicasDeDescuento) {
            if (this.props.politicasDeDescuento.hasOwnProperty(key)) {
                lista.push(
                    <React.Fragment key={`total-${key}`}>
                        <h3>{key}</h3>
                        <p>Total a pagar: {this.aplicarDescuento(this.props.politicasDeDescuento[key]).precio}</p>
                    </React.Fragment>
                )
            }
        }
        return lista
    }

    render() {
        return (
            <React.Fragment>
                <h3>Total: {this.totalesProductos().precio}</h3>
                {this.listaDeTotales()}
            </React.Fragment>
        )
    }
}

export default Totales