'use client';

import { useState, useRef } from 'react';
import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import { Upload, X, FileText, Image as ImageIcon, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Step7Media() {
  const { step7, updateStep7 } = useWizardStore();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length > 0) {
      const urls = files.map((f) => URL.createObjectURL(f));
      updateStep7({ photos: [...step7.photos, ...urls].slice(0, 10) });
      toast.success(`${files.length} photo(s) added!`);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    updateStep7({ photos: [...step7.photos, ...urls].slice(0, 10) });
    if (files.length > 0) toast.success(`${files.length} photo(s) added!`);
  };

  const removePhoto = (index: number) => {
    updateStep7({ photos: step7.photos.filter((_, i) => i !== index) });
  };

  const handleDocSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const names = files.map((f) => f.name);
    updateStep7({ documents: [...step7.documents, ...names].slice(0, 5) });
    if (files.length > 0) toast.success(`${files.length} document(s) added!`);
  };

  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-stone-900 mb-2">Photos & Documents</h2>
      <p className="text-stone-500 text-sm mb-8">
        Add photos and verification documents to strengthen your review. Optional but recommended!
      </p>

      <div className="space-y-8">
        {/* Photo Upload */}
        <div>
          <h3 className="text-stone-900 font-semibold mb-1">Property Photos</h3>
          <p className="text-stone-400 text-xs mb-4">Up to 10 photos — interiors, exteriors, amenities, issues</p>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handlePhotoDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition-all"
            style={{
              borderColor: dragOver ? '#b45309' : 'rgba(180,83,9,0.3)',
              background: dragOver ? 'rgba(245,158,11,0.08)' : 'rgba(0,0,0,0.02)',
            }}
          >
            <div className="flex justify-center mb-4">
              <ImageIcon size={40} className="text-amber-700/60" />
            </div>
            <p className="text-stone-700 font-semibold mb-1">Drop photos here</p>
            <p className="text-stone-400 text-sm">or click to browse your device</p>
            <p className="text-xs text-stone-300 mt-2">Supports JPG, PNG, WEBP — Max 5MB each</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoSelect}
          />

          {/* Photo Grid */}
          {step7.photos.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
              {step7.photos.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    alt={`Upload ${i + 1}`}
                    className="w-full h-20 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
              {step7.photos.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-20 rounded-xl border border-dashed border-stone-300 flex items-center justify-center text-stone-300 hover:border-amber-600/40 hover:text-amber-600/60 transition-all"
                >
                  <Upload size={20} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Document Upload */}
        <div>
          <h3 className="text-stone-900 font-semibold mb-1">Verification Documents</h3>
          <p className="text-stone-400 text-xs mb-4">
            Sale deed, allotment letter, or rental agreement (helps verify your ownership) — kept private
          </p>

          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-stone-200 hover:border-amber-600/30 transition-all bg-white"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-amber-700" />
            </div>
            <div className="text-left">
              <p className="text-sm text-stone-700 font-medium">Upload Documents</p>
              <p className="text-xs text-stone-400">PDF, JPG, PNG — Documents are kept private</p>
            </div>
            <Upload size={16} className="text-amber-700 ml-auto" />
          </button>
          <input
            ref={docInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleDocSelect}
          />

          {step7.documents.length > 0 && (
            <div className="mt-3 space-y-2">
              {step7.documents.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-stone-200"
                >
                  <FileText size={14} className="text-amber-700" />
                  <span className="text-sm text-stone-700 truncate flex-1">{name}</span>
                  <button
                    type="button"
                    onClick={() => updateStep7({ documents: step7.documents.filter((_, j) => j !== i) })}
                    className="text-stone-300 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5">
          <Lock size={12} />
          All uploaded documents are encrypted and only used for verification purposes
        </p>
      </div>
    </GlassCard>
  );
}
