'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bday: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number").optional().or(z.literal('')),
  address: z.string().optional(),
  active: z.boolean()
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface Contact extends ContactFormValues {
  _id: string;
}

interface ContactFormProps {
  initialData?: Contact;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function ContactForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing = false
}: ContactFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: initialData?.name || '',
      bday: initialData?.bday || '',
      email: initialData?.email || '',
      mobile: initialData?.mobile || '',
      address: initialData?.address || '',
      active: initialData?.active ?? true
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: ContactFormValues) => {
    try {
      const endpoint = isEditing && initialData?._id 
        ? `${API_BASE}/contact/${initialData._id}`
        : `${API_BASE}/addContact`;

      const method = isEditing ? 'put' : 'post';

      await axios[method](endpoint, data);

      toast.success(`Contact ${isEditing ? 'updated' : 'created'} successfully`);
      onSubmit();
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} contact`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bday">Birthday</Label>
          <Input
            id="bday"
            type="date"
            {...register('bday')}
          />
          {errors.bday && <p className="text-red-500 text-sm">{errors.bday.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            {...register('mobile')}
            placeholder="+1234567890"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <textarea
          id="address"
          {...register('address')}
          className="w-full p-2 border rounded min-h-[100px]"
          placeholder="123 Main St, City, Country"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('active')}
          id="active-status"
          className="h-4 w-4"
        />
        <Label htmlFor="active-status">Active Contact</Label>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : (isEditing ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;