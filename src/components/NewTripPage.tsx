import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createGroup } from "@/api/client";

interface NewTripPageProps {
  onDone?: () => void;
}

const NewTripPage = ({ onDone }: NewTripPageProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);
  const [styles, setStyles] = useState<string>("");
  const [spotsFree, setSpotsFree] = useState(4);
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name || !location || !date) {
      toast.error("Compila nome, luogo e data");
      return;
    }

    const payload = {
      name,
      location,
      date,
      min_age: minAge,
      max_age: maxAge,
      styles: styles.split(",").map(s => s.trim()).filter(Boolean),
      spots_free: spotsFree,
      image,
    };

    setIsSubmitting(true);
    try {
      const created = await createGroup(payload);
      toast.success("Gita creata con successo");
      // optionally open whatsapp link
      if (created.whatsapp_link) {
        window.open(created.whatsapp_link, "_blank");
      }
      if (onDone) onDone();
    } catch (err) {
      console.error("Errore creazione gita", err);
      toast.error("Impossibile creare la gita. Prova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 bg-white shadow-xl rounded-3xl border-0">
          <h2 className="text-3xl font-bold text-ink mb-4">Crea una nuova gita</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-ink">Titolo</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Es. Weekend al lago" className="mt-2 rounded-xl" />
            </div>

            <div>
              <Label htmlFor="location" className="text-ink">Luogo</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Es. Lago di Braies" className="mt-2 rounded-xl" />
            </div>

            <div>
              <Label htmlFor="date" className="text-ink">Data</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minAge" className="text-ink">Età minima</Label>
                <Input id="minAge" type="number" min={18} value={minAge} onChange={(e) => setMinAge(parseInt(e.target.value || '0'))} className="mt-2 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="maxAge" className="text-ink">Età massima</Label>
                <Input id="maxAge" type="number" min={18} value={maxAge} onChange={(e) => setMaxAge(parseInt(e.target.value || '0'))} className="mt-2 rounded-xl" />
              </div>
            </div>

            <div>
              <Label htmlFor="styles" className="text-ink">Stili (separati da virgola)</Label>
              <Input id="styles" value={styles} onChange={(e) => setStyles(e.target.value)} placeholder="Es. Tranquillo, Natura" className="mt-2 rounded-xl" />
            </div>

            <div>
              <Label htmlFor="spots" className="text-ink">Posti liberi</Label>
              <Input id="spots" type="number" min={1} value={spotsFree} onChange={(e) => setSpotsFree(parseInt(e.target.value || '1'))} className="mt-2 rounded-xl" />
            </div>

            <div>
              <Label htmlFor="image" className="text-ink">URL immagine (opzionale)</Label>
              <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/src/assets/immagine.jpg" className="mt-2 rounded-xl" />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white font-semibold py-4 rounded-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sto creando...' : 'Crea gita'}
              </Button>
              <Button type="button" variant="outline" className="rounded-full" onClick={() => onDone && onDone()}>
                Annulla
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewTripPage;
