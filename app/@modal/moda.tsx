"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  try {
    if (!document) return null;
    const portal = createPortal(
      <div className="modal-backdrop">
        <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
          {children}
          <button onClick={onDismiss} className="close-button" />
        </dialog>
      </div>,
      document.getElementById("modal-root")!
    );
    return portal;
  } catch (error) {
    console.error(error);
    return null;
  }
}
