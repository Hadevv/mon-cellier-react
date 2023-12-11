import { Head } from '@/components/Head';
import Navigation from '@/components/Navigation';

export default function AppLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <Navigation />
            <div className='mt-[90px]' />
            <main>{children}</main>
        </>
    );
}
