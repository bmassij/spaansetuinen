import React, { useState } from 'react';

export default function ContactForm(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Algemeen');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Geen backend integratie — log alleen de waarden
    // Klaar om te hooken aan een API indien later gewenst
    console.log({ name, email, phone, subject, message });
    // Optioneel: clear form
    setName('');
    setEmail('');
    setPhone('');
    setSubject('Algemeen');
    setMessage('');
  }

  return (
    <div className="max-w-xl w-full bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Neem contact met ons op</h2>
      <p className="text-gray-600 mb-4">Vul onderstaand formulier in en we nemen snel contact op. Vermeld waar uw vraag over gaat zodat we gerichter kunnen reageren.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Uw naam"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="naam@voorbeeld.nl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon (optioneel)</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp</label>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option>Algemeen</option>
            <option>Verhuur</option>
            <option>Bestelling</option>
            <option>Offerte</option>
            <option>Overig</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bericht</label>
          <textarea
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Schrijf hier uw bericht..."
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Verstuur bericht
          </button>
        </div>
      </form>
    </div>
  );
}
