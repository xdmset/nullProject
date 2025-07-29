import Logro1 from "../../assets/logros/Ccastillo.png";
import Logro2 from "../../assets/logros/Ccastillo.png";
import Logro3 from "../../assets/logros/Ccastillo.png";
import Logro4 from "../../assets/logros/Ccastillo.png";
import Logro5 from "../../assets/logros/Ccastillo.png";
import Logro6 from "../../assets/logros/Ccastillo.png";
import Logro7 from "../../assets/logros/Ccastillo.png";
import Logro8 from "../../assets/logros/Ccastillo.png";
import Logro9 from "../../assets/logros/Ccastillo.png";
import Logro10 from "../../assets/logros/Ccastillo.png";

export function AchievementsModal({ onClose }) {
  const allAchievements = [
    { icon: Logro1, title: "En llamas", description: "Racha de 2 días" },
    { icon: Logro2, title: "Filósofo", description: "Primer mundo completado" },
    { icon: Logro3, title: "Intelectual", description: "5 señas nuevas" },
    { icon: Logro4, title: "Campeón", description: "Gana 5 competencias" },
    { icon: Logro5, title: "Lector", description: "Completa 10 cursos" },
    { icon: Logro6, title: "Constante", description: "Estudia un mes" },
    { icon: Logro7, title: "Estrella", description: "Recibe 1000 estrellas" },
    { icon: Logro8, title: "Velocidad", description: "Completa 1 nivel en menos de 30s" },
    { icon: Logro9, title: "Explorador", description: "Visita todos los mundos" },
    { icon: Logro10, title: "Maestro", description: "Domina todas las señas" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#412DB2]">Todos los Logros</h2>
        <div className="flex flex-col gap-3">
          {allAchievements.map((a, idx) => (
            <div key={idx} className="bg-purple-100 rounded-lg p-3 flex items-center gap-3">
              <img src={a.icon} alt={a.title} className="w-10 h-10 object-contain" />
              <div>
                <p className="font-semibold text-purple-800">{a.title}</p>
                <p className="text-xs text-gray-600">{a.description}</p>
              </div>
            </div>
          ))}
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