// draggableNode.js

export const DraggableNode = ({ type, label, icon, onClick }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={() => onClick && onClick(type)}
        draggable
      >
          {icon && <span className="node-icon">{icon}</span>}
          <span>{label}</span>
      </div>
    );
  };