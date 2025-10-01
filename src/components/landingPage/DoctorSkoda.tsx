import doctorSkodaImage from '../../assets/images/avatars/skoda/doctorskoda.png';

interface DoctorSkodaProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export default function DoctorSkoda({ 
  className = "", 
  width = "auto", 
  height = "auto",
  alt = "Doctor Skoda - Mascote PénaPED"
}: DoctorSkodaProps) {
  return (
    <img 
      src={doctorSkodaImage} 
      alt={alt}
      className={`doctor-skoda ${className}`}
      width={width}
      height={height}
      style={{ width, height }}
    />
  );
}