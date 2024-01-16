import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as ImageService from 'Service/image-service';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { nanoid } from 'nanoid';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');

  const onFormSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setTotal(0);
    setError(null);
  };

  useEffect(() => {
    const getApi = async (query, page) => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await ImageService.getImages(query, page);
        setImages(prev => [...prev, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') {
      getApi(query, page);
    }
  }, [query, page]);

  const onClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onImageClick = largeUrl => {
    setLargeUrl(largeUrl);
  };

  const hideModal = () => {
    setLargeUrl('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onFormSubmit} />
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
              onClick={onImageClick}
            />
          ))}
        </ImageGallery>
      )}
      {largeUrl !== '' && <Modal imageUrl={largeUrl} hideModal={hideModal} />}
      {images.length > 0 && total > images.length && (
        <Button onClick={onClickLoadMore} />
      )}
    </div>
  );
};
