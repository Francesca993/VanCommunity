import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-van.jpg";
import braiesImage from "@/assets/braies.jpg";
import tuscanyImage from "@/assets/tuscany.jpg";
import cinqueterreImage from "@/assets/cinqueterre.jpg";

interface LandingPageProps {
  onFindGroup: () => void;
}

const LandingPage = ({ onFindGroup }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight">
              Unisciti a giovani camperisti per un weekend all'ultimo minuto
            </h1>
            <p className="text-lg md:text-xl text-ink/70">
              Trova al volo micro-gruppi della tua età, con disponibilità verificata per questo weekend.
            </p>
            <Button 
              onClick={onFindGroup}
              size="lg"
              className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-lg px-8 py-6 rounded-full"
            >
              Trova un gruppo ora
            </Button>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Van camperizzato al tramonto" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona Section */}
      <section className="bg-sage/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
            Come funziona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-ink">Seleziona quando vuoi partire</h3>
              <p className="text-ink/70">
                Indica la tua disponibilità e preferenze per il weekend.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-ink">Vedi gruppi di coetanei disponibili</h3>
              <p className="text-ink/70">
                Match istantaneo con micro-gruppi compatibili con te.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-ink">Unisciti subito a un viaggio compatibile</h3>
              <p className="text-ink/70">
                Connettiti via WhatsApp e parti per l'avventura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gruppi Pronti Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
            Gruppi pronti a partire
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              <img 
                src={braiesImage} 
                alt="Lago di Braies" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-ink">Lago di Braies</h3>
                  <Badge className="bg-sage text-ink">28-34 anni</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Tranquillo
                  </Badge>
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Lago
                  </Badge>
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Natura
                  </Badge>
                </div>
                <Badge className="bg-terracotta/10 text-terracotta border-0">
                  ✓ Disponibilità verificata
                </Badge>
                <p className="text-ink/70">3 posti liberi</p>
                <Button 
                  onClick={onFindGroup}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full"
                >
                  Unisciti
                </Button>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              <img 
                src={tuscanyImage} 
                alt="Toscana" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-ink">Toscana</h3>
                  <Badge className="bg-sage text-ink">25-32 anni</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Fotografico
                  </Badge>
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Sociale
                  </Badge>
                </div>
                <Badge className="bg-terracotta/10 text-terracotta border-0">
                  ✓ Disponibilità verificata
                </Badge>
                <p className="text-ink/70">2 posti liberi</p>
                <Button 
                  onClick={onFindGroup}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full"
                >
                  Unisciti
                </Button>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              <img 
                src={cinqueterreImage} 
                alt="Cinque Terre" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-ink">Cinque Terre</h3>
                  <Badge className="bg-sage text-ink">30-40 anni</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Avventura
                  </Badge>
                  <Badge variant="outline" className="border-terracotta text-terracotta">
                    Sociale
                  </Badge>
                </div>
                <Badge className="bg-terracotta/10 text-terracotta border-0">
                  ✓ Disponibilità verificata
                </Badge>
                <p className="text-ink/70">4 posti liberi</p>
                <Button 
                  onClick={onFindGroup}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full"
                >
                  Unisciti
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cosa Include Section */}
      <section className="bg-sage/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
            Ogni gruppo include
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="text-5xl">👤</div>
              <h3 className="text-xl font-semibold text-ink">Profilo rapido</h3>
              <p className="text-ink/70">
                Età, interessi e disponibilità di ogni partecipante.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl">✓</div>
              <h3 className="text-xl font-semibold text-ink">Disponibilità verificata</h3>
              <p className="text-ink/70">
                Solo persone realmente libere questo weekend.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl">💬</div>
              <h3 className="text-xl font-semibold text-ink">Chat di gruppo</h3>
              <p className="text-ink/70">
                Coordinatevi facilmente su WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-ink">
            Pronto per la prossima uscita?
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Entra nella community di giovani camperisti e scopri micro-gruppi compatibili disponibili ora.
          </p>
          <Button 
            onClick={onFindGroup}
            size="lg"
            className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-lg px-8 py-6 rounded-full"
          >
            Inizia da qui
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-8">
        <div className="container mx-auto px-4 text-center text-cream/70">
          <p>© 2025 Van Trips. Connetti, viaggia, scopri.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
