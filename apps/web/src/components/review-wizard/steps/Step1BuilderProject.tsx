'use client';

import { useState } from 'react';
import { useWizardStore } from '@/store/wizard.store';
import { Search, Building2, MapPin, Calendar, Hash, Home } from 'lucide-react';

const builders = [
  'Prestige Group', 'DLF Limited', 'Godrej Properties', 'Sobha Limited',
  'Brigade Enterprises', 'Lodha Group', 'Tata Housing', 'Puravankara', 'Omaxe Ltd',
  'Kolte Patil', 'My Home Constructions', 'Shapoorji Pallonji', 'Embassy Group',
];

const cities = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur'];
const years = Array.from({ length: 16 }, (_, i) => (2025 - i).toString());

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-stone-700 font-medium text-sm mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors';

export default function Step1BuilderProject() {
  const { step1, updateStep1 } = useWizardStore();
  const [builderSearch, setBuilderSearch] = useState(step1.builderName);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredBuilders = builders.filter((b) =>
    b.toLowerCase().includes(builderSearch.toLowerCase())
  );

  const selectBuilder = (name: string) => {
    setBuilderSearch(name);
    updateStep1({ builderName: name, builderId: name.toLowerCase().replace(/\s+/g, '-') });
    setShowDropdown(false);
  };

  return (
    <>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Builder &amp; Project Details</h2>
      <p className="text-stone-500 text-sm mb-8">Tell us about the property you are reviewing</p>

      <div className="space-y-6">

        {/* Builder Search */}
        <Field label="Builder Name">
          <div className="relative">
            <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-700" />
            <Search size={13} className="absolute left-9 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={builderSearch}
              onChange={(e) => { setBuilderSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for a builder..."
              className={`${inputClass} pl-14`}
            />
            {showDropdown && builderSearch && filteredBuilders.length > 0 && (
              <div className="absolute top-full mt-1.5 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-48 overflow-y-auto">
                {filteredBuilders.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => selectBuilder(b)}
                    className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                  >
                    <Building2 size={13} className="text-stone-400" />
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>

        {/* Project Name */}
        <Field label="Project / Society Name">
          <div className="relative">
            <Home size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={step1.projectName}
              onChange={(e) => updateStep1({ projectName: e.target.value })}
              placeholder="e.g. Prestige Lakeside Habitat"
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unit Number */}
          <Field label="Unit / Flat Number">
            <div className="relative">
              <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={step1.unitNumber}
                onChange={(e) => updateStep1({ unitNumber: e.target.value })}
                placeholder="e.g. A-204"
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>

          {/* Purchase Year */}
          <Field label="Year of Purchase / Booking">
            <div className="relative">
              <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <select
                value={step1.purchaseYear}
                onChange={(e) => updateStep1({ purchaseYear: e.target.value })}
                className={`${inputClass} pl-10 appearance-none`}
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </Field>
        </div>

        {/* City */}
        <Field label="City">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-stone-400" />
            <span className="text-xs text-stone-400">Select one</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => updateStep1({ city })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  step1.city === city
                    ? 'bg-amber-700 text-white'
                    : 'bg-white border border-stone-300 text-stone-600 hover:border-amber-400 hover:text-amber-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </Field>

      </div>
    </>
  );
}
