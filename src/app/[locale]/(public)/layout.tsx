import FlyoutWrapper from '@/features/components/flyout/FlyoutWrapper';
import Footer from '@/features/components/footer/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlyoutWrapper>
      {children}
      <Footer />
    </FlyoutWrapper>
  );
}
