import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import styles from './ImageEditor.module.css';
import download from 'downloadjs';

class ImageEditor extends Component {
  initialState = {
    vertical: 0,
    horizontal: 0,
    scale: 1,
    width: 540,
    height: 540,
  };

  state = this.initialState;

  captureRef = React.createRef();

  handleChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleClick = () => {
    this.setState({ scale: 2, width: this.state.width * 2, height: this.state.height * 2 }, () => {
      html2canvas(this.captureRef.current).then(canvas => {
        const img = canvas.toDataURL('image/png');
        download(img, 'original', 'image/png');
        this.setState(this.initialState);
      });
    });
  };

  render() {
    const { vertical, horizontal } = this.state;
    return (
      <div>
        {this.state.loading && <div className={styles.loading}>LOADING</div>}
        <div
          style={{ width: this.state.width, height: this.state.height }}
          className={styles.capture}
          id="capture"
          ref={this.captureRef}
        >
          <div className={styles.imageWrapper} id="image">
            <div style={{ backgroundPosition: `${horizontal}% ${vertical}%` }} className={styles.backgroundImage} />
            <div className={styles.frontImage} />
          </div>
          <div style={{ transform: `scale(${this.state.scale})` }} className={styles.textWrapper} id="text">
            <div className={styles.description}>
              <h1 className={styles.title} contentEditable="true">
                Таиланд из Казани
              </h1>
              <p className={styles.text} contentEditable="true">
                Горящие туры на вылет с 19 по 31 января
              </p>
              <h2 className={styles.price} contentEditable="true">
                От 52 900 рублей
              </h2>
            </div>
            <div className={styles.sale}>
              <h2 className={styles.discount} contenteditable="true">
                -0%
              </h2>
            </div>
          </div>
        </div>
        <label>
          Vertical
          <input
            value={vertical}
            type="range"
            min="0"
            max="100"
            onChange={event => this.handleChange(event.target.value, 'vertical')}
          />
        </label>
        <label>
          Horizontal
          <input
            value={horizontal}
            type="range"
            min="0"
            max="100"
            onChange={event => this.handleChange(event.target.value, 'horizontal')}
          />
        </label>
        <button type="button" onClick={this.handleClick}>
          Capture
        </button>
        <div id="result" />
      </div>
    );
  }
}

export default ImageEditor;
