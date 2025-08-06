import React from 'react';

const AvatarSelectionModal = ({ unlockedAvatars, availableAvatars, onSelect, onClose }) => {
    // Asegurarnos de que los props sean arrays para evitar el error .map()
    const safeAvailableAvatars = availableAvatars || [];
    const safeUnlockedAvatars = unlockedAvatars || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Selecciona tu Avatar</h2>
                    <button onClick={onClose} className="text-3xl font-bold">&times;</button>
                </div>
                <div className="grid grid-cols-4 md-grid-cols-6 gap-4 max-h-[60vh] overflow-y-auto">
                    {safeAvailableAvatars.map(avatar => {
                        const isUnlocked = safeUnlockedAvatars.some(unlocked => unlocked.id === avatar.id);
                        return (
                            <div key={avatar.id} className="text-center">
                                <img
                                    src={`/avatars/${avatar.url}`}
                                    alt={avatar.nombre}
                                    className={`w-24 h-24 rounded-full object-cover border-4 transition-all
                                        ${isUnlocked ? 'border-green-500 cursor-pointer hover:scale-110' : 'border-gray-300 filter grayscale opacity-50'}`
                                    }
                                    onClick={() => isUnlocked && onSelect(avatar.url)}
                                />
                                <p className="text-sm mt-2">{avatar.nombre}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AvatarSelectionModal;