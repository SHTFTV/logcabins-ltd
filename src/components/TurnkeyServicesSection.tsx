import React from 'react';
import { TURNKEY_SERVICES } from '../data/mockData';
import { Compass, Hammer, Drill, Zap, Sparkles, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { ArchitecturalTimeline } from './ArchitecturalTimeline';
import { CabinProjectGanttTimeline } from './CabinProjectGanttTimeline';
import { PlanningPermissionsWizard } from './PlanningPermissionsWizard';

interface TurnkeyServicesSectionProps {
  onBookConsultation: (serviceTitle?: string) => void;
}

export const TurnkeyServicesSection: React.FC<TurnkeyServicesSectionProps> = ({
  onBookConsultation,
}) => {
  const iconMap: Record<string, any> = {
    Compass,
    Drill,
    Hammer,
    Zap,
    Sparkles,
    ShieldCheck,
  };

  return (
    <section id="services" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Hammer className="w-4 h-4" />
            <span>End-to-End Master Builder Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
            Complete Turnkey Engineering Services
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
            From wild, unserviced acreage to a fully furnished, heated timber retreat. We handle legal planning approvals, civil groundworks, off-grid utilities, master erection, and luxury interior finishing.
          </p>
        </div>

        {/* 6 Step Interactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TURNKEY_SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName] || Hammer;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group flex flex-col justify-between p-8 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-6 text-5xl font-serif font-black text-stone-800/40 group-hover:text-amber-900/30 transition-colors pointer-events-none select-none">
                  0{index + 1}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-500/90 mt-1">
                    {service.subtitle}
                  </div>

                  <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-stone-800/80">
                    <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                      Key Deliverables:
                    </div>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="mt-8 pt-4 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                    <span>Timeline:</span>
                    <span className="text-stone-200 font-medium">{service.timeline}</span>
                  </div>

                  <button
                    onClick={() => onBookConsultation(`Inquiry for Service: ${service.title}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-semibold border border-stone-800 hover:border-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Service Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive 12-Month Gantt-Style Master Schedule */}
        <CabinProjectGanttTimeline onBookConsultation={onBookConsultation} />

        {/* Interactive UK Planning Permissions & Permitted Development Wizard */}
        <PlanningPermissionsWizard onBookConsultation={onBookConsultation} />

        {/* Architectural Timeline & Client Transparency Blueprint */}
        <ArchitecturalTimeline onBookConsultation={onBookConsultation} />

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-950 to-amber-950/60 border border-amber-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/50">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-stone-100">
                Building Control & Quality Checks
              </h4>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
                Every log cabin built under our turnkey program is coordinated through building control sign-off and airtightness testing. Ask your installer about warranty options available for your build.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookConsultation('General Turnkey Project')}
            className="px-6 py-3.5 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shrink-0 transition-colors shadow-lg cursor-pointer"
          >
            Speak with a Specialist
          </button>
        </div>
      </div>
    </section>
  );
};
