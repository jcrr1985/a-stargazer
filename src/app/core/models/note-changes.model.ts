import { Note } from './note.model';

export interface NoteChanges {
  notesChanged: Note[];
  notesRemoved: Note[];
}
