import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Calendar, User, Phone, Mail } from 'lucide-react';
import { supabase } from '../supabaseClient';

const PACKAGES = [
  { id: 1, name: "Basic Health Checkup" },
  { id: 2, name: "Complete Blood Count (CBC)" },
  { id: 3, name: "Diabetes Screening" },
  { id: 4, name: "Thyroid Profile" },
  { id: 5, name: "Liver Function Test" },
  { id: 6, name: "Kidney Function Test" },
  { id: 7, name: "Lipid Profile" },
  { id: 8, name: "Full Body Checkup" },
];

export const BookTestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    test_type: '',
    preferred_date: '',
    address: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, test_type: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          test_type: formData.test_type,
          preferred_date: formData.preferred_date,
          message: formData.address + (formData.notes ? ' | Notes: ' + formData.notes : '')
        }])
        .select();

      if (error) throw error;

      toast.success(`Booking confirmed! ID: ${data[0].id.slice(0,8).toUpperCase()}. We will contact you shortly.`);
      setFormData({
        name: '', email: '', phone: '',
        test_type: '', preferred_date: '',
        address: '', notes: ''
      });
      onClose();
    } catch (error) {
      toast.error("Failed to book test. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Book a Test
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in your details and we'll get back to you shortly to confirm your appointment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input name="name" type="text" required value={formData.name}
                onChange={handleChange} placeholder="Enter your full name" className="pl-10" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input name="email" type="email" required value={formData.email}
                  onChange={handleChange} placeholder="your.email@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input name="phone" type="tel" required value={formData.phone}
                  onChange={handleChange} placeholder="+91 98765 43210" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Test/Package *</label>
              <Select value={formData.test_type} onValueChange={handleSelectChange} required>
                <SelectTrigger><SelectValue placeholder="Choose a package" /></SelectTrigger>
                <SelectContent>
                  {PACKAGES.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.name}>{pkg.name}</SelectItem>
                  ))}
                  <SelectItem value="Individual Test">Individual Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input name="preferred_date" type="date" required value={formData.preferred_date}
                  onChange={handleChange} className="pl-10"
                  min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address for Home Collection *</label>
            <Textarea name="address" required value={formData.address}
              onChange={handleChange} placeholder="Enter your complete address"
              rows={2} className="resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
            <Textarea name="notes" value={formData.notes} onChange={handleChange}
              placeholder="Any special requirements or medical conditions?" rows={3} className="resize-none" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={isSubmitting}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white">
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
