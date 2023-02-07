import React, { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(120);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useMarvelService();

    const shouldLog = useRef(true);
    useEffect(() => {
        if(shouldLog.current) {
            shouldLog.current = false;
            onRequest(offset, true);
        }
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    const onCharLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }

        setCharList(() => [...charList, ...newChars]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended)
    }

    const focusRefs = useRef([]);

    const focuseOnChar = (id) => {
        focusRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        focusRefs.current[id].classList.add('char__item_selected')
    }

    function renderChars (chars) {
        const list = chars.map((item, i) => {
            let notFundStyle = {};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                notFundStyle = {'objectFit' : 'contain'}; 
            }
            return (
                <li className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={(el) => focusRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focuseOnChar(i)
                        }}
                    onKeyPress={(e) => {
                       if(e.key === 'Enter') {
                        this.props.onCharSelected(item.id);
                        this.focuseOnChar(i)
                       }
                    }}
                >
                     <img src={item.thumbnail} alt="abyss" style={notFundStyle}/>
                     <div className="char__name">{item.name}</div>
                </li> 
            )
        });

        return list;
    }
        
    const items = renderChars(charList);
    // const content = !(loading || error) ? items : null;
    const spinner = (loading && !newItemLoading) ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    

    return (
        <div className="char__list">
            <div className="char__spinner">
                {errorMessage}
                {spinner}
            </div>
            <ul className="char__grid">
                {items}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;