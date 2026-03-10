import { statistics } from '../data/mock';
import { Award, Users, Target, Clock } from 'lucide-react';

const iconMap = {
  'Tests Conducted': Award,
  'Patients Served': Users,
  'Accurate Results': Target,
  'Report Delivery': Clock
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwbGFib3JhdG9yeXxlbnwwfHx8fDE3NzMxMjc5NzF8MA&ixlib=rb-4.1.0&q=85"
                alt="Laboratory Technician"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
                About Gopi Clinical Laboratory
              </h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Gopi Clinical Laboratory was founded by <span className="font-semibold text-cyan-700">Mahesh Viradiya</span> with the mission of providing reliable, accurate, and affordable diagnostic services.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our laboratory combines modern technology with experienced professionals to deliver high-quality medical testing for patients and healthcare providers. We are committed to maintaining the highest standards of accuracy and patient care.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {statistics.map((stat, index) => {
                const IconComponent = iconMap[stat.label];
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-cyan-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
