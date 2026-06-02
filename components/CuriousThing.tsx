'use client';

import { useEffect, useState } from 'react';

const facts = [
  'The smell after rain has a name: petrichor.',
  'A day on Venus is longer than a year on Venus.',
  'Oxford University is older than the Aztec Empire.',
  'The dot over a lowercase i or j is called a tittle.',
  'Bananas are botanically berries, but strawberries are not.',
  'Honey can stay edible for thousands of years when sealed and stored well.',
  'The word "bookkeeper" has three double letters in a row.',
  'Sharks are older than trees.',
  'A group of flamingos is called a flamboyance.',
  'There are more possible chess games than atoms in the observable universe.',
];

export function CuriousThing() {
  const [fact, setFact] = useState(facts[0]);
  useEffect(() => setFact(facts[Math.floor(Math.random() * facts.length)]), []);
  return <section className="curious-thing"><div className="curious-inner"><p className="curious-label">A Curious Thing</p><p className="curious-fact">{fact}</p></div></section>;
}
