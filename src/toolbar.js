// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const addNodeByType = useStore((state) => state.addNodeByType);
  
    return (
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar-inner">
                <span className="toolbar-label">Nodes</span>
                <DraggableNode type='customInput' label='Input' icon='📥' onClick={addNodeByType} />
                <DraggableNode type='llm' label='LLM' icon='🤖' onClick={addNodeByType} />
                <DraggableNode type='customOutput' label='Output' icon='📤' onClick={addNodeByType} />
                <DraggableNode type='text' label='Text' icon='📝' onClick={addNodeByType} />
                <DraggableNode type='note' label='Note' icon='📌' onClick={addNodeByType} />
                <DraggableNode type='api' label='API' icon='🌐' onClick={addNodeByType} />
                <DraggableNode type='filter' label='Filter' icon='🔍' onClick={addNodeByType} />
                <DraggableNode type='timer' label='Timer' icon='⏱️' onClick={addNodeByType} />
                <DraggableNode type='math' label='Math' icon='🔢' onClick={addNodeByType} />
            </div>
        </div>
    );
};
