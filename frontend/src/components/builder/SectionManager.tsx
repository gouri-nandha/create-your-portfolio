import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Plus, Trash2, Check } from 'lucide-react';
import { PortfolioSection, SectionType } from '../../types/portfolio';

interface SortableItemProps {
  section: PortfolioSection;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onRemove: () => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  section,
  isSelected,
  onSelect,
  onToggleVisibility,
  onRemove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
        isSelected
          ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm'
          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
      } ${!section.visible ? 'opacity-60 bg-slate-950/40' : ''}`}
    >
      <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={onSelect}>
        <button
          {...attributes}
          {...listeners}
          className="p-1 rounded text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="capitalize truncate select-none">{section.title}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleVisibility}
          className={`p-1.5 rounded-lg transition-colors ${
            section.visible
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900'
          }`}
          title={section.visible ? 'Hide section' : 'Show section'}
        >
          {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        {section.type !== 'hero' && (
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Delete section"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

interface SectionManagerProps {
  sections: PortfolioSection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onReorder: (newSections: PortfolioSection[]) => void;
  onToggleVisibility: (id: string) => void;
  onAddSection: (type: SectionType, title: string) => void;
  onRemoveSection: (id: string) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  onReorder,
  onToggleVisibility,
  onAddSection,
  onRemoveSection,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      onReorder(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const availableSectionTypes: { type: SectionType; title: string }[] = [
    { type: 'about', title: 'About Me' },
    { type: 'skills', title: 'Skills & Tools' },
    { type: 'projects', title: 'Featured Projects' },
    { type: 'experience', title: 'Work Experience' },
    { type: 'education', title: 'Education' },
    { type: 'certifications', title: 'Certifications' },
    { type: 'achievements', title: 'Achievements' },
    { type: 'contact', title: 'Contact' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Sections</h2>
          <p className="text-xs text-slate-400">Drag to reorder layout</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Add Section
              </div>
              {availableSectionTypes.map(item => {
                const alreadyAdded = sections.some(s => s.type === item.type);
                return (
                  <button
                    key={item.type}
                    onClick={() => {
                      onAddSection(item.type, item.title);
                      setShowAddMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between transition-colors"
                  >
                    <span>{item.title}</span>
                    {alreadyAdded && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map(section => (
              <SortableItem
                key={section.id}
                section={section}
                isSelected={section.id === activeSectionId}
                onSelect={() => onSelectSection(section.id)}
                onToggleVisibility={() => onToggleVisibility(section.id)}
                onRemove={() => onRemoveSection(section.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
