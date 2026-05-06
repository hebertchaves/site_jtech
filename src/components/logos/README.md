# 📦 Repositório de Logos Sansys

## 🎯 Objetivo

Centralizar todos os SVGs de logos de produtos e módulos Sansys em componentes reutilizáveis, reduzindo código duplicado e facilitando manutenção.

---

## ✅ Vantagens

### **1. Redução de Código**
- **Antes:** 40-60 linhas de SVG inline em cada página
- **Depois:** 1 linha de import + 5 linhas de uso
- **Economia:** ~90% menos código nas páginas

### **2. Manutenção Centralizada**
- Editar logo em **1 único arquivo**
- Alterações refletem automaticamente em todas as páginas

### **3. Variação de Cor Sem Duplicação**
- **Antes:** Precisaria criar arquivo separado para cada cor
- **Depois:** Props `color`, `secondaryColor`, etc.
- **1 componente = infinitas variações**

### **4. Type Safety**
- TypeScript garante props corretas
- Autocomplete no editor
- Menos erros em runtime

---

## 📖 Como Usar

### **Importar**

```tsx
import { SansysWaterLogo, SansysPayLogo } from './components/logos';
```

### **Uso Básico**

```tsx
<SansysWaterLogo className="h-12" />
```

### **Com Variação de Cor**

```tsx
// Cor única
<SansysWaterLogo 
  className="h-12 opacity-100" 
  color="#E30613" 
/>

// Com cor secundária diferente
<SansysWaterLogo 
  className="h-12 opacity-100" 
  color="#a4a6a5"
  secondaryColor="#9CA3AF"
/>
```

### **Com Transitions/Estados**

```tsx
// Logo que muda de cor no hover (via grupo pai)
<div className="group">
  <SansysWaterLogo 
    className="h-12 opacity-40 group-hover:opacity-100 transition-all" 
    color="#9CA3AF"
  />
</div>

// Logo central vs não central
<SansysWaterLogo 
  className={isCentral ? "h-12 opacity-100" : "h-10 opacity-40"}
  color={isCentral ? "#a4a6a5" : "#9CA3AF"}
/>
```

---

## 🏗️ Estrutura de Props

### **Props Comuns a Todos os Logos**

```typescript
interface LogoProps {
  className?: string;      // Classes Tailwind (altura, opacity, transitions)
  color?: string;          // Cor principal (hex, rgb, etc.)
  secondaryColor?: string; // Cor secundária (opcional, herda da principal)
}
```

### **Props Especiais (para logos com mais cores)**

```typescript
// Exemplo: SansysPayLogo
interface SansysPayLogoProps {
  className?: string;
  color?: string;
  accentColor1?: string; // Primeira cor de acento
  accentColor2?: string; // Segunda cor de acento
}
```

---

## 🎨 Cores Padrão do Sistema

```typescript
// Cores principais Jtech
const COLORS = {
  primary: "#E30613",      // Vermelho Jtech
  dark: "#0B0B0B",        // Preto Jtech
  light: "#FFFFFF",       // Branco
  gray: "#a4a6a5",        // Cinza logos (ativo)
  grayInactive: "#9CA3AF" // Cinza logos (inativo)
};
```

---

## 📋 Status de Implementação

### **✅ Concluídos**
- [x] SansysWaterLogo
- [x] SansysPayLogo

### **⏳ Pendentes (TODO)**

- [ ] SansysWasteLogo
- [ ] SansysAgencyLogo
- [ ] SansysReaderLogo
- [ ] SansysHubLogo
- [ ] SansysFlowLogo
- [ ] SansysGISLogo
- [ ] SansysSmartMeterLogo
- [ ] SansysOmnichannelLogo
- [ ] SansysBILogo
- [ ] SansysAntifraudeLogo
- [ ] SansysCriticaLeituraLogo
- [ ] JtechLogo (logo padrão)

---

## 🔄 Migração das Páginas

### **Páginas que precisam ser atualizadas:**

1. **HomePage.tsx** (~800 linhas de SVG inline)
2. **SolutionsPage.tsx** (~600 linhas de SVG inline)
3. **AboutPage.tsx** (~400 linhas de SVG inline)

### **Exemplo de Migração**

#### **ANTES (HomePage.tsx):**
```tsx
{produto.slug === "sansys-water" ? (
  <svg 
    className={`w-auto transition-all ${
      isCentral ? "h-12 opacity-100" : "h-10 opacity-40 group-hover:opacity-100"
    }`}
    viewBox="0 0 154 42"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .st0-water { fill: ${isCentral ? "#a4a6a5" : "#9CA3AF"}; }
      .st1-water { fill: ${isCentral ? "#a4a6a5" : "#9CA3AF"}; opacity: 0.6; }
      ${!isCentral ? `.group:hover .st0-water, .group:hover .st1-water { fill: #a4a6a5; }` : ''}
    `}</style>
    <g>
      <path className="st0-water" d="M83.1,22.5l-3.4,7.7c-.2.4-.4,1-.6,1.5..." />
      {/* ... 40+ linhas mais ... */}
    </g>
  </svg>
) : produto.slug === "sansys-pay" ? (
  {/* ... mais 50 linhas ... */}
) : ...}
```

#### **DEPOIS (HomePage.tsx):**
```tsx
// No topo do arquivo
import { 
  SansysWaterLogo, 
  SansysPayLogo,
  SansysWasteLogo,
  // ... outros logos
} from '../components/logos';

// No render
{produto.slug === "sansys-water" && (
  <SansysWaterLogo 
    className={`transition-all ${
      isCentral ? "h-12 opacity-100" : "h-10 opacity-40 group-hover:opacity-100"
    }`}
    color={isCentral ? "#a4a6a5" : "#9CA3AF"}
  />
)}
{produto.slug === "sansys-pay" && (
  <SansysPayLogo 
    className={`transition-all ${
      isCentral ? "h-12 opacity-100" : "h-10 opacity-40 group-hover:opacity-100"
    }`}
    color={isCentral ? "#a4a6a5" : "#9CA3AF"}
  />
)}
```

**Redução:** De ~100 linhas para ~15 linhas! 🎉

---

## 🚀 Próximos Passos

### **Fase 1: Completar Repositório de Logos**
1. Extrair todos os SVGs restantes de HomePage.tsx
2. Criar componente para cada logo
3. Exportar todos via index.tsx
4. Testar localmente cada componente

### **Fase 2: Migrar HomePage.tsx**
1. Importar componentes de logos
2. Substituir SVG inline por componentes
3. Verificar que tudo funciona (cores, transitions)
4. Commit isolado

### **Fase 3: Migrar SolutionsPage.tsx**
1. Mesma estratégia da HomePage
2. Testar carrosséis de produtos e módulos
3. Commit isolado

### **Fase 4: Migrar AboutPage.tsx**
1. Atualizar carrossel de produtos
2. Testar e commit

### **Fase 5: Limpeza e Otimização**
1. Remover SVGs inline antigos
2. Documentar alterações no CHANGELOG
3. Adicionar testes visuais (opcional)

---

## 📊 Impacto Esperado

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Linhas HomePage.tsx | ~1500 | ~700 | -53% |
| Linhas SolutionsPage.tsx | ~900 | ~400 | -56% |
| Linhas AboutPage.tsx | ~700 | ~400 | -43% |
| **Total** | **~3100** | **~1500** | **-52%** |
| Arquivos de logos | 0 | 13 | +13 |
| **Total do projeto** | **~3100** | **~1800** | **-42%** |

**Benefício líquido:** ~1300 linhas de código removidas! 🚀

---

## ❓ FAQ

### **P: Preciso criar arquivo separado para cada cor de logo?**
**R:** Não! Use props `color`, `secondaryColor`, etc. 1 componente serve para todas as variações.

### **P: E se eu quiser usar currentColor do CSS?**
**R:** Você pode! Basta passar `color="currentColor"` nas props.

### **P: Os logos antigos vão parar de funcionar?**
**R:** Não durante a migração. Só removemos o código inline depois de confirmar que o novo funciona.

### **P: Posso adicionar animações aos logos?**
**R:** Sim! Use `className` com classes do Motion/Tailwind ou adicione props customizadas.

---

## 📝 Exemplo Completo

```tsx
import { useState } from 'react';
import { SansysWaterLogo } from './components/logos';

function ProductCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SansysWaterLogo 
        className="h-12 opacity-40 group-hover:opacity-100 transition-all duration-300"
        color={isHovered ? "#E30613" : "#9CA3AF"}
        secondaryColor="#a4a6a5"
      />
      <p>Sansys Water</p>
    </div>
  );
}
```

---

## 🔗 Referências

- [Código original HomePage.tsx](/pages/HomePage.tsx) - Linhas 438-780
- [Código original SolutionsPage.tsx](/pages/SolutionsPage.tsx) - Linhas 64-220
- [Código original AboutPage.tsx](/pages/AboutPage.tsx) - Linhas 379-650
