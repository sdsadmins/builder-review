'use client';

import { useState } from 'react';
import { useWizardStore } from '@/store/wizard.store';
import GlassCard from '@/components/shared/GlassCard';
import { Search, Building2, MapPin, Calendar, Hash, Home } from 'lucide-react';

const builders = [
  'Prestige Group', 'DLF Limited', 'Godrej Properties', 'Sobha Limited',
  'Brigade Enterprises', 'Lodha Group', 'Tata Housing', 'Puravankara', 'Omaxe Ltd',
  'Kolte Patil', 'My Home Constructions', 'Shapoorji Pallonji', 'Embassy Group',
];

const cities = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur'];
const years = Array.from({ length: 15 }, (_, i) => (2025 - i).toString());

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
        <span className="text-amber-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#F8F8FF',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
};

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
    <GlassCard className="p-8">
      <h2 className="text-xl font-bold text-white mb-2">🏗️ Builder & Project Details</h2>
      <p className="text-white/50 text-sm mb-8">Tell us about the property you&apos;re reviewing</p>

      <div className="space-y-6">
        {/* Builder Search */}
        <Field label="🏢 Builder Name" icon={<Building2 size={14} />}>
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
            <input
              type="text"
              value={builderSearch}
              onChange={(e) => { setBuilderSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for a builder..."
              style={{ ...inputStyle, paddingLeft: '40px' }}
            />
            {showDropdown && builderSearch && filteredBuilders.length > 0 && (
              <div
                className="absolute top-full mt-2 w-full rounded-xl border border-white/10 overflow-hidden z-50 max-h-48 overflow-y-auto"
                style={{ background: '#12121A', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                {filteredBuilders.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => selectBuilder(b)}
                    className="w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                  >
                    🏗️ {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>

        {/* Project Name */}
        <Field label="🏠 Project / Society Name" icon={<Home size={14} />}>
          <input
            type="text"
            value={step1.projectName}
            onChange={(e) => updateStep1({ projectName: e.target.value })}
            placeholder="e.g. Prestige Lakeside Habitat"
            style={inputStyle}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unit Number */}
          <Field label="🔢 Unit / Flat Number" icon={<Hash size={14} />}>
            <input
              type="text"
              value={step1.unitNumber}
              onChange={(e) => updateStep1({ unitNumber: e.target.value })}
              placeholder="e.g. A-204"
              style={inputStyle}
            />
          </Field>

          {/* Purchase Year */}
          <Field label="📅 Year of Purchase / Booking" icon={<Calendar size={14} />}>
            <select
              value={step1.purchaseYear}
              onChange={(e) => updateStep1({ purchaseYear: e.target.value })}
              style={inputStyle}
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={y} style={{ background: '#12121A' }}>{y}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* City */}
        <Field label="📍 City" icon={<MapPin size={14} />}>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => updateStep1({ city })}
                className="px-4 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: step1.city === city ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
                  border: step1.city === city ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: step1.city === city ? '#F59E0B' : '#F8F8FF80',
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </Field>
      </div>
    </GlassCard>
  );
}
