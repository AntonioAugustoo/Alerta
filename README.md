# 🏥 ALERTA — Assistência Local de Emergência e Resposta a Tombos Acidentais.

**Monitoramento Inteligente e Prevenção de Quedas em Tempo Real**

---

## 🌟 Visão Geral

O **ALERTA** é um ecossistema de saúde digital (e-Health) projetado para enfrentar um dos maiores desafios da segurança hospitalar: as quedas de pacientes. Unindo hardware vestível (wearable) e uma interface web de alta performance, o sistema oferece monitoramento contínuo e detecção imediata de acidentes.

O projeto foi concebido para o ambiente dinâmico de hospitais e clínicas, onde cada segundo conta para salvar uma vida ou prevenir complicações graves.

---

## 🚀 Como Funciona?

O sistema opera em uma estrutura de três pilares:

### 1. ⌚ O Dispositivo (Hardware)
Um colete ergonômico equipado com um microcontrolador **ESP32** e sensores de movimento (acelerômetro). O algoritmo em **C++** processa os dados localmente para identificar padrões de queda livre e impactos bruscos com alta precisão.

### 2. 🛰️ A Transmissão
Os eventos detectados são enviados via **Wi-Fi** para o servidor através de uma API segura, garantindo que o status do paciente seja atualizado instantaneamente no painel de controle.

### 3. 🖥️ O Dashboard (Software)
Uma interface moderna desenvolvida que permite à equipe de enfermagem visualizar, de forma centralizada, a telemetria e a atividade de todos os pacientes da unidade.

---

## ✨ Funcionalidades Principais

- **🚨 Alerta Crítico de Queda**  
  Notificação visual imediata em caso de acidente, sobrepondo qualquer outra atividade no dashboard.

- **📊 Monitoramento em Tempo Real**  
  Visualização constante do status do paciente: _Em Movimento_, _Parado_ ou _Offline_.

- **🔋 Gestão de Telemetria**  
  Acompanhamento do nível de bateria e qualidade do sinal Wi-Fi de cada dispositivo para garantir a continuidade do serviço.

- **📋 Prontuário Rápido**  
  Acesso imediato a informações críticas como  grau de risco do paciente, remédios usados periodicamente, entre outros 

- **🌙 Modo Noturno**  
  Interface otimizada para reduzir a fadiga ocular durante os plantões noturnos.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| **Hardware** | ESP32, Acelerômetro Triaxial, C++ |
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Gerenciamento** | Zustand, React Hooks |
| **Backend/Banco** | Supabase, API Routes |
| **Design** | Figma (Prototipagem UX/UI) |

---

## 📁 Estrutura do Projeto

```

```

---


## 🚧 Instalação e Execução

Esta seção será atualizada conforme o avanço do desenvolvimento com as instruções de instalação e scripts necessários.

---

## 👥 Equipe e Contato

- **Antonio Augusto** — Software Engineer (INATEL)
- **Fernando Puelba** — Software Engineer (INATEL)

---

## 📄 Licença

Projeto em desenvolvimento. Todos os direitos reservados.
