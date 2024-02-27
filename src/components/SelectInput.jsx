import React, { Component } from 'react'

export class SelectInput extends Component {
    render() {
        const selectInner = {
            margin: '0 4px', padding: '2px'
        }
        return (
            <>
                <input type={this.props.type} id={this.props.id} name={this.props.name} onChange={this.props.onChange} value={this.props.value} disabled={this.props.disabled} style={selectInner} />
                <label htmlFor={this.props.id} >{this.props.title}</label>
            </>
        )
    }
}

export default SelectInput