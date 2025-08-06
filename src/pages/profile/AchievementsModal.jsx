import React from 'react';

const AchievementsModal = ({ allAchievements, unlockedAchievements = [], onClose }) => {
  // Creamos un conjunto con los IDs de logros desbloqueados
  const unlockedIds = new Set(unlockedAchievements.map(logro => logro?.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mis Logros</h2>
          <div className="text-sm text-gray-600">
            Logros desbloqueados: {unlockedAchievements.length}
          </div>
          <button onClick={onClose} className="text-3xl font-bold">&times;</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto">
          {allAchievements.length > 0 ? (
            allAchievements.map(logro => {
              const isUnlocked = unlockedIds.has(logro.id);
              return (
                <div key={logro.id} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img 
                      src={`/logros/${logro.insignia_url}`} 
                      alt={logro.nombre}
                      className={`w-24 h-24 object-contain transition-all ${!isUnlocked && 'filter grayscale opacity-50'}`}
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                        <span className="text-4xl text-white font-bold" style={{ textShadow: '0 0 5px black' }}>?</span>
                      </div>
                    )}
                  </div>
                  <h3 className={`font-bold mt-2 ${!isUnlocked && 'text-gray-500'}`}>{logro.nombre}</h3>
                  <p className="text-xs text-gray-500">{logro.descripcion}</p>
                  {isUnlocked && (
                    <span className="text-xs text-green-500 mt-1">¡Desbloqueado!</span>
                  )}
                </div>
              );
            })
          ) : (
            <p>No hay logros para mostrar en el sistema.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsModal;