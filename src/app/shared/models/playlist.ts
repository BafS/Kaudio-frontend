import { Track } from './track';

export interface Playlist {
  _id?: string;
  name: string;
  tracks_ref?: Track[];
  private: boolean;
}
