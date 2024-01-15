import { Component } from 'react';

export class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.hideModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.hideModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={imageUrl} alt="big_image" className="LargeImg" />
        </div>
      </div>
    );
  }
}
