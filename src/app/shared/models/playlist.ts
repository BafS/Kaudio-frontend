import { Track } from './track';

export interface Playlist {
  _id?: string;
  name: string;
  description?: string;
  tracks_ref?: Track[];
  public: boolean;
}
