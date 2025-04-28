import { useState } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

const Searchbox2 = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <div >
            <div className="relative rounded flex items-center justify-between w-full font-poppins pl-4 pr-2 py-1 border border-gray-200 lg:w-[400px]">
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search here...."
                    className="w-full focus:outline-none"
                />
                <div

                    className="rounded flex p-2 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] cursor-pointer">
                    {searchText.trim() === '' ? (
                        <IoSearch size={24} />
                    ) : (
                        <IoClose size={24} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default Searchbox2;
