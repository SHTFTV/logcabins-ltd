import React from 'react';
import { Trees, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdvisor: () => void;
  onOpenBooking: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdvisor,
  onOpenBooking,
  onSelectTab,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border border-amber-500/30">
                <Trees className="w-5 h-5 text-amber-100" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">
                LogCabins<span className="text-amber-500 font-sans text-sm font-semibold ml-0.5 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/50">.ltd</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              LogCabins.ltd is the UK and Northern Europe's dedicated turnkey provider of sustainable handcrafted Glulam timber cabins, architectural engineering services, and scenic surrounding real estate parcels.
            </p>

          </div>

          {/* Quick Links 1 */}
          <div className="space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-stone-100 text-[11px]">
              Cabins For Sale
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onSelectTab('cabins')} className="hover:text-amber-400 transition-colors">
                  The Aspen Panorama 140m²
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('cabins')} className="hover:text-amber-400 transition-colors">
                  Valhalla 3-Bed Retreat 96m²
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('cabins')} className="hover:text-amber-400 transition-colors">
                  Highland Hideaway 62m²
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('cabins')} className="hover:text-amber-400 transition-colors">
                  TimberPod Garden Studio 28m²
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('cabins')} className="hover:text-amber-400 transition-colors">
                  Glacier Grand Estate 228m²
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-stone-100 text-[11px]">
              Turnkey & Land
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onSelectTab('land')} className="hover:text-amber-400 transition-colors">
                  Perthshire Lochside Plot
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('land')} className="hover:text-amber-400 transition-colors">
                  Lake District Meadow Plot
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('land')} className="hover:text-amber-400 transition-colors">
                  Snowdonia Valley Acreage
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-amber-400 transition-colors">
                  Completed Builds Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('financing')} className="hover:text-amber-400 transition-colors">
                  Mortgage & Finance Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-amber-400 transition-colors">
                  Planning Permissions
                </button>
              </li>

              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-amber-400 transition-colors">
                  Off-Grid Solar & Boreholes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('bc-canada-service');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  BC, Canada Restoration Partner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-amber-400 transition-colors text-amber-400/90 font-medium"
                >
                  Planning & Timber FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-stone-100 text-[11px]">
              Get In Touch
            </div>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>inquiries@logcabins.ltd</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                Request a call back and we'll connect you with a suitable installer or advisor for your project.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} LogCabins.ltd • All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Turnkey Sale</span>
            <span className="hover:text-stone-400 cursor-pointer">Help & Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
