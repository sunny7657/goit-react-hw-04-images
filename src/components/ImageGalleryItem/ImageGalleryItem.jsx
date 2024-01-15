export const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags, largeImageURL } = image;

  const handleClick = () => {
    onClick(largeImageURL);
  };
  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};
