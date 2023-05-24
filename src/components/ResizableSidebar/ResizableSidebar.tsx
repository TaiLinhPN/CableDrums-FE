import { useRef, useEffect } from "react";
import "../../App.css";

interface ResizableSidebarProps {
  minSidebarWidth: number;
  maxSidebarWidth: number;
  initWidth: React.CSSProperties;
  directionX: 1 | -1;
  sidebarClassName?: string;
  resizerClassName?: string;
}

function ResizableSidebar({
  minSidebarWidth,
  maxSidebarWidth,
  initWidth,
  directionX,
  sidebarClassName,
  resizerClassName,
  children,
}: React.PropsWithChildren<ResizableSidebarProps>) {
  const resizerRef = useRef<any>(null);
  const sidebarRef = useRef<any>(null);

  useEffect(() => {
    const resizer = resizerRef.current;
    const sidebar = sidebarRef.current;

    if (!resizer || !sidebar) {
      return;
    }

    let x: number, w: number;

    function handleMouseDown(e: MouseEvent) {
      x = e.clientX;

      const sbWidth = window.getComputedStyle(sidebar).width;
      w = parseInt(sbWidth, 10);

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
      const dx = e.clientX - x;

      const cw = w + dx * directionX;

      if (cw > minSidebarWidth && cw < maxSidebarWidth) {
        sidebar.style.width = `${cw}px`;
      }
    }

    function handleMouseUp() {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    }

    if (sidebar) {
      resizer.addEventListener("mousedown", handleMouseDown);

      return () => {
        resizer.removeEventListener("mousedown", handleMouseDown);
      };
    }
  }, [minSidebarWidth, maxSidebarWidth]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${sidebarClassName ? sidebarClassName : ""}`}
      style={initWidth}
    >
      <div
        ref={resizerRef}
        className={`resizer ${resizerClassName ? resizerClassName : ""}`}
      ></div>
      {children}
    </div>
  );
}

export default ResizableSidebar;
