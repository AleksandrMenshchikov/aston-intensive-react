import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
