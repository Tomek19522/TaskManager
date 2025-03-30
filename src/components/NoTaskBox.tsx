const NoTaskBox = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white py-12">
      <div className="text-4xl mb-4">🗒️</div>
      <h2 className="text-xl md:text-3xl font-bold mb-2">Brak zadań</h2>
      <p className="text-gray-400 md:text-lg mb-6">Nie masz żadnych zadań.</p>
    </div>
  );
};
export default NoTaskBox;
