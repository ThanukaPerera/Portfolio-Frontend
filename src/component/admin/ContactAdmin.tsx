// components/admin/ContactAdmin.tsx
'use client'
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Modal from '@/component/Modal';
import ContactForm from '@/component/admin/ContactForm';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { calculateAge } from '@/util/ageCalculator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Contact {
    _id: string;
    name: string;
    bday?: string | null; // Changed from age to bday
    email: string;
    mobile?: string;
    address?: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default function ContactAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/contacts');
      setContacts(data.response);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleFormSubmit = async () => {
    setShowModal(false);
    setSelectedContact(null);
    setIsEditing(false);
    await fetchContacts();
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (contactId: string) => {
    setProcessing(true);
    try {
      await axios.delete(`http://localhost:8000/api/contact/${contactId}`);
      toast.success('Contact deleted successfully');
      await fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleActive = async (contact: Contact) => {
    setProcessing(true);
    try {
      await axios.put(`http://localhost:8000/api/contact/${contact._id}`, {
        ...contact,
        active: !contact.active
      });
      toast.success(`Contact ${!contact.active ? 'activated' : 'deactivated'} successfully`);
      await fetchContacts();
    } catch (error) {
      toast.error('Failed to update contact status');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Contacts</h1>
        <Button
          onClick={() => {
            setSelectedContact(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          disabled={processing}
        >
          Add New Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <Card key={contact._id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{contact.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={contact.active}
                    onCheckedChange={() => handleToggleActive(contact)}
                    disabled={processing}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
              
              {contact.mobile && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Mobile</p>
                  <p className="text-sm text-muted-foreground">{contact.mobile}</p>
                </div>
              )}

              {contact.bday && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Age</p>
                  <p className="text-sm text-muted-foreground">
                    {calculateAge(contact.bday)}
                  </p>
                </div>
              )}

              {contact.address && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{contact.address}</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => handleEdit(contact)}
                disabled={processing}
              >
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={processing}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the contact
                      for {contact.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(contact._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Contact' : 'Create New Contact'}
        </h2>
        <ContactForm 
          initialData={selectedContact} 
          onSubmit={handleFormSubmit} 
          onCancel={() => setShowModal(false)}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
}