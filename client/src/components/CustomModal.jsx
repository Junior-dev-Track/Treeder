import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../style/components/_scrollbar.scss';

const getCustomStyles = () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return {
    content: {
      padding: '3px',
      width: isMobile ? '80%' : '50%',
      margin: 'auto',
      height: isMobile ? '85%' : '50%',
      backgroundColor: '#F8F3EE',
      borderRadius: '30px',
      border: 'none',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  };
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  const [customStyles, setCustomStyles] = useState(getCustomStyles());
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (!isScrolling) setIsScrolling(true);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const handleTouch = () => {
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
  
    const modalContent = document.querySelector('.customScrollContainer');
    if (modalContent) {
      modalContent.addEventListener('touchstart', handleTouch);
      modalContent.addEventListener('touchmove', handleTouch);
      modalContent.addEventListener('touchend', handleTouch);
    }
  
    return () => {
      if (modalContent) {
        modalContent.removeEventListener('touchstart', handleTouch);
        modalContent.removeEventListener('touchmove', handleTouch);
        modalContent.removeEventListener('touchend', handleTouch);
      }
    };
  }, []);


  // Mettre à jour les styles en cas de changement de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setCustomStyles(getCustomStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      onScroll={handleScroll}
    >
      <div className={`customScrollContainer ${isScrolling ? 'showScrollbar' : ''}`}>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;