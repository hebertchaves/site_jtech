import { Lang, t } from "../lib/i18n"
import { Container } from "../components/layout/Container"
import { ScrollToTop } from "../components/ScrollToTop"

interface TermsPageProps {
  lang: Lang
}

export function TermsPage({ lang }: TermsPageProps) {
  return (
    <>
      {/* ====================================
          TERMS OF SERVICE SECTION
          Termos de Uso do site
          ==================================== */}
      <div className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl mb-8">{t(lang, "footer.terms")}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última atualização: 19 de fevereiro de 2026
              </p>

              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar este site, você aceita e concorda em ficar vinculado aos
                termos e condições deste acordo. Se você não concorda com qualquer parte
                destes termos, não deve usar nosso site.
              </p>

              <h2>2. Uso do Site</h2>
              <p>Você concorda em usar este site apenas para fins legítimos e de maneira que não:</p>
              <ul>
                <li>Viole qualquer lei ou regulamento aplicável</li>
                <li>Infrinja os direitos de terceiros</li>
                <li>Seja prejudicial, ameaçador, difamatório ou obsceno</li>
                <li>Interfira ou interrompa o site ou servidores</li>
              </ul>

              <h2>3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo deste site, incluindo mas não limitado a textos, gráficos,
                logos, imagens e software, é propriedade da Jtech ou de seus fornecedores
                de conteúdo e está protegido por leis de direitos autorais.
              </p>

              <h2>4. Informações do Produto</h2>
              <p>
                Fazemos todos os esforços para exibir informações precisas sobre nossos
                produtos e serviços. No entanto, não garantimos que as descrições ou outros
                conteúdos sejam precisos, completos ou livres de erros.
              </p>

              <h2>5. Links para Sites de Terceiros</h2>
              <p>
                Este site pode conter links para sites de terceiros. Esses links são fornecidos
                apenas para sua conveniência. Não temos controle sobre o conteúdo desses sites
                e não assumimos responsabilidade por eles.
              </p>

              <h2>6. Limitação de Responsabilidade</h2>
              <p>
                Em nenhuma circunstância a Jtech será responsável por quaisquer danos diretos,
                indiretos, incidentais, especiais ou consequenciais resultantes do uso ou
                incapacidade de usar este site.
              </p>

              <h2>7. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As
                alterações entrarão em vigor imediatamente após a publicação no site. Seu
                uso continuado do site após tais alterações constitui sua aceitação dos
                novos termos.
              </p>

              <h2>8. Privacidade</h2>
              <p>
                Seu uso deste site também é regido por nossa Política de Privacidade.
                Por favor, revise nossa Política de Privacidade para entender nossas práticas.
              </p>

              <h2>9. Lei Aplicável</h2>
              <p>
                Estes termos serão regidos e interpretados de acordo com as leis do Brasil.
                Quaisquer disputas relacionadas a estes termos estarão sujeitas à jurisdição
                exclusiva dos tribunais de São Paulo/SP.
              </p>

              <h2>10. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato
                conosco:
              </p>
              <p>
                E-mail: juridico@jtech.com.br<br />
                Telefone: +55 (11) 9999-9999<br />
                Endereço: Av. Paulista, 1000 - São Paulo/SP
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}