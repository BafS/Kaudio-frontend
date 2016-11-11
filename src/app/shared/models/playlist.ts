import { Piece } from './piece';

export interface Playlist {
  id: number;
  name: string;
  pieces?: Piece[];
  isPrivate: boolean;
}
