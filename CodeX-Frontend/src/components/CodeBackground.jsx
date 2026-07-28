import { Code2, Braces, Terminal, Hash, FileCode, Binary } from 'lucide-react';

const ICONS = [
  { Icon: Code2, top: '8%', left: '5%', size: 28, delay: '0s', duration: '7s' },
  { Icon: Braces, top: '15%', left: '85%', size: 24, delay: '1s', duration: '6s' },
  { Icon: Terminal, top: '55%', left: '3%', size: 32, delay: '2s', duration: '8s' },
  { Icon: Hash, top: '70%', left: '90%', size: 22, delay: '0.5s', duration: '7s' },
  { Icon: FileCode, top: '35%', left: '92%', size: 26, delay: '1.5s', duration: '6.5s' },
  { Icon: Binary, top: '80%', left: '8%', size: 24, delay: '2.5s', duration: '7.5s' }
];

function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ICONS.map(({ Icon, top, left, size, delay, duration }, i) => (
        <div
          key={i}
          className="absolute text-gray-700/40 animate-float"
          style={{ top, left, animationDelay: delay, animationDuration: duration }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
}

export default CodeBackground;