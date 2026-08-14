
import { within, userEvent, expect } from 'storybook/test';
import SearchBar from './SearchBar';

export default {
  title: 'Cine-Stream/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
};

export const Default = {};

export const TypingAQuery = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('search movies...');
    await userEvent.type(input, 'inception');
    await expect(input).toHaveValue('inception');
  },
};