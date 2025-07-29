import { useParams, Navigate } from 'react-router-dom';
import JLevelScreen from './jungla/JLevelScreen';
import LevelScreen from './ciudad/LevelScreen'; // para Playa
import CLevelScreen from './castillo/CLevelScreen'; // para Ciudad
// import TLevelScreen from './TLevelScreen'; // para Castillo (ejemplo)

export default function LevelRouter() {
  const { world, id } = useParams();

  switch (world.toLowerCase()) {
    case 'jungla':
      return <JLevelScreen id={id} />;

    case 'ciudad':
      return <LevelScreen id={id} />;

    // case 'ciudad':
    //   return <CLevelScreen id={id} />;

    case 'castillo':
      return <CLevelScreen id={id} />;

    default:
      return <Navigate to="/" replace />;
  }
}
