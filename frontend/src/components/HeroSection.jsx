import { Button } from './ui/button';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';

export const HeroSection = ({ onBookTest }) => {
  const scrollToPackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative pt-16 min-h-screen flex items-center bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                Trusted Healthcare Partner
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Accurate Diagnostics.{' '}
              <span className="text-cyan-600">Trusted Care.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Advanced pathology and laboratory testing with precision, reliability, and fast digital reports.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">NABL Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">24hr Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">98% Accuracy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onBookTest}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Book Test
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                onClick={scrollToPackages}
                size="lg"
                variant="outline"
                className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              >
                View Health Packages
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwbGFib3JhdG9yeXxlbnwwfHx8fDE3NzMxMjc5NzF8MA&ixlib=rb-4.1.0&q=85"
                alt="Medical Laboratory"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-600">Tests Conducted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
