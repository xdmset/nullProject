import React from 'react';

export default function AvatarSelectionModal({ onClose, onSelectAvatar, avatars, locked }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-[#412DB2]">Selecciona tu Avatar</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {avatars.map((avatar) => (
            <img
              key={avatar.id}
              src={`/avatars/${avatar.url}`}
              alt={avatar.nombre}
              className="cursor-pointer border-2 border-transparent hover:border-purple-500 rounded transition-transform hover:scale-105"
              onClick={() => onSelectAvatar(avatar.url)}
            />
          ))}
          {locked.map((avatar, idx) => (
            <img
              key={`locked-${idx}`}
              src={`/avatars/${avatar.url}`}
              alt="Avatar bloqueado"
              className="opacity-50 cursor-not-allowed"
            />
          ))}
        </div>
      </div>
    </div>
  );
}