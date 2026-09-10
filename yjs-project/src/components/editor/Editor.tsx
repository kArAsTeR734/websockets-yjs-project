import { EditorContent } from '@tiptap/react';
import './Editor.css';
import { useTipTapEditor } from '../../features/hooks/useTipTapEditor.ts';
import { useCollaboration } from '../../features/hooks/useCollaboration.ts';

export const Editor = () => {
  const { doc } = useCollaboration();

  const editor = useTipTapEditor(doc);
  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};
