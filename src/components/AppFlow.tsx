import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { searchGroups, joinGroup } from "@/api/client";
import { Group } from "@/api/types";

type Step = 'onboarding' | 'groups' | 'success';

interface UserData {
  name: string;
  age: number;
  hasVan: boolean;
  date: string;
  styles: string[];
}

const AppFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 25,
    hasVan: false,
    date: '',
    styles: [],
  });
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const availableStyles = ['Tranquillo', 'Avventura', 'Fotografico', 'Sociale'];

  const toggleStyle = (style: string) => {
    setUserData(prev => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style]
    }));
  };

  const handleSearch = async () => {
    if (!userData.name || !userData.date) {
      toast.error('Compila nome e data');
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchGroups({
        age: userData.age,
        date: userData.date,
        styles: userData.styles,
        has_van: userData.hasVan,
      });
      setGroups(results);
      setCurrentStep('groups');
      
      if (results.length === 0) {
        toast.info('Nessun gruppo trovato al momento');
      }
    } catch (error) {
      console.error('Errore ricerca gruppi:', error);
      toast.error('Errore durante la ricerca. Assicurati che il backend sia attivo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (group: Group) => {
    setIsLoading(true);
    try {
      const response = await joinGroup(group.id, {
        name: userData.name,
        age: userData.age,
      });

      if (response.success) {
        setSelectedGroup(group);
        setWhatsappLink(response.whatsappLink);
        setCurrentStep('success');
        toast.success('Ti sei unito al gruppo!');
      } else {
        toast.error('Gruppo al completo');
      }
    } catch (error) {
      console.error('Errore join gruppo:', error);
      toast.error('Impossibile unirsi al gruppo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Onboarding Screen */}
        {currentStep === 'onboarding' && (
          <Card className="p-8 bg-white shadow-xl rounded-3xl border-0">
            <h2 className="text-3xl font-bold text-ink mb-6">Chi sei / Disponibilità</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-ink">Nome</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Il tuo nome"
                  className="rounded-xl border-sage mt-2"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-ink">Età</Label>
                <Input
                  id="age"
                  type="number"
                  min={20}
                  max={45}
                  value={userData.age}
                  onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
                  className="rounded-xl border-sage mt-2"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-ink">Hai un minivan?</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={userData.hasVan ? "default" : "outline"}
                    onClick={() => setUserData({ ...userData, hasVan: true })}
                    className={`flex-1 rounded-full ${userData.hasVan ? 'bg-terracotta hover:bg-terracotta/90 text-white' : 'border-sage'}`}
                  >
                    Ho un minivan
                  </Button>
                  <Button
                    type="button"
                    variant={!userData.hasVan ? "default" : "outline"}
                    onClick={() => setUserData({ ...userData, hasVan: false })}
                    className={`flex-1 rounded-full ${!userData.hasVan ? 'bg-terracotta hover:bg-terracotta/90 text-white' : 'border-sage'}`}
                  >
                    Passeggero
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="date" className="text-ink">Quando vuoi partire?</Label>
                <Input
                  id="date"
                  type="date"
                  value={userData.date}
                  onChange={(e) => setUserData({ ...userData, date: e.target.value })}
                  className="rounded-xl border-sage mt-2"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-ink">Stile di viaggio</Label>
                <div className="flex flex-wrap gap-3">
                  {availableStyles.map(style => (
                    <Button
                      key={style}
                      type="button"
                      variant={userData.styles.includes(style) ? "default" : "outline"}
                      onClick={() => toggleStyle(style)}
                      className={`rounded-full ${
                        userData.styles.includes(style)
                          ? 'bg-terracotta hover:bg-terracotta/90 text-white'
                          : 'border-sage text-ink hover:border-terracotta'
                      }`}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-lg py-6 rounded-full mt-8"
              >
                {isLoading ? 'Cerco...' : 'Trova micro-gruppi disponibili ora'}
              </Button>
            </div>
          </Card>
        )}

        {/* Groups Screen */}
        {currentStep === 'groups' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-ink">Gruppi compatibili disponibili ora</h2>
              <Button
                variant="outline"
                onClick={() => setCurrentStep('onboarding')}
                className="rounded-full border-sage"
              >
                ← Indietro
              </Button>
            </div>

            {groups.length === 0 ? (
              <Card className="p-12 bg-white shadow-xl rounded-3xl border-0 text-center">
                <div className="text-6xl mb-4">🏕️</div>
                <h3 className="text-2xl font-semibold text-ink mb-2">Nessun gruppo trovato</h3>
                <p className="text-ink/70">Riprova più tardi o modifica i tuoi filtri</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {groups.map(group => (
                  <Card key={group.id} className="overflow-hidden border-0 shadow-xl rounded-3xl bg-white">
                    <div className="md:flex">
                      {group.image && (
                        <div className="md:w-1/3">
                          <img
                            src={group.image}
                            alt={group.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 md:w-2/3 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-ink">{group.name}</h3>
                            <p className="text-ink/70">{group.location}</p>
                          </div>
                          <Badge className="bg-sage text-ink">
                            {group.min_age}-{group.max_age} anni
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {group.styles.map(style => (
                            <Badge
                              key={style}
                              variant="outline"
                              className="border-terracotta text-terracotta"
                            >
                              {style}
                            </Badge>
                          ))}
                        </div>

                        <Badge className="bg-terracotta/10 text-terracotta border-0">
                          ✓ Disponibilità verificata
                        </Badge>

                        <p className="text-ink/70 font-semibold">
                          {group.spots_free} {group.spots_free === 1 ? 'posto libero' : 'posti liberi'}
                        </p>

                        <p className="text-sm text-ink/60">Partenza: {group.date}</p>

                        <Button
                          onClick={() => handleJoin(group)}
                          disabled={isLoading || group.spots_free === 0}
                          className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold py-6 rounded-full"
                        >
                          {isLoading ? 'Sto unendo...' : 'Unisciti al gruppo su WhatsApp'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Success Screen */}
        {currentStep === 'success' && selectedGroup && (
          <Card className="p-8 bg-white shadow-xl rounded-3xl border-0 text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-bold text-ink">Gruppo creato!</h2>
            <p className="text-lg text-ink/70 max-w-xl mx-auto">
              Ecco il link per unirti alle 2–4 persone compatibili con te. Partenza {selectedGroup.date}. Coordinate e dettagli nel gruppo.
            </p>
            <div className="bg-sage/20 p-6 rounded-2xl">
              <p className="text-sm text-ink/70 mb-2">Gruppo</p>
              <p className="text-xl font-semibold text-ink">{selectedGroup.name}</p>
            </div>
            <Button
              onClick={() => window.open(whatsappLink, '_blank')}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg px-8 py-6 rounded-full"
            >
              💬 Apri il gruppo WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep('onboarding');
                setGroups([]);
                setSelectedGroup(null);
              }}
              className="rounded-full border-sage"
            >
              Cerca un altro gruppo
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppFlow;
