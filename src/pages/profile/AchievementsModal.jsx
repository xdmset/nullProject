import React from 'react';

// --- Assets para el caso de que no haya logros ---
import Locked from "../../assets/logo.png"; 

export function AchievementsModal({ onClose, achievements }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#412DB2]">Mis Logros</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {achievements && achievements.length > 0 ? (
            // 2. Mapea sobre los logros que vienen de la API
            achievements.map((logro) => (
              <div key={logro.id} className="bg-purple-100 rounded-lg p-3 flex items-center gap-3">
                <img 
                  // 3. Construye la ruta a la carpeta 'public'
                  src={`/insignias/${logro.insignia_url}`} // ✅ correcto
                //   src={/insignias/${logro.insignia_url}} 
                  alt={logro.nombre} 
                  className="w-10 h-10 object-contain" 
                />
                <div>
                  <p className="font-semibold text-purple-800">{logro.nombre}</p>
                  <p className="text-xs text-gray-600">{logro.descripcion}</p>
                </div>
              </div>
            ))
          ) : (
            // 4. Muestra un mensaje si no hay logros
            <div className="text-center py-8">
              <img src={Locked} alt="Sin logros" className="w-16 h-16 mx-auto opacity-50 mb-4" />
              <p className="font-semibold text-gray-700">¡Aún no has desbloqueado ningún logro!</p>
              <p className="text-sm text-gray-500">Sigue jugando para conseguir tu primera insignia.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#412DB2] text-white rounded hover:bg-purple-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AchievementsModal;