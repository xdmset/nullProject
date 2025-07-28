export default function FeedbackMessage({ message, type }) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white text-lg shadow-lg transition-opacity duration-300 ${bgColor}`}>
      {message}
    </div>
  );
}
