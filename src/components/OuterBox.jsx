import React, { Component } from 'react'

export class OuterBox extends Component {
    render() {
        return (
            <div className='d-flex' aria-disabled={this.props.able} >
                <div>
                    <br />
                    <span className='rounded border border-dark p-3 d-inline mx-3 fw-bold'>
                        {this.props.value}
                    </span>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default OuterBox