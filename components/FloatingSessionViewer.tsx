"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export function FloatingSessionViewer({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-primary hover:bg-primary/80 text-white shadow-lg"
      >
        <User className="w-6 h-6" />
      </Button>
      {isOpen && (
        <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50">
          <Card className="bg-background text-foreground border-border w-full max-w-md max-h-[80vh] overflow-auto">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center justify-between">
                Some data
                <Button onClick={toggleModal} variant="ghost">
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
