// components/MovieCard.stories.jsx
import { fn } from 'storybook/test';
import MovieCard from './MovieCard';

export default {
  title: 'Cine-Stream/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isFavorite: {
      control: 'boolean',
      description: 'Whether this movie is in the favorites list',
    },
  },
  args: {
    onToggleFavorite: fn(),
  },
};

export const Default = {
  args: {
    movie: {
      id: 1,
      title: 'Everything Everywhere All at Once',
      poster_path: 'media.themoviedb.org/t/p/w220_and_h330_face/tG6LbtboperBHLUKwY0RgUp6AZ3.jpg',
      vote_average: 7.8,
      release_date: '2022-03-24',
    },
    isFavorite: false,
  },
};

export const Favorited = {
  args: { ...Default.args, isFavorite: true },
};

export const NoPoster = {
  args: {
    ...Default.args,
    movie: { ...Default.args.movie, poster_path: null },
  },
};

export const NoRating = {
  args: {
    ...Default.args,
    movie: { ...Default.args.movie, vote_average: null },
  },
};