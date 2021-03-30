import {useState, useEffect} from 'react';

import {Button} from '../components/Button';

import {api} from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SelectedGenreIdProps {
  onSelectedGenreId: (id:number) => void;
  selectedId: number;
}

export function SideBar({ onSelectedGenreId, selectedId }: SelectedGenreIdProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectedGenreId(genre.id)}
            selected={selectedId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}