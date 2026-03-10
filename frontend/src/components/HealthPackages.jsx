import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from './ui/button';
import { Check, Clock, Users } from 'lucide-react';

export const HealthPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await api.getPackages();
      setPackages(data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
            Health Packages
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Comprehensive Health Checkups
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored packages for every age group and health need
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">Loading packages...</p>
            </div>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
              {/* Package Header */}
              <div className="bg-gradient-to-br from-cyan-500 to-teal-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-cyan-50 text-sm">{pkg.description}</p>
              </div>

              {/* Package Content */}
              <div className="p-6 space-y-6">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">₹{pkg.price}</span>
                  <span className="text-gray-500">onwards</span>
                </div>

                {/* Info Tags */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-cyan-600" />
                    <span>{pkg.ideal_for}</span>
                  </div>
                </div>

                {/* Tests Included */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Tests Included ({pkg.tests.length})
                  </p>
                  <ul className="space-y-2">
                    {pkg.tests.slice(0, 5).map((test, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{test}</span>
                      </li>
                    ))}
                    {pkg.tests.length > 5 && (
                      <li className="text-sm text-cyan-600 font-medium">
                        +{pkg.tests.length - 5} more tests
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => {
                    // Will be connected to booking modal
                    const event = new CustomEvent('openBookModal');
                    window.dispatchEvent(event);
                  }}
                >
                  Book This Package
                </Button>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-teal-600/0 group-hover:from-cyan-500/5 group-hover:to-teal-600/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};
