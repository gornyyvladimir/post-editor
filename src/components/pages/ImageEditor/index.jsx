import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import styles from './ImageEditor.module.css';

class ImageEditor extends Component {
  state = {
    vertical: 0,
    horizontal: 0,
    scale: 2,
    transformScale: 1,
    width: 540,
    height: 540,
  };

  handleChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleClick = () => {
    this.setState({ transformScale: 2, width: this.state.width * 2, height: this.state.height * 2 }, () => {
      html2canvas(document.querySelector('#capture'), { scale: this.state.scale }).then(function(canvas) {
        document.querySelector('#result').appendChild(canvas);
      });
    });
  };

  render() {
    const { vertical, horizontal, renderCanvas } = this.state;
    return (
      <div>
        <div style={{ width: this.state.width, height: this.state.height }} className={styles.capture} id="capture">
          <div className={styles.imageWrapper} id="image">
            <div style={{ backgroundPosition: `${horizontal}% ${vertical}%` }} className={styles.backgroundImage} />
            <div className={styles.frontImage} />
          </div>
          <div
            style={{ transform: `scale(${this.state.transformScale})` }}
            className={styles.textWrapper}
            id="text"
          >
            <div className={styles.description}>
              <h1 className={styles.title} contenteditable="true">
                Таиланд из Казани
              </h1>
              <p className={styles.text} contenteditable="true">
                Горящие туры на вылет с 19 по 31 января
              </p>
              <h2 className={styles.price} contenteditable="true">
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
        <input
          type="number"
          value={this.state.scale}
          onChange={event => this.setState({ scale: event.target.value })}
        />
        <button type="button" onClick={this.handleClick}>
          Capture
        </button>
        <div id="result" />
      </div>
    );
  }
}

export default ImageEditor;
