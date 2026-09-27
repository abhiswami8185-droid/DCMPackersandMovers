import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';
import { backend } from '../../services/backend';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Household Relocation Inquiry');
  const [movingFrom, setMovingFrom] = useState('Mohali');
  const [movingTo, setMovingTo] = useState('New Delhi');
  const [serviceRequired, setServiceRequired] = useState('Household Shifting');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await backend.createLead({
      name,
      phone,
      email: email || 'contact@dcm.com',
      originCity: movingFrom,
      destinationCity: movingTo,
      movingDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      moveType: 'home',
      approxVolume: serviceRequired,
      stage: 'new',
      notes: `Subject: ${subject} | Message: ${message || 'No additional notes'}`,
    });

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FFFDF5] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
            Official Contact Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
            Connect With DCM Packers &amp; Movers
          </h2>
          <p className="text-sm text-slate-600">
            Reach out directly to our central Chandigarh headquarters or regional operational branches across Mohali, Panchkula, and all India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Call, WhatsApp & Branch Addresses */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Contact Cards */}
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-blue-950 text-base border-b border-amber-100 pb-2">
                Headquarters &amp; Direct Support
              </h3>

              <div className="space-y-3 text-xs">
                {/* Primary Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Primary Contact Numbers</span>
                    <a
                      href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                      className="font-bold text-slate-900 text-sm hover:text-orange-600 block transition-colors"
                    >
                      {DCM_CONTACT.primaryPhone}
                    </a>
                    <a
                      href={`tel:${DCM_CONTACT.alternatePhone.replace(/\s+/g, '')}`}
                      className="font-semibold text-slate-700 hover:text-orange-600 block transition-colors"
                    >
                      {DCM_CONTACT.alternatePhone} (Alternate Support)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Official Email</span>
                    <a
                      href={`mailto:${DCM_CONTACT.email}`}
                      className="font-bold text-slate-900 hover:text-blue-900 transition-colors"
                    >
                      {DCM_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Official Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Registered Office</span>
                    <p className="font-semibold text-slate-900 leading-relaxed">
                      {DCM_CONTACT.headOffice.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: CALL NOW & WHATSAPP */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-amber-100">
                <a
                  href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                  className="btn-3d-navy h-10 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={DCM_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 h-10 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Regional Branches List */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-2xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Regional Operating Branches</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                {DCM_CONTACT.branches.slice(0, 4).map((b, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FFFDF5] rounded-xl border border-amber-100/80">
                    <div className="flex justify-between font-bold text-blue-950 text-xs">
                      <span>{b.city}</span>
                      <span className="text-[10px] text-orange-600 font-mono">{b.phone}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{b.address}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Complete Enquiry Form (Section 20 of user prompt) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                  Quick Callback Request
                </span>
                <h3 className="text-xl font-black text-blue-950 mt-0.5">
                  Send Your Relocation Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your move details below. A dedicated DCM relocation coordinator will respond within 15 minutes.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-blue-950 text-lg">Enquiry Successfully Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {name}. Our relocation supervisor in Mohali/Chandigarh has received your enquiry and will contact you at <strong>{phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-orange-600 hover:underline pt-2 inline-block"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Swami"
                        required
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        required
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number (+91)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9779593495"
                        required
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. 3BHK Shifting from Mohali to Delhi"
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Moving From & Moving To */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Moving From</label>
                      <input
                        type="text"
                        value={movingFrom}
                        onChange={(e) => setMovingFrom(e.target.value)}
                        placeholder="e.g. Mohali Phase 7"
                        required
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Moving To</label>
                      <input
                        type="text"
                        value={movingTo}
                        onChange={(e) => setMovingTo(e.target.value)}
                        placeholder="e.g. New Delhi Vasant Vihar"
                        required
                        className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Service Required</label>
                    <select
                      value={serviceRequired}
                      onChange={(e) => setServiceRequired(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Household Shifting">Household Shifting</option>
                      <option value="Local Shifting in Mohali/Chandigarh">Local Shifting in Mohali / Chandigarh</option>
                      <option value="Office Shifting">Office / Corporate Shifting</option>
                      <option value="Car Transportation">Car Transportation</option>
                      <option value="Bike Transportation">Bike Transportation</option>
                      <option value="Warehousing & Storage">Warehousing &amp; Storage</option>
                      <option value="Packing & Unpacking Only">Packing &amp; Unpacking Only</option>
                    </select>
                  </div>

                  {/* Message Details */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Message or Special Instructions</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention any large furniture, floor levels, or preferred date..."
                      className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-3d-orange w-full h-11 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND ENQUIRY</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
