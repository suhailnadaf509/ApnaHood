'use client';

import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: string;
    description: string;
  };
}

const EventPopup = ({ isOpen, onClose, event }: EventPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {event.date}
          </p>
          <p className="text-sm">
            {event.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;