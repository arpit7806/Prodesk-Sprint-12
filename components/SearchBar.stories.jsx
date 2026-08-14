export default {
  title: 'Cine-Stream/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the search input',
    },
  },
};

export const Default = {
  args: { disabled: false },
};

export const Disabled = {
  args: { disabled: true },
};

// keep your existing TypingAQuery play-function story as-is