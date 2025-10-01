import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Casos Clínicos', href: '/clinical-cases' },
    { name: 'Banco de Questões', href: '/questions' },
    { name: 'Flashcards', href: '/flashcards' },
    { name: 'Simulados', href: '/simulations' }
  ];

  const resources = [
    { name: 'Metodologia PBL', href: '/pbl' },
    { name: 'Gamificação', href: '/gamification' },
    { name: 'Guias de Estudo', href: '/guides' },
    { name: 'Blog', href: '/blog' }
  ];

  const support = [
    { name: 'Central de Ajuda', href: '/help' },
    { name: 'Contato', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Feedback', href: '/feedback' }
  ];

  const legal = [
    { name: 'Termos de Uso', href: '/terms' },
    { name: 'Política de Privacidade', href: '/privacy' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'LGPD', href: '/lgpd' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-500 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-cyan-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PéNaPED
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                A plataforma mais completa para estudos em Pediatria, 
                combinando metodologia PBL, gamificação e tecnologia 
                para revolucionar seu aprendizado médico.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                  <Mail className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-sm">contato@penaped.com.br</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                  <Phone className="h-4 w-4 mr-3 text-green-400" />
                  <span className="text-sm">+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                  <MapPin className="h-4 w-4 mr-3 text-red-400" />
                  <span className="text-sm">São Paulo, SP - Brasil</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Estudo
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recursos
              </h4>
              <ul className="space-y-3">
                {resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Suporte
              </h4>
              <ul className="space-y-3">
                {support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-center max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-white mb-4">
                📚 Receba conteúdos exclusivos
              </h4>
              <p className="text-gray-400 mb-6">
                Inscreva-se em nossa newsletter e receba dicas de estudo, 
                novos casos clínicos e atualizações da plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 PéNaPED. Todos os direitos reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Desenvolvido com 💜 para estudantes de medicina
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-6">
                {legal.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-xs transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}