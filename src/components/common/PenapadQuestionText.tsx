import React from 'react';

interface PenapadQuestionTextProps {
  text: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

const PenapadQuestionText: React.FC<PenapadQuestionTextProps> = ({
  text,
  image,
  imageAlt = "Imagem da questão",
  className = ''
}) => {
  return (
    <div className={`penaped-question-text ${className}`}>
      {text}
      {image && (
        <img 
          src={image} 
          alt={imageAlt}
          className="penaped-question-image"
        />
      )}
    </div>
  );
};

export default PenapadQuestionText;