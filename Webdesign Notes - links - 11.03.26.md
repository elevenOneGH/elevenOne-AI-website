Webdesign Notes - links - 11.03.26



Webdesign

https://skills.sh/

https://21st.dev/home



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Prompt Entwurf für die Webapp einer AI as a Service Agentur:**



Baue eine professionelle Webseite für eine AI-Automation-Agentur namens ´elevenOne AI Services´. 

elevenOne AI Services stellt eine AI Automatisierungen für Business Kunden zur Verfügung in denen standardisierte, aber fürs Unternehmen leicht anpassende Use Cases (UC) abgebildet werden. 

Kunden können auf einer Demo Seite die Demo Use Cases (UC) ansehen. (Demo UC)

Ein solches Demobeispiel oder auch Use Case (UC) genannt, kann dann vom Kunden, nach Registrierung und Bekanntgabe der Rechnungsadresse über sein login und Passwort, gekauft werden. Ein solcher Kauf stellt eine Miete dar. Eine Benutzung auf Zeit, vergleichbar mit ´Rent a Car´ aber eben ´Rent a AI Service´ oder auch genannt AI as a Service (AIaaS).

Der Demoprozess wird dann über kundenspezifische Parameter detailliert eingestellt.

Der Demoprozess wird mit dem kundenspezifischen Detailparametern virtuell getestet. (UC in Testphase)

Wenn die Tests erfolgreich sind, wird er Demoprozess (dieser angepasste Use Case) mit dem kundenspezifischen Detailparametern produktiv gesetzt. (UC in Produktion).

Nutze den frontend-design und ui-ux-skoll



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Mit Code Generator von Claude Code umgearbeitet**



**Englisch:**

You will be creating a professional website for an AI automation agency. The website needs to showcase AI-as-a-Service (AIaaS) offerings where customers can view demo use cases, register, purchase/rent AI services, and manage their customized implementations.



Here is the company name:

<company\_name>

{{COMPANY\_NAME}}

</company\_name>



Here is a description of the services offered:

<services\_description>

{{SERVICES\_DESCRIPTION}}

</services\_description>



Here are any special requirements or additional details:

<special\_requirements>

{{SPECIAL\_REQUIREMENTS}}

</special\_requirements>



Your task is to create a complete, professional website structure with HTML and CSS code that includes the following key sections and functionality:



\*\*Required Website Sections:\*\*



1\. \*\*Homepage/Landing Page\*\* - Professional introduction to the company with clear value proposition for business customers

2\. \*\*Services Overview\*\* - Explanation of the AIaaS (AI as a Service) business model and how it works

3\. \*\*Demo Use Cases Page\*\* - Public-facing page where visitors can view available demo use cases without login

4\. \*\*User Registration/Login\*\* - Secure registration system requiring billing address information

5\. \*\*Customer Dashboard\*\* (login required) - Where customers can:

&nbsp;  - Browse and purchase/rent use cases

&nbsp;  - Configure use cases with customer-specific parameters

&nbsp;  - Test configured use cases virtually (Test Phase)

&nbsp;  - Deploy use cases to production (Production Phase)

&nbsp;  - Manage active rentals/subscriptions

6\. \*\*Use Case Status Tracking\*\* - Visual indicators showing:

&nbsp;  - Demo UC (publicly viewable demos)

&nbsp;  - UC in Test Phase (customer testing)

&nbsp;  - UC in Production (actively deployed)



\*\*Design Requirements:\*\*

\- Apply professional frontend design principles with strong UI/UX skills

\- Modern, clean, business-oriented aesthetic

\- Responsive design for desktop and mobile

\- Clear navigation structure

\- Professional color scheme appropriate for B2B services

\- Intuitive user flow from demo viewing → registration → purchase → configuration → testing → production



\*\*Technical Considerations:\*\*

\- Clear separation between public pages and authenticated user areas

\- Form validation for registration and billing information

\- Visual workflow showing the customer journey: Demo → Purchase → Configuration → Testing → Production

\- Status indicators for different use case phases



Before writing the code, use a scratchpad to plan out:

1\. The overall site structure and navigation

2\. Key pages and their purposes

3\. The user journey flow

4\. Design elements and color scheme



Write your planning inside <scratchpad> tags, then provide the complete website code inside <website\_code> tags. Structure your code with clear comments separating different sections and pages. Include both HTML structure and CSS styling.



If certain functionality requires backend implementation (like actual user authentication or payment processing), note this in comments and provide the frontend interface that would connect to such systems.



Make the website professional, polished, and ready for a B2B AI automation agency targeting business customers.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**In Deutsch:**

Sie werden eine professionelle Webseite für eine AI-Automation-Agentur erstellen. Alle Anweisungen und Ihre gesamte Antwort sollen auf Deutsch verfasst werden.



Hier sind die Unternehmensdetails:

<company\_details>

{{COMPANY\_DETAILS}}

</company\_details>



Hier sind spezielle Anforderungen oder zusätzliche Informationen:

<special\_requirements>

{{SPECIAL\_REQUIREMENTS}}

</special\_requirements>



Ihre Aufgabe ist es, eine vollständige, professionelle Webseite für elevenOne AI Services zu erstellen. Das Unternehmen bietet AI-Automatisierungen als Service (AIaaS - "Rent a AI Service") für Business-Kunden an.



GESCHÄFTSMODELL UND KERNFUNKTIONEN:



Die Webseite muss folgende Geschäftsprozesse abbilden:



1\. \*\*Demo-Bereich\*\*: Besucher können Demo Use Cases (UC) ansehen, ohne sich anzumelden

2\. \*\*Registrierung\*\*: Kunden registrieren sich mit Login-Daten und Rechnungsadresse

3\. \*\*Kauf/Miete\*\*: Nach Login können Kunden Use Cases mieten (zeitbasierte Nutzung, ähnlich wie "Rent a Car")

4\. \*\*Anpassung\*\*: Der Demo-UC wird über kundenspezifische Parameter detailliert eingestellt

5\. \*\*Testphase\*\*: Der angepasste UC wird mit kundenspezifischen Parametern virtuell getestet

6\. \*\*Produktivsetzung\*\*: Nach erfolgreichen Tests wird der UC produktiv gesetzt



WEBSITE-STRUKTUR ANFORDERUNGEN:



Die Webseite soll folgende Hauptbereiche enthalten:



\- \*\*Startseite/Landing Page\*\*: Professionelle Darstellung des Unternehmens und der AIaaS-Dienstleistung

\- \*\*Demo-Bereich\*\*: Übersicht und Präsentation der verfügbaren Demo Use Cases

\- \*\*Über uns\*\*: Informationen über elevenOne AI Services

\- \*\*Preismodell\*\*: Erklärung des Mietmodells (AIaaS)

\- \*\*Registrierung/Login-Bereich\*\*: Formular für Neuregistrierung und Login

\- \*\*Kunden-Dashboard\*\* (nach Login):

&nbsp; - Übersicht gekaufter/gemieteter Use Cases

&nbsp; - Status-Anzeige (Demo, Testphase, Produktion)

&nbsp; - Konfigurationsbereich für Parameter

&nbsp; - Testverwaltung

\- \*\*Kontakt\*\*: Kontaktformular und Unternehmensinformationen



TECHNISCHE ANFORDERUNGEN:



\- Nutzen Sie moderne Frontend-Design-Prinzipien

\- Implementieren Sie professionelle UI/UX-Best-Practices

\- Die Webseite soll responsiv sein (Desktop, Tablet, Mobile)

\- Verwenden Sie ein modernes, professionelles Farbschema passend für eine AI/Tech-Firma

\- Integrieren Sie klare Call-to-Actions (CTAs)

\- Berücksichtigen Sie Benutzerfreundlichkeit und intuitive Navigation



VORGEHENSWEISE:



Bevor Sie mit der Erstellung beginnen, nutzen Sie bitte den <scratchpad> Bereich, um:

1\. Die Struktur der Webseite zu planen

2\. Die wichtigsten Sektionen zu identifizieren

3\. Das Design-Konzept zu skizzieren

4\. Technische Entscheidungen zu dokumentieren (z.B. Framework-Wahl, Struktur)



AUSGABEFORMAT:



Ihre finale Antwort soll in <website> Tags strukturiert sein und folgendes enthalten:



1\. \*\*Konzept-Übersicht\*\*: Kurze Beschreibung Ihres Design- und Strukturkonzepts

2\. \*\*HTML-Code\*\*: Vollständiger, gut strukturierter HTML-Code für die Hauptseiten

3\. \*\*CSS-Code\*\*: Professionelles Styling mit modernem Design

4\. \*\*JavaScript-Code\*\* (falls erforderlich): Für interaktive Elemente, Navigation, Demo-Funktionalität

5\. \*\*Implementierungshinweise\*\*: Erklärungen zu besonderen Features oder wie bestimmte Funktionen umgesetzt wurden

6\. \*\*Nächste Schritte\*\*: Empfehlungen für Backend-Integration, Datenbank-Struktur, oder weitere Entwicklungsschritte



Strukturieren Sie Ihren Code sauber und kommentieren Sie wichtige Abschnitte auf Deutsch. Achten Sie darauf, dass der Code professionell, wartbar und erweiterbar ist.



Beginnen Sie jetzt mit der Planung im Scratchpad-Bereich, bevor Sie die finale Webseite erstellen.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Design Abänderung mit Prompt aus 21st Website aus Hero Action:**

Prompt lautet:

Ich will das Design etwas abändern und die Hero-Section anpassen, so dass sie diesem Design folgt. Passe die Webseite allgemein entsprechend an: You are given a task to integrate an existing React component in the codebase



The codebase should support:

\- shadcn project structure  

\- Tailwind CSS

\- Typescript



If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.



Determine the default path for components and styles. 

If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Copy-paste this component to /components/ui folder:

```tsx

splite.tsx

'use client'



import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))



interface SplineSceneProps {

&nbsp; scene: string

&nbsp; className?: string

}



export function SplineScene({ scene, className }: SplineSceneProps) {

&nbsp; return (

&nbsp;   <Suspense 

&nbsp;     fallback={

&nbsp;       <div className="w-full h-full flex items-center justify-center">

&nbsp;         <span className="loader"></span>

&nbsp;       </div>

&nbsp;     }

&nbsp;   >

&nbsp;     <Spline

&nbsp;       scene={scene}

&nbsp;       className={className}

&nbsp;     />

&nbsp;   </Suspense>

&nbsp; )

}



demo.tsx

'use client'



import { SplineScene } from "@/components/ui/splite";

import { Card } from "@/components/ui/card"

import { Spotlight } from "@/components/ui/spotlight"

&nbsp;

export function SplineSceneBasic() {

&nbsp; return (

&nbsp;   <Card className="w-full h-\[500px] bg-black/\[0.96] relative overflow-hidden">

&nbsp;     <Spotlight

&nbsp;       className="-top-40 left-0 md:left-60 md:-top-20"

&nbsp;       fill="white"

&nbsp;     />

&nbsp;     

&nbsp;     <div className="flex h-full">

&nbsp;       {/\* Left content \*/}

&nbsp;       <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">

&nbsp;         <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">

&nbsp;           Interactive 3D

&nbsp;         </h1>

&nbsp;         <p className="mt-4 text-neutral-300 max-w-lg">

&nbsp;           Bring your UI to life with beautiful 3D scenes. Create immersive experiences 

&nbsp;           that capture attention and enhance your design.

&nbsp;         </p>

&nbsp;       </div>



&nbsp;       {/\* Right content \*/}

&nbsp;       <div className="flex-1 relative">

&nbsp;         <SplineScene 

&nbsp;           scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

&nbsp;           className="w-full h-full"

&nbsp;         />

&nbsp;       </div>

&nbsp;     </div>

&nbsp;   </Card>

&nbsp; )

}

```



Copy-paste these files for dependencies:

```tsx

aceternity/spotlight

import React from "react";

import { cn } from "@/lib/utils";



type SpotlightProps = {

&nbsp; className?: string;

&nbsp; fill?: string;

};



export const Spotlight = ({ className, fill }: SpotlightProps) => {

&nbsp; return (

&nbsp;   <svg

&nbsp;     className={cn(

&nbsp;       "animate-spotlight pointer-events-none absolute z-\[1]  h-\[169%] w-\[138%] lg:w-\[84%] opacity-0",

&nbsp;       className

&nbsp;     )}

&nbsp;     xmlns="http://www.w3.org/2000/svg"

&nbsp;     viewBox="0 0 3787 2842"

&nbsp;     fill="none"

&nbsp;   >

&nbsp;     <g filter="url(#filter)">

&nbsp;       <ellipse

&nbsp;         cx="1924.71"

&nbsp;         cy="273.501"

&nbsp;         rx="1924.71"

&nbsp;         ry="273.501"

&nbsp;         transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"

&nbsp;         fill={fill || "white"}

&nbsp;         fillOpacity="0.21"

&nbsp;       ></ellipse>

&nbsp;     </g>

&nbsp;     <defs>

&nbsp;       <filter

&nbsp;         id="filter"

&nbsp;         x="0.860352"

&nbsp;         y="0.838989"

&nbsp;         width="3785.16"

&nbsp;         height="2840.26"

&nbsp;         filterUnits="userSpaceOnUse"

&nbsp;         colorInterpolationFilters="sRGB"

&nbsp;       >

&nbsp;         <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>

&nbsp;         <feBlend

&nbsp;           mode="normal"

&nbsp;           in="SourceGraphic"

&nbsp;           in2="BackgroundImageFix"

&nbsp;           result="shape"

&nbsp;         ></feBlend>

&nbsp;         <feGaussianBlur

&nbsp;           stdDeviation="151"

&nbsp;           result="effect1\_foregroundBlur\_1065\_8"

&nbsp;         ></feGaussianBlur>

&nbsp;       </filter>

&nbsp;     </defs>

&nbsp;   </svg>

&nbsp; );

};



```

```tsx

ibelick/spotlight

'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';

import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';

import { cn } from '@/lib/utils';



type SpotlightProps = {

&nbsp; className?: string;

&nbsp; size?: number;

&nbsp; springOptions?: SpringOptions;

};



export function Spotlight({

&nbsp; className,

&nbsp; size = 200,

&nbsp; springOptions = { bounce: 0 },

}: SpotlightProps) {

&nbsp; const containerRef = useRef<HTMLDivElement>(null);

&nbsp; const \[isHovered, setIsHovered] = useState(false);

&nbsp; const \[parentElement, setParentElement] = useState<HTMLElement | null>(null);



&nbsp; const mouseX = useSpring(0, springOptions);

&nbsp; const mouseY = useSpring(0, springOptions);



&nbsp; const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);

&nbsp; const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);



&nbsp; useEffect(() => {

&nbsp;   if (containerRef.current) {

&nbsp;     const parent = containerRef.current.parentElement;

&nbsp;     if (parent) {

&nbsp;       parent.style.position = 'relative';

&nbsp;       parent.style.overflow = 'hidden';

&nbsp;       setParentElement(parent);

&nbsp;     }

&nbsp;   }

&nbsp; }, \[]);



&nbsp; const handleMouseMove = useCallback(

&nbsp;   (event: MouseEvent) => {

&nbsp;     if (!parentElement) return;

&nbsp;     const { left, top } = parentElement.getBoundingClientRect();

&nbsp;     mouseX.set(event.clientX - left);

&nbsp;     mouseY.set(event.clientY - top);

&nbsp;   },

&nbsp;   \[mouseX, mouseY, parentElement]

&nbsp; );



&nbsp; useEffect(() => {

&nbsp;   if (!parentElement) return;



&nbsp;   parentElement.addEventListener('mousemove', handleMouseMove);

&nbsp;   parentElement.addEventListener('mouseenter', () => setIsHovered(true));

&nbsp;   parentElement.addEventListener('mouseleave', () => setIsHovered(false));



&nbsp;   return () => {

&nbsp;     parentElement.removeEventListener('mousemove', handleMouseMove);

&nbsp;     parentElement.removeEventListener('mouseenter', () => setIsHovered(true));

&nbsp;     parentElement.removeEventListener('mouseleave', () =>

&nbsp;       setIsHovered(false)

&nbsp;     );

&nbsp;   };

&nbsp; }, \[parentElement, handleMouseMove]);



&nbsp; return (

&nbsp;   <motion.div

&nbsp;     ref={containerRef}

&nbsp;     className={cn(

&nbsp;       'pointer-events-none absolute rounded-full bg-\[radial-gradient(circle\_at\_center,var(--tw-gradient-stops),transparent\_80%)] blur-xl transition-opacity duration-200',

&nbsp;       'from-zinc-50 via-zinc-100 to-zinc-200',

&nbsp;       isHovered ? 'opacity-100' : 'opacity-0',

&nbsp;       className

&nbsp;     )}

&nbsp;     style={{

&nbsp;       width: size,

&nbsp;       height: size,

&nbsp;       left: spotlightLeft,

&nbsp;       top: spotlightTop,

&nbsp;     }}

&nbsp;   />

&nbsp; );

}



```

```tsx

shadcn/card

import \* as React from "react"



import { cn } from "@/lib/utils"



const Card = React.forwardRef<

&nbsp; HTMLDivElement,

&nbsp; React.HTMLAttributes<HTMLDivElement>

>(({ className, ...props }, ref) => (

&nbsp; <div

&nbsp;   ref={ref}

&nbsp;   className={cn(

&nbsp;     "rounded-lg border bg-card text-card-foreground shadow-sm",

&nbsp;     className,

&nbsp;   )}

&nbsp;   {...props}

&nbsp; />

))

Card.displayName = "Card"



const CardHeader = React.forwardRef<

&nbsp; HTMLDivElement,

&nbsp; React.HTMLAttributes<HTMLDivElement>

>(({ className, ...props }, ref) => (

&nbsp; <div

&nbsp;   ref={ref}

&nbsp;   className={cn("flex flex-col space-y-1.5 p-6", className)}

&nbsp;   {...props}

&nbsp; />

))

CardHeader.displayName = "CardHeader"



const CardTitle = React.forwardRef<

&nbsp; HTMLParagraphElement,

&nbsp; React.HTMLAttributes<HTMLHeadingElement>

>(({ className, ...props }, ref) => (

&nbsp; <h3

&nbsp;   ref={ref}

&nbsp;   className={cn(

&nbsp;     "text-2xl font-semibold leading-none tracking-tight",

&nbsp;     className,

&nbsp;   )}

&nbsp;   {...props}

&nbsp; />

))

CardTitle.displayName = "CardTitle"



const CardDescription = React.forwardRef<

&nbsp; HTMLParagraphElement,

&nbsp; React.HTMLAttributes<HTMLParagraphElement>

>(({ className, ...props }, ref) => (

&nbsp; <p

&nbsp;   ref={ref}

&nbsp;   className={cn("text-sm text-muted-foreground", className)}

&nbsp;   {...props}

&nbsp; />

))

CardDescription.displayName = "CardDescription"



const CardContent = React.forwardRef<

&nbsp; HTMLDivElement,

&nbsp; React.HTMLAttributes<HTMLDivElement>

>(({ className, ...props }, ref) => (

&nbsp; <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />

))

CardContent.displayName = "CardContent"



const CardFooter = React.forwardRef<

&nbsp; HTMLDivElement,

&nbsp; React.HTMLAttributes<HTMLDivElement>

>(({ className, ...props }, ref) => (

&nbsp; <div

&nbsp;   ref={ref}

&nbsp;   className={cn("flex items-center p-6 pt-0", className)}

&nbsp;   {...props}

&nbsp; />

))

CardFooter.displayName = "CardFooter"



export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



```



Install NPM dependencies:

```bash

@splinetool/runtime, @splinetool/react-spline, framer-motion

```



Implementation Guidelines

&nbsp;1. Analyze the component structure and identify all required dependencies

&nbsp;2. Review the component's argumens and state

&nbsp;3. Identify any required context providers or hooks and install them

&nbsp;4. Questions to Ask

&nbsp;- What data/props will be passed to this component?

&nbsp;- Are there any specific state management requirements?

&nbsp;- Are there any required assets (images, icons, etc.)?

&nbsp;- What is the expected responsive behavior?

&nbsp;- What is the best place to use this component in the app?



Steps to integrate

&nbsp;0. Copy paste all the code above in the correct directories

&nbsp;1. Install external dependencies

&nbsp;2. Fill image assets with Unsplash stock images you know exist

&nbsp;3. Use lucide-react icons for svgs or logos if component requires them



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Änderung von 21st.dev wieder rückgängig gemacht fürs erste.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

CLAUDE.md Datei



\# Websiteerstellung 



\## Tech Stack

Next.js 15 + TypeScript + Tailwind CSS

Framer Motion für Animationen



\## Design-Regeln

Nutze das AskUserQuestion Tool, um den Nutzer über das Websitedesign zu informieren, damit du die Vorstellung des Nutzers genau abbilden kannst.

Nutze den frontend-design Skill für alle UI-Entscheidungen.

Nutze UI/UX Pro Max für Design-System-Generierung.

Nutze gegebenenfalls 21st.dev für Komponenteninspiration (falls vorgegeben)

Keine generischen AI-Aesthetics.   

Bold, distinctive Design-Choices

Performance-optimiert (Core Web Vitals)



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Alles fertig. Hier die Zusammenfassung:**



Was wurde umgesetzt

Testdaten (Seed v2)

5 Testkunden + 1 Admin werden automatisch beim ersten Seitenaufruf angelegt:



Kunde	E-Mail	Passwort	Use Cases

TransLogix GmbH (Wien)	demo.logistik@translogix.at	Demo2025!	Lieferkette LIVE, Rechnungen LIVE, Forecast TEST

QM Consult GmbH (Graz)	demo.qm@qmconsult.at	Demo2025!	Compliance LIVE, Berichte LIVE, Meeting TEST

SV-Büro Huber (Innsbruck)	demo.sv@svbuero-huber.at	Demo2025!	Berichte LIVE, Vertragsanalyse TEST

Elektro Haas e.U. (Linz)	demo.handwerk@elektro-haas.at	Demo2025!	E-Mail-Klassifizierung LIVE, FAQ-Bot TEST

Kanzlei Dr. Berger (Salzburg)	demo.anwalt@kanzlei-berger.at	Demo2025!	Vertragsanalyse LIVE, Meeting-Protokoll LIVE, Compliance TEST

Admin-Zugang

E-Mail: admin@elevenone.at / Passwort: Admin2025!

Nach Login erscheint ein ⊕ Admin-Badge in der Navigation aller Seiten

Zugang zu admin.html

Admin Panel (admin.html)

Stats-Zeile: Kundenzahl, Live-UCs, Test-UCs, geschätzter Monatsumsatz

Benutzertabelle mit Suche (Firma, E-Mail, Stadt)

Slide-in Edit-Panel pro Benutzer:

Stammdaten bearbeiten (Name, Firma, E-Mail)

Rechnungsadresse bearbeiten (Straße, PLZ, Stadt, Land, USt-IdNr.)

UC-Zuweisungen verwalten: Status ändern (Demo/Test/Live), UC entfernen, UC hinzufügen

Benutzer endgültig löschen

Zum Reset der Seed-Daten: localStorage.clear() in der Browser-Konsole.





