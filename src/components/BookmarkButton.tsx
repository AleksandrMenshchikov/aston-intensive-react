import React, { useState } from 'react';
import { selectUser, updateUser } from '../redux/slices/user.slice';
import useAppDispatch from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { bookmarkFiilSVG, bookmarkSVG } from '../assets/svg/bookmark';
import { css } from '@mui/material';

export default function BookmarkButton({ filmId }: { filmId: string }) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser());
  const favorites = userData?.favorites;
  const [isMarked, setIsMarked] = useState(
    !!favorites?.find((id) => id === filmId)
  );
  const icon = isMarked ? bookmarkFiilSVG : bookmarkSVG;

  function handleClick() {
    const updatedFavorites = changeFavorites(filmId, isMarked);
    if (updatedFavorites) {
      setIsMarked((prev) => !prev);
      const newData = { favorites: updatedFavorites };
      dispatch(updateUser(newData));
    }
  }

  function changeFavorites(filmId: string, mark: boolean): string[] | void {
    if (favorites) {
      return !mark
        ? [...favorites, filmId]
        : [...favorites].filter((id) => filmId !== id);
    }
  }

  const buttonStyles = css({ cursor: 'pointer' });
  const bookmarkStyles = css({ background: 'none', position: 'absolute' });

  return (
    <div css={bookmarkStyles}>
      <button css={buttonStyles} type="button" onClick={handleClick}>
        {icon}
      </button>
    </div>
  );
}
