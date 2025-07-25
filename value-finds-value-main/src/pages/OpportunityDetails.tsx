import React from 'react';

const OpportunityDetails = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen">
      {/* Cover Section */}
      <div className="relative w-full h-72 md:h-96 flex items-end justify-start mb-8">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Program Cover"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <div className="relative z-20 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-4">
            <img src="/logo192.png" alt="Organizer Logo" className="w-16 h-16 rounded-xl shadow-lg bg-white p-2" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-1">Hangzhou INNONATION Powerhouse</h1>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Startup Competition</span>
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Virtual Program</span>
                <span className="bg-white/80 text-gray-800 text-xs px-3 py-1 rounded-full font-semibold">Apply before May 25th 2025</span>
              </div>
            </div>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mb-2">Come to Join 2025 Hangzhou Innovation & Entrepreneurship Competition - Up to 800K USD Prize Money Challenge</p>
        </div>
      </div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Gallery */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1,2,3,4,5].map(i => (
                <img
                  key={i}
                  src={`https://source.unsplash.com/random/300x180?sig=${i}&innovation`}
                  alt="Gallery"
                  className="rounded-xl w-48 h-28 object-cover shadow-md border border-white"
                />
              ))}
            </div>
          </div>
          {/* Video */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Intro Video</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg border border-white bg-black">
              <iframe
                src="https://www.youtube.com/embed/1KqFQ8h6A1E"
                title="Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64"
              ></iframe>
            </div>
          </div>
          {/* Summary */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              Join us on a thrilling global quest as we seek out exceptional enterprises! We are dedicated to attracting top-notch companies from various sectors, including smart industries, high-tech innovations, strategic emerging industries, and revitalization of traditional sectors. Our mission is to invigorate the innovation ecosystem, spark creative dynamism, foster investment in groundbreaking ideas, and extend a warm invitation to talented individuals and teams worldwide to embark on an entrepreneurial journey in Hangzhou, China, the city of innovation!
            </p>
          </div>
          {/* Stages & Sectors */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Stage</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Series A", "Pre-Seed", "Seed", "Angel", "Pre-A"].map(stage => (
                <span key={stage} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium border border-gray-200">{stage}</span>
              ))}
            </div>
            <h2 className="text-lg font-semibold mb-2">Sector</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Software Technology", "Intelligent manufacturing", "AI", "Green Technology", "VR", "IoT", "Life Science", "Digital Health", "Robotics", "New Material", "Big Data", "Cybersecurity", "Green Energy", "Biotech", "E-commerce", "Cloud Computing", "Culture Creativity", "Advanced Manufacturing", "Smart Healthcare", "Integrated circuit design"].map(sector => (
                <span key={sector} className="px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-700 font-medium border border-blue-100">{sector}</span>
              ))}
            </div>
            <h2 className="text-lg font-semibold mb-2">Ecosystem</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 bg-green-50 rounded-full text-xs text-green-700 font-medium border border-green-100">Worldwide</span>
            </div>
          </div>
          {/* Program Benefits */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Program Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><b>Prizes:</b> ONE First Prize (200,000 RMB), FIVE Second Prizes (100,000 RMB), TEN Third Prizes (50,000 RMB), several Winning Prizes (20,000/10,000 RMB).</li>
              <li><b>Venture Capital:</b> Major VC companies in Hangzhou will be invited for project financing connection.</li>
              <li><b>Business Networking:</b> Networking sessions with VC companies, enterprises, and industrial parks to connect with project owners.</li>
              <li><b>Startup Mentors:</b> Eminent VC investors and experts as mentors, providing guidance and resources.</li>
              <li><b>Sponsorship:</b> Startups registering in Hangzhou after the competition can receive up to RMB￥5,000,000 depending on prize and stage.</li>
              <li><b>Preferential Policies:</b> Eligible for tax cuts, housing subsidies, financial guarantees, and discount loans.</li>
              <li><b>Follow-up Services:</b> Dedicated project personnel, regular visits, funding application support, and entrepreneurship training.</li>
            </ul>
          </div>
          {/* More Details */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">More Details</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Hangzhou is emerging as the "AI Capital" of the future, leading the development of future technologies. In 2024, the added value of Hangzhou's core digital economy industries exceeded 630.5 billion yuan, accounting for 28.8% of the GDP. The "Six Little Dragons" of Hangzhou, representing artificial intelligence and new productive forces, have become the focus of global innovation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              DeepSeek, Game Science, Unitree, BrainCo, CloudWalker, and Kujiale are all contributing to Hangzhou's technological landscape. Hangzhou is only 1 hour by train from Shanghai, with a lower cost of living than Shanghai and Beijing, making it a great city for startups.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are a global and ambitious startup keen to enter one of the most prestigious and largest entrepreneurship competitions in the world, apply today!
            </p>
          </div>
          {/* About the Competition */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">About this Competition</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              The Competition 2025, scheduled to start in May, consists of two sessions targeting overseas students and foreigners committed to innovations or startups around the world. There will be 6 projects from overseas students with foreign academic degrees and 2 from foreign contestants, which have survived Preliminaries, Semi-Finals and Finals, that can reach the Grand Final scheduled in September, in which the first, second and third prizes will be given following a joint road show.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Competition is an inclusive platform directed and co-managed by the city authority and other stakeholders, providing impressive policies, talents, funds, industries and markets that help launch new business, and giving a chance for startup projects involving smart application, advanced technology, strategic emerging industries and the upgrading of outdated business.
            </p>
          </div>
          {/* Timeline */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Timeline</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Closing date for projects: May 31, 2025</li>
              <li>Preliminaries: June-July 2025</li>
              <li>Semifinal: August-September 2025</li>
              <li>Finals: September 2025</li>
              <li>Grand Final: during the Hangzhou International Human Resource Exchanges and Cooperation Conference in September</li>
              <li>More events like matchmaking webinars or networking sessions will be available from June</li>
            </ul>
          </div>
          {/* Eligibility */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Eligibility</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Age Limit: Contestants should be under the age of 50.</li>
              <li>Team Size: The team must consist of at least 4 members.</li>
              <li>Educational Qualifications: Participants must hold a master's degree or above. PhD preferred.</li>
              <li>Experience: Prior experience in technological innovation or running startups.</li>
              <li>Technological Focus: Startups should be engaged in acquiring new technologies or developing products with wide market prospects.</li>
            </ul>
          </div>
          {/* Partners */}
          <div className="mb-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Program Partners</h2>
            <div className="flex gap-4 flex-wrap">
              {["Founders Lair", "Expando", "Skolkovo Foundation", "Xi'an Startups"].map(partner => (
                <div key={partner} className="w-40 h-16 bg-gray-100 rounded-lg flex items-center justify-center shadow border border-gray-200">
                  <span className="text-gray-700 font-bold text-base">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-2">Share this program</h3>
            <p className="text-gray-600 mb-4">Obtain your unique referral link and share it with relevant startups in your network. Encourage them to apply and seize opportunities. As a startup ecosystem expert, every action—be it opening your referral link, submitting an application, or a candidate being shortlisted—enhances your profile's reputation. Grow in stature and increase your visibility within the startup community, showcasing your influence and expertise.</p>
            <button className="w-full bg-brand-yellow text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-all duration-200 mb-2 shadow">Share Program</button>
            <button className="w-full border border-brand-yellow text-brand-yellow font-semibold py-2 rounded-lg hover:bg-yellow-50 transition-all duration-200 shadow">Save to My Programs</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OpportunityDetails; 