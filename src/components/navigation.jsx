import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import NavigationLink from './NavigationLink';
import { PiWineFill } from "react-icons/pi";

export default function Navigation() {
    return (
        <header className='relative z-[50] hidden md:block'>
            <div className='fixed left-1/2 top-0 h-[4.5rem] w-full -translate-x-1/2'>
                <nav className='border-b border-border/80 bg-transparent px-6 py-5 backdrop-blur'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-8'>
                            <Link to={'/'}>
                                <PiWineFill
                                    className='text-primary'
                                    size={45}
                                />
                            </Link>
                            <div className='flex items-center gap-x-4'>
                                <NavigationLink url='/' value={'home'} />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <ThemeToggle />
                            <Link
                                to={'/login'}
                                className={buttonVariants({                                 
                                    size: 'default',
                                    className: 'h-[2.7rem]',
                                })}>
                                Login
                            </Link>
                            <Link
                                to={'/register'}
                                className={buttonVariants({
                                    size: 'default',
                                    className: 'h-[2.7rem]',
                                })}>
                                Register
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
