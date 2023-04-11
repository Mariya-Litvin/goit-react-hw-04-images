import { useState } from 'react';
import { Searchbar } from './Seachbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapper } from './App.styled';
import Notiflix from 'notiflix';
import { resultSearch } from './api/api';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isOpen, setIsOpen] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const options = {
      searchQuery: searchQuery,
      page: page,
    };
    if (searchQuery || page !== 1) {
      async function getImages() {
        try {
          const response = await resultSearch(options);
          const arr = response.hits.map(el => ({
            tags: el.tags,
            webformatURL: el.webformatURL,
            largeImageURL: el.largeImageURL,
            id: el.id,
          }));

          if (arr && arr.length > 0) {
            setArticles(prev => [...prev, ...arr]);
            setIsLoading(false);
          }
          if (arr.length === 0) {
            setIsLoading(false);
            return Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        } catch (error) {
          setIsLoading(false);
          Notiflix.Notify.failure(
            'Sorry, something went wrong, please try again later',
            error
          );
        }
      }
      getImages();
    }
  }, [searchQuery, page]);

  // useEffect(() => {
  //   const options = {
  //     searchQuery: searchQuery,
  //     page: page,
  //   };
  //   if (page !== 1) {
  //     async function getImages() {
  //       try {
  //         const response = await resultSearch(options);
  //         const arr = response.hits.map(el => ({
  //           tags: el.tags,
  //           webformatURL: el.webformatURL,
  //           largeImageURL: el.largeImageURL,
  //           id: el.id,
  //         }));
  //         setArticles(prev => [...prev, ...arr]);
  //         setIsLoading(false);
  //       } catch (error) {
  //         setIsLoading(false);
  //         Notiflix.Notify.failure(
  //           'Sorry, something went wrong, please try again later',
  //           error
  //         );
  //       }
  //     }
  //   }
  //   getImages();
  // }, [page, searchQuery]);

  const handleSubmit = name => {
    if (name !== searchQuery && name) {
      setSearchQuery(name);
      setPage(1);
      setArticles([]);
      setIsLoading(true);
    }
  };

  const handleBigImg = img => {
    setBigImage(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const loadMoreCards = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
  };

  const onButtonVisible = () => {
    if (articles && articles.length < Number(page * per_page)) {
      return false;
    } else return true;
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery articles={articles} onBigImg={handleBigImg} />
      {isOpen && <Modal bigImage={bigImage} closeModal={closeModal} />}
      {onButtonVisible() && <Button onClickButton={loadMoreCards} />}
      {isLoading && <Loader />}
    </AppWrapper>
  );
};
