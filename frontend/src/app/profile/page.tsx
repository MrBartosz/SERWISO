"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { ShieldCheck, User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Jan Kowalski",
    phone: "+48 123 456 789",
    email: "jan.kowalski@firma.pl",
    role: "Użytkownik",
    lastUpdate: "2 dni temu",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordResetRequested, setPasswordResetRequested] = useState(false);
  const [emailChangeRequested, setEmailChangeRequested] = useState(false);

  const activities = [
    {
      id: 1,
      message: "Zalogowano się na urządzeniu Chrome",
      time: "2 godz. temu",
    },
    { id: 2, message: "Zmieniono numer telefonu", time: "1 dzień temu" },
    { id: 3, message: "Wysłano prośbę o reset hasła", time: "5 dni temu" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    console.log("Zapisano zmiany:", user);
    setIsEditing(false);
  };

  const requestPasswordReset = () => {
    console.log("Wysłano prośbę o reset hasła do właściciela");
    setPasswordResetRequested(true);
  };

  const requestEmailChange = () => {
    console.log("Wysłano prośbę o zmianę emaila do właściciela");
    setEmailChangeRequested(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="relative flex items-center p-6 shadow-lg rounded-2xl ">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-accent">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-semibold tracking-wide text-foreground">
              Mój profil
            </h1>
            <p className="text-sm text-muted">Podgląd i edycja danych konta</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm text-muted">
                Imię i nazwisko
              </label>
              <Input
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm text-muted">
                Telefon
              </label>
              <Input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm text-muted">
                Email
              </label>
              <Input name="email" value={user.email} disabled />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm text-muted">
                Rola
              </label>
              <Input name="role" value={user.role} disabled />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button onClick={saveChanges}>Zapisz zmiany</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edytuj dane</Button>
            )}
            <Badge className="flex items-center justify-center w-full gap-1">
              <span className="text-xs text-muted">
                Aktualizacja: {user.lastUpdate}
              </span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-accent" size={18} />
            <h2 className="text-lg font-semibold text-foreground">
              Bezpieczeństwo konta
            </h2>
          </div>
          <p className="text-sm text-muted">
            Nie możesz zmienić hasła samodzielnie. Wyślij prośbę do właściciela
            platformy.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={requestPasswordReset}
              disabled={passwordResetRequested}
            >
              {passwordResetRequested
                ? "Prośba wysłana"
                : "Poproś o reset hasła"}
            </Button>
            <Button
              onClick={requestEmailChange}
              disabled={emailChangeRequested}
              className="text-white bg-accent hover:bg-accentHover"
            >
              {emailChangeRequested
                ? "Prośba wysłana"
                : "Poproś o zmianę emaila"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Ostatnie aktywności
          </h2>
          {activities.length === 0 ? (
            <div className="flex justify-center text-muted">
              Brak aktywności
            </div>
          ) : (
            <ul className="space-y-2">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between pb-2 text-sm border-b border-border last:border-none"
                >
                  <span>{a.message}</span>
                  <span className="text-xs text-muted">{a.time}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
