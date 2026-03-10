import { services } from '../data/mock';
import { Beaker, Droplet, Microscope, FileText } from 'lucide-react';

const iconMap = {
  'Biochemistry': Beaker,
  'Haematology': Droplet,
  'Microbiology & Serology': Microscope,
  'Clinical Pathology': FileText
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Comprehensive Laboratory Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            State-of-the-art diagnostic testing across multiple specialties
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.category];
            return (
              <div
                key={service.id}
                className="group relative bg-gradient-to-br from-white to-cyan-50/30 rounded-2xl p-8 border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.category}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Tests List */}
                <ul className="space-y-2">
                  {service.tests.map((test, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{test}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-teal-600/0 group-hover:from-cyan-500/5 group-hover:to-teal-600/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
