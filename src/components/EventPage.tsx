import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { joinGroup } from "@/api/client";
import { Group } from "@/api/types";
import braiesImage from "@/assets/braies.jpg";
import cinqueterreImage from "@/assets/cinqueterre.jpg";
import tuscanyImage from "@/assets/tuscany.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [isJoining, setIsJoining] = useState(false);

  const imageMap: Record<string, string> = {
    "1": braiesImage,
    "2": tuscanyImage,
    "3": cinqueterreImage,
  };

  useEffect(() => {
    const fetchGroup = async () => {
      if (!id) return;

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/groups/${id}`);

        if (!response.ok) {
          throw new Error("Gruppo non trovato");
        }

        const data = (await response.json()) as Group;
        setGroup(data);
      } catch (error) {
        console.error("Errore caricamento gruppo:", error);
        toast.error("Impossibile caricare i dettagli del gruppo");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [id, navigate]);

  const handleJoinSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !group) {
      toast.error("Compila tutti i campi");
      return;
    }

    setIsJoining(true);
    try {
      const response = await joinGroup(group.id, { name, age });

      if (response.success) {
        toast.success("Ti sei unito al gruppo!");
        window.open(response.whatsappLink, "_blank");
        navigate("/");
      } else {
        toast.error("Gruppo al completo");
      }
    } catch (error) {
      console.error("Errore join gruppo:", error);
      toast.error("Impossibile unirsi al gruppo");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink text-xl">Caricamento...</div>
      </div>
    );
  }

  if (!group) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-ink hover:text-terracotta"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Torna alla home
          </Button>
        </div>
      </div>

      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={imageMap[group.id] || braiesImage}
          alt={group.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
                  {group.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-ink/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {new Date(group.date).toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>
                      {group.min_age}-{group.max_age} anni
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-ink mb-3">Stili del viaggio</h2>
                <div className="flex flex-wrap gap-2">
                  {group.styles.map((style) => (
                    <Badge
                      key={style}
                      variant="outline"
                      className="border-terracotta text-terracotta text-base px-4 py-2"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-ink mb-3">Descrizione</h2>
                <p className="text-ink/70 leading-relaxed">
                  Unisciti a questo micro-gruppo per un&apos;esperienza indimenticabile.
                  Partiremo insieme in camper verso {group.location} per vivere un weekend
                  all&apos;insegna dell&apos;
                  {group.styles.includes("Avventura") ? "avventura" : "relax"} e della natura. Il
                  gruppo è stato selezionato per garantire la massima compatibilità in base a età,
                  interessi e disponibilità.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-ink mb-3">Cosa include</h2>
                <ul className="space-y-2 text-ink/70">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">✓</span>
                    <span>Coordinamento tramite gruppo WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">✓</span>
                    <span>Micro-gruppo di {4 - group.spots_free + 1} persone della tua fascia d&apos;età</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">✓</span>
                    <span>Disponibilità verificata per il weekend selezionato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">✓</span>
                    <span>Compatibilità di stili di viaggio</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="p-6 bg-white shadow-xl rounded-2xl border-0 sticky top-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-ink">
                        {group.spots_free} {group.spots_free === 1 ? "posto" : "posti"}
                      </div>
                      <div className="text-sm text-ink/70">disponibili</div>
                    </div>
                    <Badge className="bg-terracotta/10 text-terracotta border-0">✓ Verificato</Badge>
                  </div>

                  {!showJoinForm ? (
                    <Button
                      onClick={() => setShowJoinForm(true)}
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full py-6 text-lg font-semibold"
                      disabled={group.spots_free === 0}
                    >
                      {group.spots_free === 0 ? "Gruppo al completo" : "Unisciti al gruppo"}
                    </Button>
                  ) : (
                    <form onSubmit={handleJoinSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-ink">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Il tuo nome"
                          className="rounded-xl border-sage mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="age" className="text-ink">
                          Età
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          min={group.min_age}
                          max={group.max_age}
                          value={age}
                          onChange={(event) => setAge(Number(event.target.value))}
                          className="rounded-xl border-sage mt-2"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full py-6 text-lg font-semibold"
                        disabled={isJoining}
                      >
                        {isJoining ? "Attendi..." : "Conferma e unisciti"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowJoinForm(false)}
                        className="w-full text-ink/70"
                      >
                        Annulla
                      </Button>
                    </form>
                  )}

                  <div className="pt-4 border-t border-sage/30">
                    <p className="text-sm text-ink/60 text-center">
                      Ti invieremo il link al gruppo WhatsApp dopo la conferma
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
