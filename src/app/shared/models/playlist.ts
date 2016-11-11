import { Piece } from './piece'

export interface Playlist {
  name: string;
  pieces?: Piece[];
  isPrivate: boolean;
}
