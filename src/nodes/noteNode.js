// noteNode.js — Sticky note / comment node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📌"
    >
      <div className="node-field">
        <label>Note</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Add a comment or note..."
        />
      </div>
    </BaseNode>
  );
};
