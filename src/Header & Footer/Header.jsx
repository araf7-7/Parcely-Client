
import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../FirebaseProvider/FirebaseProvider';
import { IoIosNotificationsOutline } from 'react-icons/io';
const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    // console.log(user.displayName);
    const navOptions = <>
        <Link to='/'>
            <li className="group flex  cursor-pointer flex-col">
                Home<span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-black transition-all duration-400 group-hover:w-full"></span>
            </li>
        </Link>
        <Link to='dashboard'>
            <li className="group flex  cursor-pointer flex-col">
                Dashboard<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
        </Link>



    </>
    const navOption2 =
        <>
            {
                user ?
                    <>
                        <IoIosNotificationsOutline className='text-2xl' />
                        <span>

                            <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
                                <img src={user?.photoURL} className='w-10 rounded-full ' alt="User Image" />
                                <ul tabIndex={0} className="dropdown-content justify-start z-[1] menu  shadow text-black bg-base-100 rounded-box w-40">
                                    <li className='text-xl font-extrabold mb-2'>{user?.displayName}</li>
                                    <Link to='/updateProfile'><li className='text-base mb-2 font-bold hover:text-slate-600'>Update Profile</li></Link>
                                    <Link to='/dashboard'><li className=' text-base mb-2 font-bold hover:text-slate-600'>Dashboard</li></Link>
                                    <button onClick={handleLogOut} className='btn bg-black text-white hover:text-black border-0'>Log Out </button>
                                </ul>

                            </div>
                        </span>

                    </> :
                    <>
                        <Link to='/login'>
                            <button className='btn bg-black text-white hover:text-black border-0'>Log In </button>
                        </Link>
                    </>

            }
        </>
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();

    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);
    return (
        <div className="">
            <nav className="flex  w-full lg:w-full   bg-opacity-70 items-center justify-between bg-transparent  px-4  text-black font-abc text-lg font-medium ">
                <div className="scale-100 flex justify-center items-center  cursor-pointer  transition-all duration-200 hover:scale-110">
                    <img className='w-[90px] h-[80px]' src="https://i.ibb.co/p0xHgqx/Red-Modern-Business-Truck-Car-Negative-Space-Logo-removebg-preview.png" alt="" />
                    <h1 className='text-3xl'>Parcely</h1>
                </div>
                <ul className="hidden items-center justify-between gap-10 md:flex">
                    {navOptions}
                    {navOption2}
                </ul>

                <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform gap-5 justify-center items-center md:hidden">
                    {
                        user ?
                            <>
                                <IoIosNotificationsOutline className='text-2xl' />
                            </> :
                            <>
                                { }
                            </>
                    }
                    <span className=''>
                        <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">

                            <img src={user?.photoURL} className='w-10 rounded-full ' alt="" />
                            <ul tabIndex={0} className="dropdown-content justify-start z-[1] menu  shadow text-black bg-base-100 rounded-box w-40">
                                <li className='text-xl font-extrabold mb-2'>{user?.displayName}</li>
                                <Link to='/updateProfile'><li className='text-base mb-2 font-bold hover:text-slate-600'>Update Profile</li></Link>
                                <Link to='/dashboard'><li className=' text-base mb-2 font-bold hover:text-slate-600'>Dashboard</li></Link>
                                <button onClick={handleLogOut} className='btn bg-black text-white hover:text-black border-0'>Log Out </button>
                            </ul>
                        </div>

                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                    {dropDownState && (

                        <ul className=" z-10  gap-2  bg-white p-2 text-black absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">
                            {navOptions}

                            <Link to='/login'>
                                <button className='btn btn-block bg-black text-white hover:text-black border-0'>Log In </button>
                            </Link>
                        </ul>

                    )
                    }
                </div>
            </nav>
            <div className='divider mt-0 mb-4'>

            </div>
        </div>
    );
};

export default Header;
