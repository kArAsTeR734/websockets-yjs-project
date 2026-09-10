import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import Collaboration from '@tiptap/extension-collaboration';
import { Doc } from 'yjs';

export const useTipTapEditor = (doc: Doc) => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),

      Collaboration.configure({
        document: doc,
      }),
    ],
    content: '<h1>Hello World!</h1>',

    editable: true,
    autofocus: true,
  });
};
