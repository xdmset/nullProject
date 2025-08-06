import Live from '../../assets/icons/heart.png';

export default function Lives({ lives }) {
  return (
    <div className="bg-black/50 rounded-xl px-3 py-1 flex items-center space-x-2 text-2xl text-red-500 shadow-md">
      <img src={Live} alt="Vida" className="w-6 h-6 animate-heartbeat" />
      <span className="text-white text-lg">x {lives}</span>
    </div>
  );
}
