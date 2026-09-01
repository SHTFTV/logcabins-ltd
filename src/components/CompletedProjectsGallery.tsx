import React, { useState, useMemo } from 'react';
import { CompletedProject } from '../types';
import { COMPLETED_PROJECTS } from '../data/completedProjectsData';
import { ConstructionTimelapse } from './ConstructionTimelapse';
import {
  Trees,
  MapPin,
  Clock,
  Maximize2,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  Phone,
  CheckCircle2,
  Flame,
  Layers,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  FileText,
  Scale,
  Calendar
} from 'lucide-react';

interface CompletedProjectsGalleryProps {
  onConfigureCabin: (cabinId: string) => void;
  onBookConsultation: (topic: string) => void;
  onCompareCabin?: (cabinId: string) => void;
}

export const CompletedProjectsGallery: React.FC<CompletedProjectsGalleryProps> = ({
  onConfigureCabin,
  onBookConsultation,
  onCompareCabin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<CompletedProject | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [galleryFilterType, setGalleryFilterType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'luxury', label: 'Luxury & Alpine' },
    { id: 'residential', label: 'Family Residential' },
    { id: 'garden', label: 'Garden Studios & Pods' },
    { id: 'commercial', label: 'Commercial Tourism' },
    { id: 'offgrid', label: 'Off-Grid Eco' },
  ];

  const regions = [
    { id: 'all', label: 'All UK Regions' },
    { id: 'highlands', label: 'Scottish Highlands' },
    { id: 'lakes', label: 'Lake District' },
    { id: 'wales', label: 'Snowdonia & Wales' },
    { id: 'cotswolds', label: 'Cotswolds AONB' },
    { id: 'yorkshire', label: 'Yorkshire Dales' },
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return COMPLETED_PROJECTS.filter((proj) => {
      if (selectedCategory !== 'all' && proj.category !== selectedCategory) {
        return false;
      }
      if (selectedRegion !== 'all' && proj.region !== selectedRegion) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = proj.title.toLowerCase().includes(q);
        const matchLocation = proj.location.toLowerCase().includes(q);
        const matchModel = proj.modelName.toLowerCase().includes(q);
        const matchTimber = proj.timberFinish.toLowerCase().includes(q);
        if (!matchTitle && !matchLocation && !matchModel && !matchTimber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  // Modal gallery filtered images
  const currentModalImages = useMemo(() => {
    if (!activeModalProject) return [];
    if (galleryFilterType === 'all') return activeModalProject.gallery;
    return activeModalProject.gallery.filter(g => g.type === galleryFilterType);
  }, [activeModalProject, galleryFilterType]);

  const handleOpenProjectModal = (proj: CompletedProject) => {
    setActiveModalProject(proj);
    setModalImageIndex(0);
    setGalleryFilterType('all');
  };

  const handleNextImage = () => {
    if (!currentModalImages.length) return;
    setModalImageIndex((prev) => (prev + 1) % currentModalImages.length);
  };

  const handlePrevImage = () => {
    if (!currentModalImages.length) return;
    setModalImageIndex((prev) => (prev - 1 + currentModalImages.length) % currentModalImages.length);
  };

  return (
    <section id="completed-projects" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-3">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Style & Design Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
              Cabin Style & Design Gallery
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Browse example glulam log cabin styles and configurations inspired by builds across the UK Highlands, Lake District, Cotswolds, and National Parks, for design and layout inspiration.
            </p>
          </div>

          <button
            onClick={() => onBookConsultation('Discuss a Cabin Style')}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 text-stone-200 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Talk Through a Style</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-950/40'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Region dropdown + Search */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {/* Region Select */}
              <div className="relative">
                <select
                  aria-label="Filter by UK region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="text-xs bg-stone-950 border border-stone-800 rounded-xl py-2 pl-3 pr-8 text-stone-300 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project, region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="text-xs text-stone-400 flex items-center justify-between">
            <span>Showing <strong className="text-white font-mono">{filteredProjects.length}</strong> example builds</span>
            {(selectedCategory !== 'all' || selectedRegion !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Masonry Grid Layout */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 rounded-3xl bg-stone-950 border border-stone-800 text-center space-y-3">
            <Camera className="w-10 h-10 text-stone-600 mx-auto" />
            <h3 className="text-lg font-bold text-white font-serif">No projects match your filter</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Try adjusting your category or region selection to view our other example architectural styles.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition-colors cursor-pointer"
            >
              Show All Example Builds
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => handleOpenProjectModal(project)}
                  className="break-inside-avoid group rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/60 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col cursor-pointer"
                >
                  {/* High-Res Image Container with Aspect Ratio */}
                  <div className={`relative ${project.aspectRatio} overflow-hidden bg-stone-900`}>
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/90 border border-stone-700 text-stone-200 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Photos Count Pill */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-stone-950/80 border border-stone-700/80 text-stone-300 text-[10px] font-medium backdrop-blur-md flex items-center gap-1">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>{project.gallery.length} Photos</span>
                    </div>

                    {/* Bottom Image Overlay Details */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-medium mb-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content & Metrics */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    {/* Key Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800/80 text-xs text-stone-300">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-semibold">{project.areaSqM} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{project.wallThicknessMm}mm Log</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{project.buildDurationDays}d Erection</span>
                      </div>
                    </div>

                    {/* Footer Row with Model tag and View CTA */}
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] uppercase text-stone-500 font-semibold">Model Reference</div>
                        <div className="text-stone-300 font-medium truncate max-w-[160px]">{project.modelName}</div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>View Example</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Construction Timelapse: Step-by-Step Assembly Stages */}
        <ConstructionTimelapse
          onConfigureCabin={onConfigureCabin}
          onBookConsultation={onBookConsultation}
        />

      </div>

      {/* Case Study & Full High-Res Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-stone-900/90 border-b border-stone-800 shrink-0 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-600/40 text-amber-300 text-[11px] font-semibold uppercase">
                    {activeModalProject.category}
                  </span>
                  <span className="text-stone-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {activeModalProject.location}
                  </span>
                  <span className="text-stone-400 text-xs flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-stone-500" />
                    Example Year {activeModalProject.completionYear}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                  {activeModalProject.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2.5 rounded-full bg-stone-950/80 border border-stone-700 text-stone-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                title="Close project case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
              
              {/* Photo Showcase Carousel */}
              <div className="space-y-3">
                {/* Photo filter tabs */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['all', 'exterior', 'interior', 'construction', 'sauna', 'detail'].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setGalleryFilterType(t);
                          setModalImageIndex(0);
                        }}
                        className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                          galleryFilterType === t
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <span className="text-stone-400 text-[11px] font-mono">
                    Image {modalImageIndex + 1} of {currentModalImages.length}
                  </span>
                </div>

                {/* Main Image Stage */}
                <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center">
                  {currentModalImages.length > 0 ? (
                    <>
                      <img
                        src={currentModalImages[modalImageIndex]?.url}
                        alt={currentModalImages[modalImageIndex]?.caption}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80 pointer-events-none" />

                      {/* Caption Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-200 bg-stone-950/85 backdrop-blur-md p-3 rounded-xl border border-stone-800">
                        <span className="text-amber-400 font-semibold uppercase tracking-wider text-[10px] mr-2">
                          [{currentModalImages[modalImageIndex]?.type}]
                        </span>
                        {currentModalImages[modalImageIndex]?.caption}
                      </div>

                      {/* Navigation Arrows */}
                      {currentModalImages.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-600 text-white border border-stone-700 transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-600 text-white border border-stone-700 transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-stone-500 text-xs">No images in this category</div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {currentModalImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {currentModalImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setModalImageIndex(i)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          modalImageIndex === i
                            ? 'border-amber-500 ring-2 ring-amber-500/40'
                            : 'border-stone-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Architectural & Engineering Factsheet */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Architectural & Construction Factsheet</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">Base Cabin Model</span>
                      <span className="font-bold text-stone-200">{activeModalProject.modelName}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">Usable Floor Area</span>
                      <span className="font-mono text-stone-200 font-semibold">{activeModalProject.areaSqM} m² ({Math.round(activeModalProject.areaSqM * 10.7639)} sq ft)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">Bedrooms / Bathrooms</span>
                      <span className="text-stone-200">{activeModalProject.bedrooms} Bed • {activeModalProject.bathrooms} Bath</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Glulam Wall Profile</span>
                      <span className="font-bold text-amber-400">{activeModalProject.wallThicknessMm}mm Solid Interlocking</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">Weather-Tight Erection Time</span>
                      <span className="font-mono text-emerald-400 font-bold">{activeModalProject.buildDurationDays} Working Days</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">Foundation Engineering</span>
                      <span className="text-stone-200 text-right truncate max-w-[200px]">{activeModalProject.foundationType}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-stone-800">
                      <span className="text-stone-400">HVAC / Renewable Heating</span>
                      <span className="text-stone-200 text-right truncate max-w-[200px]">{activeModalProject.heatingType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Exterior Protection</span>
                      <span className="text-stone-200 text-right truncate max-w-[200px]">{activeModalProject.timberFinish}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Construction Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Key Project Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProject.keyHighlights.map((hl, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-900 border border-stone-800/80 flex items-start gap-2.5 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Sticky Footer CTAs */}
            <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-stone-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ask your installer about warranty options for this style of build</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const cabinId = activeModalProject.modelId;
                    setActiveModalProject(null);
                    onConfigureCabin(cabinId);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Configure Similar Model</span>
                </button>

                <button
                  onClick={() => {
                    const title = activeModalProject.title;
                    setActiveModalProject(null);
                    onBookConsultation(`Consultation regarding completed build: ${title}`);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
