import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import ConvexClientProvider from './_components/ConvexClientProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eraser - Docs and Diagrams for Engineering Teams',
  description:
    'Create diagrams, design docs, and visual documentation with your team. Your all-in-one technical ideation tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        <main>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
