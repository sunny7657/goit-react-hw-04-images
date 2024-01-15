import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as ImageService from 'Service/image-service';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    isLoading: false,
    largeUrl: '',
  };

  onFormSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      total: 0,
      error: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getApi(query, page);
    }
  }

  getApi = async (query, page) => {
    if (this.state.query === '') return;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageClick = largeUrl => {
    this.setState({ largeUrl });
  };

  hideModal = () => {
    this.setState({ largeUrl: '' });
  };

  render() {
    const { query, images, total, error, isLoading, largeUrl } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onFormSubmit} />
        {isLoading && <Loader />}
        {error && <h2 style={{ textAlign: 'center' }}>Error {error}</h2>}
        {images.length === 0 && query !== '' && !isLoading && (
          <h2 style={{ textAlign: 'center' }}>There is no matches 😒</h2>
        )}
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem
                key={nanoid()}
                image={image}
                onClick={this.onImageClick}
              />
            ))}
          </ImageGallery>
        )}
        {largeUrl !== '' && (
          <Modal imageUrl={largeUrl} hideModal={this.hideModal} />
        )}
        {images.length > 0 && total > images.length && (
          <Button onClick={this.onClickLoadMore} />
        )}
      </div>
    );
  }
}
