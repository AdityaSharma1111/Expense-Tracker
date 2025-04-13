import React, { useRef, useState } from 'react';
import { LuUser, LuTrash, LuUpload } from 'react-icons/lu';

function ProfilePicSelector({ image, setImage }) {
    const ref = useRef(null);
    const [previewURL, setPreviewURL] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewURL(null);
    };

    const onChooseFile = () => {
        ref.current.click();
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <input 
                type="file" 
                accept="image/*"
                ref={ref}
                onChange={handleImageChange} 
                className="hidden"
            />

            {image ? (
                <div className="relative">
                    <img 
                        src={previewURL} 
                        alt="profile pic" 
                        className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                    />
                    <button 
                        type="button" 
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition duration-200"
                    >
                        <LuTrash size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-400 p-4">
                        <LuUser size={40} className="text-gray-500" />
                    </div>
                    <button 
                        type="button" 
                        onClick={onChooseFile}
                        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-blue-600 transition duration-200"
                    >
                        <LuUpload size={16} />
                        Upload
                    </button>
                </div>

            )}
        </div>
    );
}

export default ProfilePicSelector;
