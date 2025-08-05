import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dojoBackground from "../../../assets/ia/DojoBackground.png";
import monoSabio from "../../../assets/ia/MonoSabio.png";
import perfilSabio from "../../../assets/ia/PerfilSabio.png";
import SendIcon from "../../../assets/icons/send.png";
import ResetIcon from "../../../assets/icons/reset.png";
import BackIcon from "../../../assets/icons/back0.png";

const ChatBotLSM = () => {
  const [pregunta, setPregunta] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const mensajesIniciales = [
    "¡Ah! Pequeña pulguita, viniste a verme, dime, ¿qué necesitas saber?",
    "¡Bienvenido, joven aprendiz! ¿Qué misterios del LSM deseas descubrir hoy?",
    "Veo que has llegado hasta mi dojo... ¿En qué puedo ayudarte con el lenguaje de señas?",
    "¡Saludos, estudiante! Mi sabiduría en LSM está a tu disposición. ¿Qué te interesa aprender?",
    "¿Otra alma curiosa en busca de conocimiento? Perfecto. ¿Qué dudas tienes sobre LSM?",
    "¡Hola, pequeña pulguita! ¿Qué secretos del mundo silencioso quieres conocer?",
    "Vaya, vaya... otro visitante en mi templo del saber. ¿Qué te trae por aquí?",
    "¡Excelente tiempo! Justo estaba meditando sobre LSM. ¿En qué puedo iluminarte?",
    "¿Listo para una nueva lección? Mi conocimiento sobre lenguaje de señas es infinito. ¡Pregunta!",
    "¡Aha! Detecté sed de conocimiento. ¿Qué aspecto del LSM te causa curiosidad hoy?",
    "Hazlo breve pequeño, tengo una cita con una belleza que conocí por internet y no quiero llegar tarde",
    "Mi conocimiento es infinito pequeño, quedarte con la duda sería la peor decisión en este momento",
    "Si tienes más dudas, doy clases los jueves. No cobro mucho.",
    "Pequeña pulguita!, hay una duda que agobia tu mente lo sé, ¿Qué es lo que tienes?"
  ];

  const obtenerMensajeInicial = () => {
    const i = Math.floor(Math.random() * mensajesIniciales.length);
    return mensajesIniciales[i];
  };

  const [conversacion, setConversacion] = useState([
    {
      id: 1,
      tipo: "bot",
      mensaje: obtenerMensajeInicial(),
      timestamp: new Date()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversacion]);

  const createTone = (frequency, duration, type = "sine") => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      console.warn("Sonido no disponible");
    }
  };

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    const nuevoMensajeUsuario = {
      id: Date.now(),
      tipo: "usuario",
      mensaje: pregunta,
      timestamp: new Date()
    };
    setConversacion(prev => [...prev, nuevoMensajeUsuario]);
    setPregunta("");
    setLoading(true);

    // sonido al enviar
    createTone(440, 0.15);

    try {
      const res = await fetch("https://n8n-n8n.vdsrem.easypanel.host/webhook/chatbot-lsm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });
      const data = await res.json();

      const nuevoMensajeBot = {
        id: Date.now() + 1,
        tipo: "bot",
        mensaje: data.respuesta,
        timestamp: new Date()
      };

      setConversacion(prev => [...prev, nuevoMensajeBot]);
    } catch {
      setConversacion(prev => [...prev, {
        id: Date.now() + 1,
        tipo: "bot",
        mensaje: "Error al contactar con el chatbot. Intenta más tarde.",
        timestamp: new Date()
      }]);
    }

    setLoading(false);
  };

  const reiniciarChat = () => {
    setConversacion([{
      id: 1,
      tipo: "bot",
      mensaje: obtenerMensajeInicial(),
      timestamp: new Date()
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarPregunta();
    }
  };

  const formatearMensaje = (mensaje) => {
    const lineas = mensaje.split("\n").filter(line => !line.startsWith("!["));
    const texto = lineas.join("\n");
    const imagenMatch = mensaje.match(/\]\((https?:\/\/.*?)\)/);
    const imagenUrl = imagenMatch ? imagenMatch[1] : null;
    return { texto, imagenUrl };
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* IZQUIERDA */}
      <div
        className="md:w-1/2 h-1/2 md:h-full relative"
        style={{
          backgroundImage: `url(${dojoBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.img
            src={monoSabio}
            alt="Mono Sabio"
            className="w-[400px] md:w-[500px] h-auto drop-shadow-xl"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>

      {/* DERECHA */}
      <div className="md:w-1/2 flex flex-col bg-white">
        <div className="bg-gradient-to-r from-[#005EB8] via-[#412DB2] to-[#7DF9FF] text-white p-4 sticky top-0 z-20 shadow-md flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-primary-200 rounded-full"
            aria-label="Volver"
          >
            <img src={BackIcon} alt="Volver" className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img src={perfilSabio} alt="Perfil Mono Sabio" className="w-10 h-10 rounded-full border-2 border-white" />
            <h3 className="font-bold">Mon Ki Hu</h3>
          </div>
          <button
            onClick={reiniciarChat}
            className="p-1 hover:bg-primary-200 rounded-full"
            aria-label="Reiniciar chat"
          >
            <img src={ResetIcon} alt="Reiniciar" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-200">
          {conversacion.map((mensaje) => {
            const { texto, imagenUrl } = formatearMensaje(mensaje.mensaje);
            return (
              <motion.div
                key={mensaje.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    mensaje.tipo === 'usuario'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{texto}</p>
                  {imagenUrl && (
                    <img
                      src={imagenUrl}
                      alt="Imagen de LSM"
                      className="mt-2 max-w-full rounded-lg border border-gray-200"
                    />
                  )}
                  <p className={`text-xs mt-1 ${mensaje.tipo === 'usuario' ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {mensaje.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-primary-200 text-gray-800 rounded-2xl shadow-md px-4 py-2 max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-white p-4">
          <div className="flex items-end space-x-2">
            <textarea
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 pr-12 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Escribe tu pregunta sobre LSM..."
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <button
              onClick={enviarPregunta}
              aria-label="Enviar pregunta"
              disabled={loading || !pregunta.trim()}
              className=" text-white p-2 rounded-full hover:bg-primary-200 disabled:opacity-50 transition-transform active:scale-90"
            >
              <img src={SendIcon} alt="Enviar" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotLSM;
