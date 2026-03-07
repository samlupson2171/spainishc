import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { TrendingUp, TrendingDown, Users, Building, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Market Insights | Spanish Conveyancing',
  description: 'Costa del Sol property market data 2025. 36,806 Malaga sales, Golden Triangle trends, buyer nationality breakdown.',
};

const marketData = [
  { area: 'Marbella', sales2024: '3,589', sales2025: '3,213', trend: -10.05 },
  { area: 'Benahavis', sales2024: '614', sales2025: '539', trend: -12.2 },
  { area: 'Estepona', sales2024: '2,179', sales2025: '2,423', trend: 11.2 },
  { area: 'Golden Triangle Total', sales2024: '6,382', sales2025: '6,175', trend: -3.2 },
];

const buyerNationalities = [
  { country: 'British', percentage: 15, trend: 'stable' },
  { country: 'Dutch', percentage: 8, trend: 'stable' },
  { country: 'Swedish', percentage: 8, trend: 'stable' },
  { country: 'Polish', percentage: 4.55, trend: 'up', note: 'from 3.57%' },
  { country: 'Czech', percentage: 3, trend: 'up' },
  { country: 'Romanian', percentage: 2.5, trend: 'up' },
  { country: 'Ukrainian', percentage: 2, trend: 'up' },
  { country: 'North American', percentage: 1.68, trend: 'up' },
];

export default function MarketPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center" style={{ backgroundImage: 'url(/images/flags-of-spain-and-autonomous-community-catalonia-2026-01-06-10-31-37-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Market Insights</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">Market Insights</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a227] font-medium mb-2">2025-26 Data</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
              Costa del Sol: Europe&apos;s <span className="text-[#c9a227]">Hottest</span> Property Market
            </h2>
            <p className="text-gray-600 text-lg">
              Malaga led Andalucia with 1-in-4 regional sales. Limited supply + foreign influx = agent opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-[#1a1a2e] py-16">
        <div className="r-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">36,806</p>
              <p className="text-white mt-2">Malaga Province Sales</p>
              <p className="text-[#c9a227] text-sm">+4.27% YoY</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">85%</p>
              <p className="text-white mt-2">Foreign Transactions</p>
              <p className="text-gray-400 text-sm">Andalucia region</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">€350k</p>
              <p className="text-white mt-2">Avg Costa del Sol</p>
              <p className="text-gray-400 text-sm">€800k in Marbella</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">6,000+</p>
              <p className="text-white mt-2">Active Autonomos</p>
              <p className="text-gray-400 text-sm">3,500+ on Costa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Data Table */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
              Golden Triangle <span className="text-[#c9a227]">Sales Data</span> Q1-Q3
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1a1a2e] text-white">
                    <th className="px-6 py-4 text-left">Area</th>
                    <th className="px-6 py-4 text-right">Q1-Q3 2024</th>
                    <th className="px-6 py-4 text-right">Q1-Q3 2025</th>
                    <th className="px-6 py-4 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((row, i) => (
                    <tr key={i} className={`border-b ${row.area === 'Golden Triangle Total' ? 'bg-gray-100 font-bold' : ''}`}>
                      <td className="px-6 py-4">{row.area}</td>
                      <td className="px-6 py-4 text-right">{row.sales2024}</td>
                      <td className="px-6 py-4 text-right">{row.sales2025}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 ${row.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {row.trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {row.trend > 0 ? '+' : ''}{row.trend}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Trends */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Buyer Demographics</p>
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                Top <span className="text-[#c9a227]">Buyer Nationalities</span>
              </h3>
              <p className="text-gray-600 mb-8">
                Foreigners account for 85% of Andalucia transactions; 33.71% in Malaga (higher in luxury areas).
              </p>

              <div className="space-y-4">
                {buyerNationalities.map((buyer, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <Users className="text-[#c9a227]" size={20} />
                      <span className="font-medium">{buyer.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#c9a227]">{buyer.percentage}%</span>
                      {buyer.trend === 'up' && (
                        <TrendingUp className="text-green-600" size={16} />
                      )}
                      {buyer.note && (
                        <span className="text-xs text-gray-500">{buyer.note}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#c9a227] font-medium mb-2">Market Highlights</p>
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                Why <span className="text-[#c9a227]">Now?</span>
              </h3>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Building className="text-[#c9a227] mb-3" size={28} />
                  <h4 className="font-bold mb-2">Growing Agent Network</h4>
                  <p className="text-gray-600">
                    6k+ autonomos (3.5k+ on Costa), new shops opening monthly in Marbella. Digital nomads reshaping agencies.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <TrendingUp className="text-[#c9a227] mb-3" size={28} />
                  <h4 className="font-bold mb-2">Price Premium</h4>
                  <p className="text-gray-600">
                    Prices 3-9% above national average. Average Costa del Sol €350k, Marbella €800k.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Users className="text-[#c9a227] mb-3" size={28} />
                  <h4 className="font-bold mb-2">International Demand</h4>
                  <p className="text-gray-600">
                    46% of Malaga&apos;s autonomo agents are foreign-born—your competition is international.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Partner Today</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Capitalize on the <span className="text-[#c9a227]">Boom</span>
              </h2>
              <p className="text-gray-600 mb-6">
                With 36,806 sales in Malaga province and rising foreign demand, now is the time to partner with vetted conveyancing lawyers.
              </p>
              <Link href="/agents" className="btn-accent inline-flex items-center gap-2">
                For Agents <ArrowRight size={18} />
              </Link>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
