const featuredSponsors = [
  {
    name: "Sicredi",
    logo: "/sponsors/sicredi.png",
    tier: "Patrocinador Destaque",
  },
  { name: "Prefeitura Municipal de Vargem Alta", logo: "/sponsors/prefeitura-horizontal.png", tier: "Parceiro" },
];

const sponsors = [
  
  {
    name: "Lei de Incentivo ao Esporte Capixaba",
    logo: "/sponsors/lei-incentivo-transparent.png",
    tier: "Incentivo",
  },
  { name: "Supermercado Mosquini", logo: "/sponsors/mosquini.png", tier: "Parceiro" },
  { name: "Fazzy Internet", logo: "/sponsors/fazzy.png", tier: "Parceiro" },
  { name: "Vanini Materiais de Construção", logo: "/sponsors/vanini.png", tier: "Parceiro" },
  { name: "Salt Clinic", logo: "/sponsors/salt.png", tier: "Parceiro" },
  { name: "Movement Academia", logo: "/sponsors/moviment.png", tier: "Parceiro" },
  { name: "Allan Ferreira", logo: "/sponsors/allan.png", tier: "Parceiro" },
  { name: "Exati Contabilidade", logo: "/sponsors/exati-transparent.png", tier: "Parceiro" },

  // Já existentes no projeto
  { name: "Super Druzzzi", logo: "/sponsors/superdruzzi.png", tier: "Parceiro" },
  { name: "Drogaria São Bento", logo: "/sponsors/drogaria-sao-bento.png", tier: "Parceiro" },
  { name: "Central de Vendas", logo: "/sponsors/central-de-vendas.png", tier: "Parceiro" },
  { name: "SMART Ferramentas Industriais", logo: "/sponsors/smart.png", tier: "Parceiro" },
  { name: "Transportes Robson", logo: "/sponsors/transportes-robson.png", tier: "Parceiro" },
  { name: "FES", logo: "/sponsors/fes.png", tier: "Parceiro" },
];

// Named export to match App.tsx import (and a default export for flexibility).
export function Sponsors() {
  return (
    <section id="parceiros" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">Parceiros</h2>
          <p className="mt-4 text-slate-700 text-lg">
            Agradecemos a todos os apoiadores que tornam este projeto possível.
          </p>
        </div>

        {/* Featured Sponsors */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredSponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="p-8 flex flex-col items-center gap-6">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-44 sm:h-52 md:h-60 w-auto object-contain"
                    loading="lazy"
                  />
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                      {sponsor.name}
                    </h3>
                    <p className="text-sm text-slate-600">{sponsor.tier}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Sponsors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              title={sponsor.name}
            >
              <div className="p-5 flex items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-24 sm:h-28 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-700 text-lg">
            Quer fazer parte deste projeto? Entre em contato conosco e seja um parceiro!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
