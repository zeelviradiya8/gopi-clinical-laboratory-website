import { valueAddedServices } from '../data/mock';
import { Home, Heart, LineChart, Building2 } from 'lucide-react';

const iconMap = {
  'Home Sample Collection': Home,
  'Preventive Health Packages': Heart,
  'Smart Reports': LineChart,
  'Corporate Wellness': Building2
};

export const ValueAddedServices = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
            Value Added Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Beyond Standard Testing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Enhanced healthcare services for your convenience and wellbeing
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueAddedServices.map((service) => {
            const IconComponent = iconMap[service.title];
            return (
              <div
                key={service.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-cyan-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon Background */}
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-cyan-600" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
