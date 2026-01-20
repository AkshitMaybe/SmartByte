import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { courses } from '@/data/courses';
import { branches, getActiveBranches } from '@/data/branches';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

interface WhatsAppFormProps {
  className?: string;
  defaultCourse?: string;
  defaultBranch?: string;
  compact?: boolean;
}

export const WhatsAppForm = ({ 
  className, 
  defaultCourse, 
  defaultBranch,
  compact = false 
}: WhatsAppFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    course: defaultCourse || '',
    branch: defaultBranch || '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeBranches = getActiveBranches();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }
    if (!formData.branch) {
      newErrors.branch = 'Please select a branch';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 400));

    const selectedBranch = branches.find(b => b.slug === formData.branch);
    const selectedCourse = courses.find(c => c.slug === formData.course);
    
    const whatsappNumber = selectedBranch?.whatsappNumber || site.whatsappHO;
    
    const message = `Hi SmartByte, my name is ${formData.name}. I am interested in ${selectedCourse?.shortName || formData.course}. Preferred branch: ${selectedBranch?.displayName || formData.branch}. ${formData.message ? `Message: ${formData.message}. ` : ''}Please share details.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    try {
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (!newWindow || newWindow.closed) {
        // Fallback to HO WhatsApp
        const hoUrl = `https://wa.me/${site.whatsappHO.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        window.open(hoUrl, '_blank');
      }
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      // Fallback
      const hoUrl = `https://wa.me/${site.whatsappHO.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
      window.open(hoUrl, '_blank');
    }
    
    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn(
        'glass-card p-6 md:p-8',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg">Enquire on WhatsApp</h3>
          <p className="text-sm text-muted-foreground">Get instant response</p>
        </div>
      </div>

      <div className={cn('space-y-4', compact && 'md:grid md:grid-cols-2 md:gap-4 md:space-y-0')}>
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            className={cn(errors.name && 'border-destructive')}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-destructive"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Course */}
        <div className="space-y-2">
          <Label>Select Course *</Label>
          <Select 
            value={formData.course} 
            onValueChange={(value) => {
              setFormData({ ...formData, course: value });
              if (errors.course) setErrors({ ...errors, course: '' });
            }}
          >
            <SelectTrigger className={cn(errors.course && 'border-destructive')}>
              <SelectValue placeholder="Choose a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.slug} value={course.slug}>
                  {course.shortName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AnimatePresence>
            {errors.course && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-destructive"
              >
                {errors.course}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <Label>Preferred Branch *</Label>
          <Select 
            value={formData.branch} 
            onValueChange={(value) => {
              setFormData({ ...formData, branch: value });
              if (errors.branch) setErrors({ ...errors, branch: '' });
            }}
          >
            <SelectTrigger className={cn(errors.branch && 'border-destructive')}>
              <SelectValue placeholder="Choose a branch" />
            </SelectTrigger>
            <SelectContent>
              {activeBranches.map((branch) => (
                <SelectItem key={branch.slug} value={branch.slug}>
                  {branch.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AnimatePresence>
            {errors.branch && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-destructive"
              >
                {errors.branch}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        {!compact && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any specific questions?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || isSuccess}
        className="w-full mt-6 btn-shine bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-12"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Opening WhatsApp...
            </motion.span>
          ) : isSuccess ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              WhatsApp Opened!
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send via WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.form>
  );
};
