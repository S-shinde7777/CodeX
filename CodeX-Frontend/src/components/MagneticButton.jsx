import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function MagneticButton({ to, children, className }) {
  const ref = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <Link
      to={to}
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #fde68a, #fbbf24)`
      }}
      className={className}
    >
      {children}
    </Link>
  );
}

export default MagneticButton;