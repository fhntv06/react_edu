import './Modal.css'

import React from 'react'
import ReactModal from 'react-modal';

export default class Modal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      setIsOpen: this.props.setIsOpen
    }
    this.handleAfterOpenFunc = this.handleAfterOpenFunc.bind(this)
  }

  // после открытия
  handleAfterOpenFunc () {
    document.querySelector('body').style.backgroundColor = this.props.id
  }
  // после закрытия
  handleAfterCloseFunc () {
    document.querySelector('body').style.backgroundColor = ''
  }
  
  render () {
    return (
      <div>
        <ReactModal
          id={this.props.id}
          isOpen={this.props.isOpen}
          onAfterOpen={this.handleAfterOpenFunc}
          onAfterClose={this.handleAfterCloseFunc}
          onRequestClose={this.props.onRequestClose}
          style={this.props.style}
          contentLabel="Example Modal"

          closeTimeoutMS={0}

          overlayClassName={"modal-overlay"}

          className={'modal'}

          bodyOpenClassName={"Body-overflow"}

          ariaHideApp={true}

          shouldFocusAfterRender={true}

          shouldCloseOnOverlayClick={true}

          parentSelector={() => document.querySelector('body')}
          >
          <p>Modal Content | {this.props.id.split('').map((word, index) => {return ( `${word}[${index}] `)} ).reverse().join(' | ')} |</p>
          <button name={this.props.id} onClick={this.props.onRequestClose}>close</button>
        </ReactModal>
      </div>
    )
  }
}

ReactModal.setAppElement('#root');
