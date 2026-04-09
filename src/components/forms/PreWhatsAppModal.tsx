import { useState } from "react"
import { Dialog, DialogHeader, DialogBody } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Lang, t } from "../../lib/i18n"
import { submitPreWhatsAppLead } from "../../lib/leads"
import { openWhatsApp } from "../../lib/whatsapp"
import { trackFormSubmit } from "../../lib/analytics"

interface PreWhatsAppModalProps {
  open: boolean
  onClose: () => void
  lang: Lang
}

export function PreWhatsAppModal({ open, onClose, lang }: PreWhatsAppModalProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", phone: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitPreWhatsAppLead({ ...form, source: "pre-whatsapp" })
      trackFormSubmit("pre_whatsapp", { company: form.company })
    } catch {
      // silently continue
    }

    onClose()
    openWhatsApp(
      `Olá! Meu nome é ${form.name}, da empresa ${form.company}. Gostaria de saber mais sobre as soluções Jtech.`
    )
    setLoading(false)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader
        title={t(lang, "prewhatsapp.title")}
        subtitle={t(lang, "prewhatsapp.subtitle")}
        onClose={onClose}
      />
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t(lang, "prewhatsapp.name")} *</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">{t(lang, "prewhatsapp.email")} *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="company">{t(lang, "prewhatsapp.company")} *</Label>
            <Input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">{t(lang, "prewhatsapp.role")}</Label>
            <Input
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">{t(lang, "prewhatsapp.phone")}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              {t(lang, "prewhatsapp.close")}
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? t(lang, "common.loading") : t(lang, "prewhatsapp.cta")}
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  )
}
