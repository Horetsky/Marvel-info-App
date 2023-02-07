import React, { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoadind, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const {loading, error, getAllComics, clearError} = useMarvelService();

    const shouldLog = useRef(true)
    useEffect(() => {
        if(shouldLog.current) {
            shouldLog.current = false;
            onRequestComicsLoaded(offset, true);
        }
    }, [])
    const onRequestComicsLoaded = (offset, initialLoading) => {
        initialLoading ? setNewComicsLoading(false) : setNewComicsLoading(true)
        clearError();
        getAllComics(offset)
            .then(rememberComics)
    }
    const rememberComics = (newComics) => {
        setComicsList(() => [...comicsList, ...newComics]);
        setNewComicsLoading(false);
        setOffset(() => offset + 8);
    }

    function renderComicsList (comics) {
        const list = comics.map((item, i) => {
            return (
                <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });

        return list;
    }

    const comics = renderComicsList(comicsList);
    const spinner = (loading && !newComicsLoadind) ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            <div className="comics__spinner">
                {errorMessage}
                {spinner}
            </div>
            <ul className="comics__grid">

                
                {comics}

            </ul>
            <button className="button button__main button__long"
                    disabled={newComicsLoadind}
                    onClick={() => onRequestComicsLoaded(offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;