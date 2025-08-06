import { useParams, Navigate } from 'react-router-dom';
import JLevelScreen from './jungla/JLevelScreen';
import LevelScreen from './ciudad/LevelScreen'; 
import CLevelScreen from './castillo/CLevelScreen';
import BLevelScreen from './playa/BLevelScreen'; 
import SLevelScreen from './secret/SLevelScreen'; 

export default function LevelRouter() {
  const { world, id } = useParams();

  switch (world.toLowerCase()) {
    case 'playa':
      return <BLevelScreen id={id} />;
    case 'ciudad':
      return <LevelScreen id={id} />;
    case 'jungla':
      return <JLevelScreen id={id} />;
    case 'castillo':
      return <CLevelScreen id={id} />;
    case 'secret':
      return <SLevelScreen id={id} />;
    default:
      return <Navigate to="/" replace />;
  }
}
