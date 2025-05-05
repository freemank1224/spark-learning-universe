import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableProps {
  children: React.ReactNode;
  initialPosition?: Position;
  bounds?: string | React.RefObject<HTMLElement>;
  onPositionChange?: (position: Position) => void;
  zIndex?: number;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  initialPosition = { x: 0, y: 0 },
  bounds = 'parent',
  onPositionChange,
  zIndex = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 只有点击的是拖动元素本身时才触发拖动
    e.preventDefault();
    setIsDragging(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !elementRef) return;

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // 边界检查
    if (bounds) {
      let containerElement: HTMLElement | null = null;
      let containerRect: DOMRect;
      
      if (bounds === 'parent' && elementRef.parentElement) {
        containerElement = elementRef.parentElement;
      } else if (bounds === 'window') {
        containerRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      } else if (typeof bounds !== 'string' && bounds.current) {
        containerElement = bounds.current;
      }
      
      if (containerElement) {
        containerRect = containerElement.getBoundingClientRect();
      } else if (!containerRect) {
        // 默认使用窗口作为边界
        containerRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      }

      const elementRect = elementRef.getBoundingClientRect();
      const elementWidth = elementRect.width;
      const elementHeight = elementRect.height;

      // 计算相对于容器的位置
      const containerX = containerRect.left;
      const containerY = containerRect.top;
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // 限制在容器内
      newX = Math.max(0, Math.min(newX, containerWidth - elementWidth));
      newY = Math.max(0, Math.min(newY, containerHeight - elementHeight));
    }

    const newPosition = { x: newX, y: newY };
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  }, [isDragging, offset, bounds, elementRef, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={setElementRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: zIndex,
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;