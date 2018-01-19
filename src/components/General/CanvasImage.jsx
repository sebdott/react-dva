import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dexie from 'dexie';
import {Spin} from 'antd';

class CanvasImage extends Component {
  static PropTypes = {
    src: PropTypes.string.isRequired,
    imageKey: PropTypes.string.isRequired,
  };
  componentWillMount() {
    this.setState({imageStatus: 'loading'});
  }
  componentDidMount() {
    this.setState({
      imageURL: '',
    });
    const db = new Dexie('MyDatabase');
    db.version(1).stores({
      gameImages: 'key, blob',
    });
    db.open();
    this.renderCanvas(db);
  }
  handleImageLoaded() {
    this.setState({imageStatus: 'loaded'});
  }
  handleImageErrored() {
    this.setState({
      imageStatus: 'loaded',
      imageURL: '',
    });
  }
  renderCanvas(db, overWrite = false) {
    const {imageKey, src, width, height} = this.props;
    if (!window.sessionStorage[imageKey] || overWrite) {
      const img = new window.Image();
      img.src = src;
      if (this.imageCanvas) {
        const ctx = this.imageCanvas.getContext('2d');
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

          const isIE11 =
            !!window.MSInputMethodContext && !!document.documentMode;
          if (!isIE11) {
            try {
              this.imageCanvas.toBlob(
                blob => {
                  db.gameImages.put({
                    key: imageKey,
                    blob,
                  });
                  this.setState({
                    imageURL: URL.createObjectURL(blob),
                  });
                  window.sessionStorage[imageKey] = true;
                },
                'image/jpeg',
                0.75,
              );
            } catch (ex) {
              null;
            }
          }
          this.setState({imageStatus: 'loaded'});
        };
      }
    }
  }
  renderSpinner() {
    if (this.state.imageStatus === 'loading') {
      return (
        <span>
          <Spin
            size="small"
            style={{
              padding: '30% 0 0 44%',
            }}
          />
        </span>
      );
    }
  }
  renderImage() {
    const {imageKey, src, width, height, className} = this.props;

    if (this.state.imageURL) {
      return (
        <span>
          <img
            alt=""
            src={this.state.imageURL}
            className={className}
            onLoad={this.handleImageLoaded.bind(this)}
            onError={this.handleImageErrored.bind(this)}
          />
        </span>
      );
    }
    const imageProps = {
      src,
      width,
      height,
      className,
    };
    return (
      <div>
        {this.renderSpinner()}
        <canvas
          ref={image => {
            this.imageCanvas = image;
          }}
          key={imageKey}
          {...imageProps}
        />
      </div>
    );
  }
  render() {
    const {imageKey} = this.props;
    const db = new Dexie('MyDatabase');
    if (this.state.imageURL === '') {
      db.version(1).stores({
        gameImages: 'key, blob',
      });
      db.open();
      db.gameImages
        .where('key')
        .equals(imageKey)
        .count(count => {
          if (count <= 0) {
            this.renderCanvas(db, true);
          }
        });

      db.gameImages
        .where('key')
        .equals(imageKey)
        .each(gameImage => {
          if (this.imageCanvas) {
            this.setState({
              imageURL: URL.createObjectURL(gameImage.blob),
            });
          }
        });
    }

    return this.renderImage();
  }
}

export default CanvasImage;
