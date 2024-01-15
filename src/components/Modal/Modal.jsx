import { useEffect } from 'react';

export const Modal = ({ imageUrl, hideModal }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') {
        hideModal();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [hideModal]);

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={imageUrl} alt="big_image" className="LargeImg" />
      </div>
    </div>
  );
};
