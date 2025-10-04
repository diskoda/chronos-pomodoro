import logoPenaped from '../../assets/images/logos/logo_penaped.png';

export default function RegisterHeader() {
  return (
    <div className="text-center">
      <img 
        src={logoPenaped} 
        alt="PéNaPED Logo" 
        className="mx-auto h-45 w-auto mb-4"
      />
      <h2 className="text-3xl font-bold theme-text-primary">
        Criar Conta
      </h2>
      <p className="mt-2 text-sm theme-text-secondary">
        Junte-se à nossa plataforma de estudos em pediatria
      </p>
    </div>
  );
}