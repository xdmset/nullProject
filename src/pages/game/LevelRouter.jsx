import { useParams, Navigate } from 'react-router-dom';
import JLevelScreen from './jungla/JLevelScreen';
import LevelScreen from './ciudad/LevelScreen'; 
import CLevelScreen from './castillo/CLevelScreen';
import BLevelScreen from './playa/BLevelScreen'; 

export default function LevelRouter() {
  const { world, id } = useParams();

  switch (world.toLowerCase()) {
    case 'jungla':
      return <JLevelScreen id={id} />;

    case 'ciudad':
      return <LevelScreen id={id} />;

     case 'playa':
       return <BLevelScreen id={id} />;

    case 'castillo':
      return <CLevelScreen id={id} />;

    default:
      return <Navigate to="/" replace />;
  }
}
