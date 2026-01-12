import { usePromajData } from "@/hooks/usePromajData";
import { KPICard } from "@/components/KPICard";
import { SexDistributionChart } from "@/components/SexDistributionChart";
import { AgeDistributionChart } from "@/components/AgeDistributionChart";
import { ScholarshipChart } from "@/components/ScholarshipChart";
import { CRASDistributionChart } from "@/components/CRASDistributionChart";
import { AllocationChart } from "@/components/AllocationChart";
import { SexAllocationChart } from "@/components/SexAllocationChart";
import { Users, Briefcase, BookOpen, MapPin, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import { CursoChart } from "@/components/CursoChart";

export default function Dashboard() {
  const { data, loading, error } = usePromajData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Carregando dados dos estagiários...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive font-semibold">
            Erro ao carregar dados
          </p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fixed bg-[url(/images/background.png)] bg-cover bg-no-repeat **bg-top** bg-black">
      {/* <div className="fixed bg-black opacity-10"></div> */}
      {/* Header */}
      <header className="h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100 shadow-xl">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground text-white">
              Perfil dos Estagiários (2025)
            </h1>
          </div>
          <p className="text-muted-foreground text-sm text-white">
            Perfil dos Estagiários da Prefeitura Municipal de Teresópolis
          </p>
          <br />
          <a
            className="font-bold text-foreground mb-4 text-white"
            href="https://dados.teresopolis.rj.gov.br/dataset/estagiarios/resource/712619ad-ddce-40f0-8661-f4b92adcd06b"
          >
            Dados Abertos Compilados - Clique Aqui 🗎
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* KPI Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Indicadores Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <KPICard
              title="Total de Estagiários"
              value={data.total_participantes}
              icon={Users}
              description=""
            />
            <KPICard
              title="Idade Média"
              value={`${data.idade_media} anos`}
              icon={TrendingUp}
              description={`Entre ${data.idade_minima} e ${data.idade_maxima} anos`}
            />
            <KPICard
              title="Público Masculino"
              value={data.distribuicao_sexo.Masculino}
              icon={Users}
              description={`${((data.distribuicao_sexo.Masculino / data.total_participantes) * 100).toFixed(1)}% do total`}
            />
            <KPICard
              title="Público Feminino"
              value={data.distribuicao_sexo.Feminino}
              icon={Users}
              description={`${((data.distribuicao_sexo.Feminino / data.total_participantes) * 100).toFixed(1)}% do total`}
            />
            <KPICard
              title="Áreas de Atuação"
              value={Object.keys(data.distribuicao_lotacao_agrupada).length}
              icon={Briefcase}
              description="Estruturas"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Análise Demográfica
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SexDistributionChart data={data.distribuicao_sexo} />
            <AgeDistributionChart data={data.sexo_por_idade} />
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Perfil Educacional
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScholarshipChart data={data.distribuicao_instituicao} />
            <CursoChart data={data.distribuicao_curso} />
          </div>
        </section>

        {/* Allocation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Alocação Profissional
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AllocationChart data={data.distribuicao_lotacao_agrupada} />
            <SexAllocationChart data={data.sexo_por_categoria_lotacao} />
          </div>
        </section>

        {/* Summary Section */}
        <section className="mb-12 p-6 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
          <h2 className="text-xl font-bold text-foreground mb-4 text-white text-center">
            Resumo Executivo
          </h2>
          <div className="grid grid-cols-1  gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Perfil Etário
              </p>
              <p className="text-white">
                O perfil etário dos estagiários revela uma população
                predominantemente jovem, com a idade média de 23.6 anos. A faixa
                etária mais representativa é a de 19 a 21 anos, com 19
                estagiários, seguida de perto pela faixa de 22 a 25 anos, com 16
                estagiários. Isso indica que a maioria dos participantes está
                nas fases iniciais ou intermediárias de sua formação
                universitária. Há também uma presença de estagiários mais
                jovens, com 2 indivíduos até 18 anos, e uma parcela menor de
                estagiários mais experientes, com 6 na faixa de 26 a 30 anos e 4
                acima de 30 anos, sendo a idade máxima de 43 anos. Essa
                diversidade etária, embora concentrada nos mais jovens,
                demonstra que o programa de estágio acolhe tanto estudantes em
                início de carreira quanto aqueles que buscam uma transição ou
                aprimoramento profissional em fases mais avançadas da vida
                acadêmica.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Distribuição de Gênero
              </p>
              <p className="text-white">
                A distribuição de gênero entre os estagiários é notavelmente
                equilibrada, com uma leve predominância masculina. Dos 47
                estagiários, 24 são do sexo Masculino e 23 são do sexo Feminino.
                Essa paridade sugere um ambiente inclusivo e oportunidades
                equitativas para ambos os gêneros no programa de estágio. Ao
                analisar a distribuição por lotação, observa-se que, embora a
                Procuradoria Geral tenha mais estagiários masculinos (10) do que
                femininos (5), a Secretaria de Urbanismo apresenta uma inversão,
                com mais estagiárias femininas (9) do que masculinos (5),
                indicando que a paridade geral é resultado de diferentes
                composições de gênero em cada departamento.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Alocação Profissional
              </p>
              <p className="text-white">
                A maioria dos estagiários estão alocados em Escolas e Centros A
                Procuradoria Geral se destaca como a lotação com o maior número
                de estagiários, totalizando 15 indivíduos. Em seguida, a
                Secretaria de Urbanismo emprega 14 estagiários, indicando uma
                forte demanda por suporte nessas áreas. Outras secretarias como
                Finanças e Orçamento (7 estagiários), Administração (6
                estagiários), Meio Ambiente (3 estagiários) e Educação (2
                estagiários) também contribuem para o programa, embora em menor
                escala. Essa distribuição sugere que as áreas jurídicas e de
                planejamento urbano são as que mais absorvem a força de trabalho
                estagiária, refletindo possivelmente a complexidade e o volume
                de trabalho desses departamentos.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Cursos Mais Frequentados
              </p>
              <p className="text-white">
                No que tange à formação acadêmica, o curso de Direito é, de
                longe, o mais prevalente entre os estagiários, com 19
                representantes. Este dado está em consonância com a alta demanda
                observada na Procuradoria Geral. Em segundo lugar, Arquitetura e
                Urbanismo conta com 12 estagiários, o que se alinha com a
                significativa presença na Secretaria de Urbanismo. Ciências
                Contábeis aparece como o terceiro curso mais comum, com 9
                estagiários, provavelmente suprindo necessidades na Secretaria
                de Finanças e Orçamento. Outros cursos como Engenharia Civil
                (3), Administração (2), Ciência da Computação (1) e Nutrição (1)
                também estão representados, demonstrando uma diversidade, ainda
                que menor, nas áreas de conhecimento dos estagiários.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Dashboard Estagiários © 2025 - Prefeitura Municipal de Teresópolis
          </p>
          <p className="text-xs mt-2">
            Dados mantidos e atualizados pela Secretaria Municipal de Ciência e
            Tecnologia - Departamento de Governança de Dados
          </p>
        </div>
      </footer>
    </div>
  );
}
