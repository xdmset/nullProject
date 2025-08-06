import React, { useState } from "react";

export default function Escenario({ children }) {
  const [background, setBackground] = useState("playa");

  const handleChange = (e) => {
    setBackground(e.target.value);
  };

  return (
    <div
      className="escenario-container"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fondo */}
      <img
        src={`/img/${background}.png`}
        alt={`Fondo ${background}`}
        className="bg-img"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10 }}>
        <h1>Selecciona un escenario</h1>
        <select value={background} onChange={handleChange}>
          <option value="playa">Playa</option>
          <option value="jungla">Jungla</option>
          <option value="castillo">Castillo</option>
          <option value="ciudad">Ciudad</option>
        </select>
      </header>

      {/* Aquí renderizas las banderas, cofre, etc */}
      <main style={{ position: "relative", zIndex: 10 }}>{children}</main>
    </div>
  );
}
