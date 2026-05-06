# 📦 Páginas Customizadas de Produtos - Hybrid Approach

## 📋 Visão Geral

Este diretório contém **páginas customizadas** para produtos/módulos Sansys que precisam de:
- Seções exclusivas (não presentes em outros produtos)
- Componentes específicos (calculadoras, dashboards, demos)
- Layouts diferenciados
- Conteúdo rico e volume maior de informação

## 🏗️ Arquitetura (Opção 1 - Hybrid Approach)

```
Sistema de Roteamento Inteligente:
┌─────────────────────────────────────────┐
│ URL: #/pt/solucoes/sansys-pay          │
└──────────────┬──────────────────────────┘
               │
               ▼
      ┌────────────────────┐
      │   App.tsx Router   │
      └────────┬───────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌──────────────┐  ┌─────────────────────┐
│ Custom Page  │  │ Generic Template    │
│ (se existe)  │  │ (fallback)          │
├──────────────┤  ├─────────────────────┤
│ SansysPayPage│  │ SolutionDetailPage  │
│ SansysWater  │  │ (usa data/products) │
│ SansysBIPage │  │                     │
└──────────────┘  └─────────────────────┘
```

## ✅ Vantagens desta Abordagem

1. **Flexibilidade Total**: Cada produto customizado tem 100% de controle sobre layout e conteúdo
2. **Sem Duplicação**: Componentes comuns (Hero, Button, Card) são reutilizados
3. **Fácil Manutenção**: Produtos simples usam template genérico automaticamente
4. **Escalável**: Adicionar novos produtos é simples (3 passos)
5. **Preparado para Next.js**: Migração futura será `/app/[lang]/solutions/[slug]/page.tsx`
6. **CMS Ready**: Cada produto pode ter Content Type diferente no Strapi

## 🚀 Como Adicionar um Novo Produto Customizado

### **Passo 1: Criar o arquivo da página**

```bash
/pages/products/SansysBIPage.tsx
```

**Template inicial:**

```tsx
import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getProductBySlug } from "../../data/products"
import { Hero } from "../../components/sections/Hero"
import { PreWhatsAppModal } from "../../components/forms/PreWhatsAppModal"
import { Container } from "../../components/layout/Container"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ScrollToTop } from "../../components/ScrollToTop"
import { LogoBySlug } from "../../components/logos"

interface SansysBIPageProps {
  lang: Lang
}

export function SansysBIPage({ lang }: SansysBIPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const product = getProductBySlug("sansys-bi") // ← seu slug aqui
  
  if (!product) {
    return <Container className="py-20"><h1>Produto não encontrado</h1></Container>
  }

  return (
    <>
      <ScrollToTop />
      
      {/* Hero */}
      <Hero
        title={product.name[lang]}
        subtitle={product.shortDescription[lang]}
        image={product.image}
      />

      {/* Suas seções customizadas aqui */}
      <section className="py-16 bg-white">
        <Container>
          {/* Conteúdo exclusivo do Sansys BI */}
        </Container>
      </section>

      {/* Modal WhatsApp */}
      <PreWhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        lang={lang}
      />
    </>
  )
}
```

### **Passo 2: Registrar no roteador (App.tsx)**

Abra `/App.tsx` e adicione o import:

```tsx
// Custom Product Pages
import { SansysPayPage } from "./pages/products/SansysPayPage"
import { SansysWaterPage } from "./pages/products/SansysWaterPage"
import { SansysBIPage } from "./pages/products/SansysBIPage" // ← ADICIONE AQUI
```

Depois, adicione no objeto `customPages`:

```tsx
case "solutionDetail": {
  const customPages: Record<string, React.ComponentType<{ lang: Lang }>> = {
    'sansys-pay': SansysPayPage,
    'sansys-water': SansysWaterPage,
    'sansys-bi': SansysBIPage, // ← ADICIONE AQUI
  }
  // ...
}
```

### **Passo 3: Garantir que dados básicos existem**

Verifique se o produto está cadastrado em `/data/products.ts` ou `/data/modules.ts`:

```tsx
{
  id: "bi",
  slug: "sansys-bi", // ← Este slug deve coincidir!
  name: { pt: "Sansys BI", es: "...", en: "...", fr: "..." },
  // ... demais campos
}
```

**Pronto! ✅** Acesse `#/pt/solucoes/sansys-bi` para ver sua página customizada.

## 📚 Exemplos de Seções Customizadas

### **Sansys Pay** (SansysPayPage.tsx)
- ✅ Seção "Canais de Pagamento" (PIX, Boleto, Cartão)
- ✅ Seção "Integração Bancária"
- ✅ Seção "ROI e Redução de Inadimplência"
- ✅ 3 CTAs diferentes ao longo da página

### **Sansys Water** (SansysWaterPage.tsx)
- ✅ Seção "Gestão de Rede Hídrica" (4 cards)
- ✅ Seção "Controle de Perdas" com algoritmos ML
- ✅ Dashboard mockup de perdas
- ✅ Seção "Resultados Comprovados" com métricas

## 🎨 Componentes Reutilizáveis Disponíveis

```tsx
// Layout
import { Container } from "../../components/layout/Container"
import { Hero } from "../../components/sections/Hero"
import { ScrollToTop } from "../../components/ScrollToTop"

// UI
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

// Forms
import { PreWhatsAppModal } from "../../components/forms/PreWhatsAppModal"

// Logos
import { LogoBySlug } from "../../components/logos"

// Icons (lucide-react)
import { ArrowRight, CheckCircle, BarChart3, Shield } from "lucide-react"

// i18n
import { Lang, t } from "../../lib/i18n"

// Data
import { getProductBySlug } from "../../data/products"
import { getModuleBySlug } from "../../data/modules"
```

## 🔄 Quando Usar Página Customizada vs Template Genérico?

### **Use PÁGINA CUSTOMIZADA quando:**
- ✅ Produto tem seções exclusivas (ex: "Integração Bancária" só no Sansys Pay)
- ✅ Precisa de componentes interativos específicos (calculadoras, simuladores)
- ✅ Layout é muito diferente dos outros produtos
- ✅ Volume de conteúdo é significativamente maior
- ✅ Precisa de CTAs e conversões customizadas

### **Use TEMPLATE GENÉRICO quando:**
- ✅ Produto tem estrutura padrão (Hero + Features + Applications)
- ✅ Não precisa de seções exclusivas
- ✅ Conteúdo básico é suficiente
- ✅ Quer lançar rapidamente sem dev

**Exemplo:** Produtos como **Sansys Reader**, **Sansys Hub**, **Sansys Flow** provavelmente podem usar o template genérico.

## 🎯 Produtos Atuais

| Produto | Status | Arquivo |
|---------|--------|---------|
| **Sansys Pay** | ✅ Customizado | `SansysPayPage.tsx` |
| **Sansys Water** | ✅ Customizado | `SansysWaterPage.tsx` |
| Sansys Agency | 🔄 Template Genérico | - |
| Sansys Reader | 🔄 Template Genérico | - |
| Sansys Hub | 🔄 Template Genérico | - |
| Sansys Flow | 🔄 Template Genérico | - |
| Sansys GIS | 🔄 Template Genérico | - |
| Sansys Waste | 🔄 Template Genérico | - |

## 🔮 Roadmap / Próximos Passos

1. **Curto Prazo:**
   - [ ] Criar `SansysBIPage.tsx` com gráficos e dashboards
   - [ ] Criar `SansysAgencyPage.tsx` com seção omnichannel
   - [ ] Adicionar componente de vídeo demo nas páginas

2. **Médio Prazo:**
   - [ ] Integrar dados customizados via Strapi CMS
   - [ ] Criar sistema de blocos reutilizáveis (Content Blocks)
   - [ ] Adicionar A/B testing em CTAs

3. **Longo Prazo:**
   - [ ] Migração para Next.js App Router
   - [ ] SSG (Static Site Generation) para SEO
   - [ ] Dynamic Imports para performance

## 📝 Boas Práticas

1. **Mantenha dados básicos centralizados**: Nome, descrição, features devem vir de `/data/products.ts`
2. **Use conteúdo customizado inline**: Seções exclusivas podem ter textos hardcoded
3. **Reutilize componentes**: Não crie novos componentes se já existe um similar
4. **Traduções**: Sempre forneça conteúdo nos 4 idiomas (pt, es, en, fr)
5. **Mobile First**: Teste em mobile antes de publicar
6. **Acessibilidade**: Use landmarks semânticos (`<section>`, `<nav>`, etc)
7. **Performance**: Use lazy loading para imagens pesadas

## 🆘 Troubleshooting

**Problema:** Página customizada não carrega, mostra template genérico
- ✅ Verifique se o slug no `customPages` está correto
- ✅ Verifique se fez o import no `App.tsx`
- ✅ Limpe cache do navegador (Ctrl+Shift+R)

**Problema:** Dados do produto não aparecem
- ✅ Verifique se `getProductBySlug("seu-slug")` retorna dados
- ✅ Verifique se o slug em `/data/products.ts` está correto
- ✅ Console.log o `product` para debugar

**Problema:** Tradução não funciona
- ✅ Use sempre `{lang === 'pt' && "texto"}` ou objeto de conteúdo
- ✅ Não esqueça nenhum idioma (pt, es, en, fr)
- ✅ Para textos comuns, use `t(lang, "chave.traducao")`

---

**Documentação criada em:** Março 2026  
**Última atualização:** Março 2026  
**Mantido por:** Time de Desenvolvimento Jtech
