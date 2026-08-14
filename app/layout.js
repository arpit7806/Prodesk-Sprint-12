import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Cine-Stream',
  description: 'Discover popular movies, powered by TMDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
