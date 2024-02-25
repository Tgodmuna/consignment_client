import { useState, useEffect } from "react";

type propType = {
  text: string;
  className: string;
  delay: number;
};
const Typewriter = ({ text, className, delay }: propType) => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingEffect = setTimeout(() => {
      setDisplayText(text.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);
    }, delay);

    // Clear timeout on unmount or when typing completes
    return () => clearTimeout(typingEffect);
  }, [charIndex, delay, text]); // Trigger effect on charIndex change

  return (
    <div className={`${className}`}>
      <p className={`${className}`}>{displayText}</p>
    </div>
  );
};

export default Typewriter;
