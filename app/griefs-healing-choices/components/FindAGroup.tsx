'use client';

import { useState } from 'react';
import { GriefCategory, Group } from '../types';
import { CategoryPicker } from './CategoryPicker';
import { GroupList } from './GroupList';
import { JoinForm } from './JoinForm';

type View = 'categories' | 'groups' | 'form' | 'confirmation';

export function FindAGroup() {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<GriefCategory | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [formType, setFormType] = useState<'join' | 'interest'>('interest');

  const handleCategorySelect = (category: GriefCategory) => {
    setSelectedCategory(category);
    setView('groups');
  };

  const handleJoin = (group: Group) => {
    setSelectedGroup(group);
    setFormType('join');
    setView('form');
  };

  const handleInterest = () => {
    setSelectedGroup(null);
    setFormType('interest');
    setView('form');
  };

  const handleFormSubmit = () => {
    setView('confirmation');
  };

  const handleBack = () => {
    if (view === 'groups') {
      setView('categories');
      setSelectedCategory(null);
    } else if (view === 'form') {
      setView('groups');
    }
  };

  const handleStartOver = () => {
    setView('categories');
    setSelectedCategory(null);
    setSelectedGroup(null);
  };

  return (
    <div className="find-group__panel">
      {view === 'categories' && (
        <CategoryPicker onSelect={handleCategorySelect} />
      )}

      {view === 'groups' && selectedCategory && (
        <GroupList
          category={selectedCategory}
          onBack={handleBack}
          onJoin={handleJoin}
          onInterest={handleInterest}
        />
      )}

      {view === 'form' && selectedCategory && (
        <JoinForm
          category={selectedCategory}
          group={selectedGroup}
          formType={formType}
          onBack={handleBack}
          onSubmit={handleFormSubmit}
        />
      )}

      {view === 'confirmation' && (
        <div className="find-group__step find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="24" r="20" />
              <path d="M15 24l6 6 12-12" />
            </svg>
          </div>
          <h3 className="find-group__question">
            {formType === 'join' ? 'Your request was sent.' : 'We heard you.'}
          </h3>
          <p className="find-group__question-sub">
            {formType === 'join'
              ? "Someone from Grief's Healing Choices will reach out personally to welcome you. You don't have to do anything else right now."
              : "We've noted your interest. When a group forms for this type of loss, we'll be in touch. You're not alone in this."}
          </p>
          <button className="btn-secondary" onClick={handleStartOver} type="button">
            Back to the beginning
          </button>
        </div>
      )}
    </div>
  );
}
