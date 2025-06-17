// app/terms-and-conditions/page.tsx
import {Separator} from '@/components/ui/separator';
import {ArrowLeft} from 'lucide-react';
import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Better KFC Clone',
  description:
    'Understand the terms and conditions governing your use of the Better KFC Clone website and its services.',
  keywords: [
    'terms and conditions',
    'terms of use',
    'user agreement',
    'KFC clone',
    'Better KFC',
    'website terms',
    'legal'
  ],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app'}],
  openGraph: {
    title: 'Terms and Conditions | Better KFC Clone',
    description:
      'Read the detailed terms and conditions for using the Better KFC Clone platform. Your agreement is implied by use.',
    type: 'article',
    locale: 'en_US',
    url: 'https://betterkfc.vercel.app/terms-and-conditions',
    siteName: 'Better KFC Clone'
  },
  twitter: {
    card: 'summary',
    title: 'Terms and Conditions | Better KFC Clone',
    description:
      'Your agreement to our terms. Learn about the rules for using Better KFC Clone.',
    images: ['https://betterkfc.vercel.app/og-terms.png'], // Placeholder, replace with an actual image if you create one
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app')
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="sticky top-14 z-20 bg-background mb-2">
        <div className="py-4 px-4 sm:px-6 md:py-6 flex items-center justify-center">
          <Link
            href="/"
            className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Terms and Conditions
          </h1>
        </div>
        <Separator />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <section className="text-center mb-8">
          <p className="text-muted-foreground text-xs md:text-sm font-semibold">
            KFC TERMS OF USE
          </p>
          <p className="text-muted-foreground text-xs md:text-sm font-semibold mt-1">
            EFFECTIVE DATE: JUNE 16, 2025 {/* Updated to current date */}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            Introduction
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            These Terms of Use ("Terms") govern your use of the KFC Corporation
            ("KFC") Web sites on which they appear, and your use of the features
            therein. KFC may revise the information, services and the resources
            contained in this web site from time to time and we reserve the
            right to make such changes without obligation to notify past,
            current or prospective visitors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            NO WARRANTY/LIMITATION ON LIABILITY
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            KFC strives to ensure that the information contained in this web
            site is accurate and reliable. However, KFC and the World Wide Web
            (or Web Site Host) are not infallible and errors may sometimes
            occur. Therefore, to the fullest extent permissible pursuant to
            applicable law, KFC makes no representations about the reliability
            of the features of this Site, the KFC Content (defined below),
            Submitted Content (defined below), or any other Site feature. You
            acknowledge that any reliance on such material and/or systems will
            be at your own risk. KFC is not responsible for the information,
            data, text or other materials that may appear in Submitted Content
            or may otherwise be submitted by users. Opinions expressed in
            Submitted Content do not necessarily reflect the opinions of KFC,
            and KFC does not endorse and has no control over Submitted Content.
            Submitted Content is not necessarily reviewed by KFC prior to
            posting and KFC makes no warranties, express or implied, as to the
            Submitted Content or to the accuracy and reliability of the
            Submitted Content. KFC makes no representations regarding the amount
            of time that any KFC Content or Submitted Content will be preserved.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            KFC disclaims any warranty of any kind, whether express or implied,
            as to any matter whatsoever relating to this web site, including
            without limitation the merchantability or fitness for any particular
            purpose. KFC is not liable or responsible for any damages or
            injuries caused by use of this web site (such as viruses, omissions
            or misstatements).
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            <span className="font-semibold text-foreground">
              THIS SITE IS PROVIDED ON AN "AS IS, AS AVAILABLE" BASIS. NO
              WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THOSE
              OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, ARE MADE
              WITH RESPECT TO THIS SITE OR ANY INFORMATION OR SOFTWARE THEREIN.
            </span>{' '}
            UNDER NO CIRCUMSTANCES, INCLUDING NEGLIGENCE, SHALL KFC BE LIABLE
            FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR
            CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF OR INABILITY TO
            USE THIS SITE, NOR SHALL KFC BE RESPONSIBLE FOR ANY DAMAGES
            WHATSOEVER THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS,
            DELETION OF FILES, ERRORS, DEFECTS, DELAYS IN OPERATION OR
            TRANSMISSION, OR ANY FAILURE OF PERFORMANCE WHETHER OR NOT CAUSED BY
            EVENTS BEYOND KFC' S REASONABLE CONTROL, INCLUDING BUT NOT LIMITED
            TO ACTS OF GOD, COMMUNICATIONS LINE FAILURE, THEFT, DESTRUCTION, OR
            UNAUTHORIZED ACCESS TO THIS SITE' S RECORDS, PROGRAMS, OR SERVICES.
            In no event shall KFC' s total liability for all damages, losses,
            and causes of action exceed five dollars (US $5.00). Some
            jurisdictions do not allow the limitation or exclusion of liability
            for incidental or consequential damages; as a result, the above
            limitation or exclusion may not apply to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            COMMUNICATING WITH KFC
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            On certain areas of our Site, you may be given the ability to
            contact us by electronic mail, for example, to sign up for services
            such as e-mail notifications and newsletters about our products, to
            register for a particular sweepstakes or contest, or to participate
            in our interactive forums, like chat rooms and message boards. The
            information that you provide to us through this Site is governed by
            our{' '}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            . These areas are designed to give our users the ability to contact
            us with questions or concerns, to engage in dialogue with us and
            other Site users, or to take advantage of other features we may
            provide from time to time. They are not intended for, and should not
            be used to, submit unsolicited ideas. It is company policy not to
            accept such unsolicited ideas, concepts, techniques, procedures,
            methods, systems, designs, plans, charts or similar materials from
            outside parties. By entering the Site you acknowledge and agree that
            any materials, ideas or other communications you transmit to us in
            any manner and for any reason will not be treated as confidential or
            proprietary. It is KFC's policy not to accept, and to return, any
            unsolicited ideas, concepts, techniques, procedures, methods,
            systems, designs, plans, charts or other similar materials.
            Nevertheless, should you submit such materials, you understand that
            you have no ownership rights in any ideas you may submit, and you
            expressly disclaim any rights or causes of action you may have with
            respect to any materials you may submit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            KFC PROPERTY
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            This web site contains many valuable trademarks owned and used by
            KFC Corporation, and its subsidiaries and affiliates throughout the
            world. These trademarks are used to distinguish KFC's quality
            products and services. The text, graphics and html code contained in
            this web site are the exclusive property of KFC Corporation. ("KFC
            Content"). KFC Content is protected from reproduction and simulation
            under national and international laws and except where otherwise
            noted, is not to be copied, distributed, displayed, reproduced or
            transmitted in any form, by any means, without the prior express
            written permission of KFC Corporation. Third party content, such as
            user-posted content, including graphics, video clips, images,
            trademarks, trade names, characters, and trademarks and copyrights
            is the property of the third parties that market or license that
            content, and is used by KFC subject to license, or subject to the
            fair use provisions of U.S. copyright or trademark law or made
            permissible under other applicable law. If you are a trademark or
            copyright owner and you believe that your trademark or copyright
            rights have been violated, please go to our Proprietary Rights
            Complaint Process page and follow the instructions at that area.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            USER-SUBMITTED CONTENT
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            On certain areas of our Site you may be able to submit text, files,
            images, photos, videos, sounds, musical works, works of authorship,
            and other materials and content ("Submitted Content"). You have no
            ownership rights in your account or other access to the Site or
            features therein, and KFC may delete all Submitted Content at any
            time, with or without notice, if KFC deems that you have violated
            these Terms, the law, or for any other reason. KFC assumes no
            liability for any information removed from our Site, and reserves
            the right to permanently restrict access to the Site or for features
            therein.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            By posting, displaying, publishing or otherwise submitting Submitted
            Content on or through this Site, you understand and acknowledge that
            any materials, ideas or other communications you transmit in any
            manner and for any reason will not be treated as confidential or
            proprietary. Furthermore, you acknowledge and agree that any ideas,
            concepts, techniques, procedures, methods, systems, video, scripts,
            music, photographs, designs, plans, charts, or other materials you
            transmit to KFC may be used by KFC anywhere, anytime, and for any
            reason whatsoever subject to following terms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed pl-4 mt-4">
            <li>
              You hereby grant to KFC a limited, non-exclusive, sub-licensable,
              worldwide, fully-paid, royalty free license to use, modify,
              publicly perform, publicly display, reproduce, and distribute
              Submitted Content. This license includes the right to host, index,
              cache, distribute, and tag any Submitted Content, as well as the
              right to sublicense Submitted Content to third parties, including
              other users, for use on other platforms, such as for use on mobile
              phones, in video or music software computer programs.
            </li>
            <li>
              You represent and warrant that you own the Submitted Content
              displayed, published or posted by you on the Site and otherwise
              have the right to grant the license set forth herein, and the
              displaying, publishing or posting of your Submitted Content, and
              our use thereof, does not and will not violate the privacy rights,
              publicity rights, copyrights, trademark rights, contract rights or
              any other intellectual property rights or other rights of any
              person or entity. You agree to pay for all royalties, fees, and
              any other monies owing any person by reason of any Submitted
              Content displayed, published or posted by you to the Site.
            </li>
            <li>
              You agree that your Submitted Content is gratuitous and made
              without restriction, and will not place KFC under any obligation.
              You agree that KFC is free to disclose the ideas contained in the
              Submission, including, for example, ingredient or menu item
              suggestions, on a non-confidential basis to anyone or otherwise
              use the ideas without any additional compensation to you. You
              acknowledge that, by acceptance of your Submission, KFC does not
              waive any rights to use similar or related ideas previously known
              to KFC, or developed by its employees, or obtained from sources
              other than you.
            </li>
          </ul>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            Your posting of Submitted Content is further subject to the
            following posting rules:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed pl-4 mt-4">
            <li>
              You may not post any content that, as determined in KFC's sole
              discretion, is unlawful, harmful, tortious, defamatory, libelous,
              obscene, invasive of the privacy of another person, threatening,
              harassing, abusive, hateful, racist, infringing, pornographic,
              violent or otherwise objectionable or inappropriate.
            </li>
            <li>
              You may not post any content that contains personal information
              about any individual, violates the privacy of any other individual
              or entity, or anything that you are under a contractual obligation
              to keep private or confidential. You agree that you will not
              impersonate any person or organization, including without
              limitation, the personnel of KFC. You further agree that you will
              not misrepresent an affiliation with another person or
              organization, nor will you post any content that contains
              slanderous or libelous comments about others, or that infringes
              any copyright, trademark, patent, trade secret or other
              intellectual property right of a third party.
            </li>
            <li>
              You may not post any content that contains business solicitation
              of any type, including advertising a product or service, offering
              a product or service for sale, or directing website visitors to a
              location for more information about a product or service.
            </li>
            <li>
              You may not post any software, files or links to other sites, and
              you may not post any content that contains viruses, corrupted
              files, or any other similar software or programs that may
              adversely affect the operation of the Site, or feature of the
              Site. You may not modify in any way any specifications, technology
              or application codes provided to you by KFC or as embedded in the
              Submitted Content unless expressly authorized in writing by KFC.
            </li>
            <li>
              You may not share or transfer password or other access information
              with any other party, temporarily or permanently. You shall bear
              sole responsibility for all use of any account you have been
              permitted to create on this Site and for the confidentiality of
              your password.
            </li>
          </ul>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            KFC does not necessarily monitor any materials posted, transmitted,
            or communicated to or within the Site. If you believe that something
            on the Site violates these Terms please contact Copyright Agent, KFC
            Corporation, 1441 Gardiner Lane, Louisville, Kentucky 40213; or by
            email to{' '}
            <Link
              href="mailto:copyright@kfc.com"
              className="text-primary hover:underline"
            >
              copyright@kfc.com
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            ONLINE PURCHASES
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            To purchase merchandise or other items through the website, you must
            provide valid credit card and billing information. Such information
            will be collected by KFC. Your information will be collected and
            used in accordance with our{' '}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            . When you purchase items through our website, prices will be made
            clear during the order process. You agree to pay the price that is
            stated at the time of your order, as well as any applicable taxes.
            You also agree to have your credit card billed for the total amount
            displayed at check out. Please see our Return Policy.By purchasing
            items through the Site, you represent and warrant to KFC that you
            are capable of entering a contract under the laws of the United
            States. The most recent terms of use will be posted on this webpage.
            By agreeing to these terms, you also agree to future changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            WEB SITE ACCESS
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            KFC hereby grants you permission to use the Site as set forth in
            this Terms of Use, provided that: (i) your use of the Site as
            permitted is solely for your personal, noncommercial use; (ii) you
            will not copy or distribute any part of the Site in any medium
            without KFC's prior written authorization; (iii) you will not alter
            or modify any part of the Site other than as may be reasonably
            necessary to use the Site for its intended purpose; and (iv) you
            will otherwise comply with the terms and conditions of these Terms
            of Use.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            In order to access some features of the Site, you will have to
            create an account. You may never use another' s account without
            permission. When creating your account, you must provide accurate
            and complete information. You are solely responsible for the
            activity that occurs on your account, and you must keep your account
            password secure. You must notify KFC immediately of any breach of
            security or unauthorized use of your account. Although KFC will not
            be liable for your losses caused by any unauthorized use of your
            account, you may be liable for the losses of KFC or others due to
            such unauthorized use.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            You agree not to use or launch any automated system, including
            without limitation, "robots," "spiders," "offline readers," etc.,
            that accesses the Site in a manner that sends more request messages
            to the KFC servers in a given period of time than a human can
            reasonably produce in the same period by using a conventional online
            Web browser. Notwithstanding the foregoing, KFC grants the operators
            of public search engines permission to use spiders to copy materials
            from the Site for the sole purpose of creating publicly available
            searchable indices of the materials, but not caches or archives of
            such materials. KFC reserves the right to revoke these exceptions
            either generally or in specific cases. You agree not to collect or
            harvest any personally identifiable information, including account
            names, from the Site, nor to use the communication systems provided
            by the Site for any commercial solicitation purposes. You agree not
            to solicit, for commercial purposes, any users of the Site with
            respect to their User Submitted Content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            INDEMNIFICATION
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            You agree to indemnify and hold KFC, its parents, subsidiaries,
            officers, employees, and website contractors and each of their
            officers, employees and agents harmless from any claims, damages and
            expenses, including reasonable attorney's fees, related to your
            violation of these Terms, or any violations thereof by your
            dependents or which arises from the use of Submitted Content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            HYPER-LINKS
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            The KFC web site may link to sites not maintained by or related to
            KFC. Hyper-text links are provided as a service to users and are not
            sponsored by or affiliated with this web site or KFC. KFC has not
            reviewed the sites hyper-linked to or from this web site and is not
            responsible for the content of any other site. These links are to be
            accessed at the user's own risk. KFC makes no representations or
            warranties about the content, completeness, or accuracy of these
            links or the sites hyper-linked to or from this web site.
            Furthermore, KFC does not implicitly endorse third-party sites
            hyper-linked to or from this web site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            TEXT MESSAGING NOTICE
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            If you choose to participate in any KFC promotion that may involve
            the use of text messaging (either sending or receiving), KFC will
            not charge you for the text messaging; however, standard text
            messaging rates will apply to each text message sent or received as
            provided in your wireless rate plan (contact your carrier for
            pricing plans and details).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            MISCELLANEOUS
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            These terms, constitute the entire agreement between you and KFC and
            govern your use of the KFC site and supersede all prior or
            contemporaneous communications and proposals whether electronic,
            oral or written, between you and KFC with respect to the KFC site
            and services. Both you and KFC acknowledge and agree that no
            partnership is formed and neither of you nor KFC has the power or
            the authority to obligate or bind the other.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            The failure of KFC to exercise or enforce any right or provision of
            this Agreement shall not constitute a waiver of such right or
            provision. If any provision of this Agreement is found by a court of
            competent jurisdiction to be invalid or unenforceable, the parties
            nevertheless agree that the court should endeavor to give effect to
            the parties' original intentions as reflected in the provision, and
            the other provisions of this Agreement shall remain in full force
            and effect.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            Software that may be available in connection with this site is
            subject to United States export controls. No software may be
            downloaded from this site or otherwise exported or re-exported in
            violation of U.S. export laws. Downloading or using the software is
            at your sole risk. The failure of KFC to comply with this Agreement
            because of an act of God, war, fire, riot, terrorism, earthquake,
            actions of federal, state or local governmental authorities or for
            any other reason beyond the reasonable control of KFC, shall not be
            deemed a breach of this Agreement. If KFC fails to act with respect
            to your breach or anyone else's breach on any occasion, KFC is not
            waiving its right to act with respect to future or similar breaches.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            The headings in this Agreement are for your convenience and
            reference. These headings do not limit or affect this Agreement. If
            any provision of these terms of use shall be unlawful, void or for
            any reason unenforceable, then that provision shall be deemed
            severable from these terms of use and shall not affect the validity
            and enforceability of any remaining provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            ARBITRATION AND DISPUTE RESOLUTION
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Any controversy or claim arising out of or relating to your use of
            the KFC site or your Submitted Content shall be settled by binding
            arbitration in a location determined by the arbitrator as set forth
            herein (provided that such location is reasonably convenient for
            claimant), or at such other location as may be mutually agreed upon
            by the parties, in accordance with the procedural rules for
            commercial disputes set forth in the Comprehensive Arbitration Rules
            and Procedures of JAMS ("JAMS Rules and Procedures") then
            prevailing, and judgment upon the award rendered by the
            arbitrator(s) may be entered in any court having jurisdiction
            thereof. The arbitrator shall be selected pursuant to the JAMS Rules
            and Procedures. The arbitrator shall apply Kentucky law consistent
            with the Federal Arbitration Act and applicable statutes of
            limitations, and shall honor claims of privilege recognized at law.
            In the event that the claimant is able to demonstrate that the costs
            of arbitration will be prohibitive as compared to the costs of
            litigation, KFC will pay as much of the claimant's filing and
            hearing fees in connection with the arbitration as the arbitrator
            deems necessary to prevent the arbitration from being
            cost-prohibitive. If any part of this arbitration provision is
            deemed to be invalid, unenforceable or illegal (other than that
            claims will not be arbitrated on a class or representative basis),
            or otherwise conflicts with the rules and procedures established by
            JAMS, then the balance of this arbitration provision shall remain in
            effect and shall be construed in accordance with its terms as if the
            invalid, unenforceable, illegal or conflicting provision were not
            contained herein. If, however, the portion that is deemed invalid,
            unenforceable or illegal is that claims will not be arbitrated on a
            class or representative basis, then the entirety of this arbitration
            provision shall be null and void, and neither claimant nor KFC shall
            be entitled to arbitrate their dispute. Upon filing a demand for
            arbitration, all parties to such arbitration shall have the right of
            discovery, which discovery shall be completed within sixty days
            after the demand for arbitration is made, unless further extended by
            mutual agreement of the parties. The prevailing party shall be
            entitled to an award by the arbitrator of reasonable attorneys' fees
            and other costs reasonably incurred in connection with the
            arbitration.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            <span className="font-semibold text-foreground">
              THE ARBITRATION OF DISPUTES PURSUANT TO THIS PARAGRAPH SHALL BE IN
              YOUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
              IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. THE
              ARBITRATOR MAY NOT CONSOLIDATE OR JOIN THE CLAIMS OF OTHER PERSONS
              OR PARTIES WHO MAY BE SIMILARLY SITUATED. DO NOT USE THIS WEBSITE
              OR SUBMIT CONTENT IF YOU DO NOT AGREE TO HAVE ANY CLAIM OR
              CONTROVERSY ARBITRATED IN ACCORDANCE WITH THESE TERMS.
            </span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            <span className="font-semibold text-foreground">
              BY USING THE KFC SITE OR SUBMITTING CONTENT, YOU AGREE THAT TO THE
              EXTENT PERMITTED BY APPLICABLE LAW: (1) ANY AND ALL DISPUTES,
              CLAIMS AND CAUSES OF ACTION ARISING OUT OF OR CONNECTED WITH YOUR
              USE OF THE KFC SITE OR YOUR SUBMITTED CONTENT WILL BE RESOLVED
              INDIVIDUALLY THROUGH BINDING ARBITRATION AS SET FORTH ABOVE,
              WITHOUT RESORT TO ANY FORM OF CLASS ACTION; (2) ANY AND ALL
              CLAIMS, JUDGMENTS AND AWARDS WILL BE LIMITED TO ACTUAL
              THIRD-PARTY, OUT-OF-POCKET COSTS INCURRED (IF ANY), BUT IN NO
              EVENT WILL ATTORNEYS' FEES BE AWARDED OR RECOVERABLE; (3) UNDER NO
              CIRCUMSTANCES WILL YOU BE PERMITTED TO OBTAIN ANY AWARD FOR, AND
              YOU HEREBY KNOWINGLY AND EXPRESSLY WAIVES ALL RIGHTS TO SEEK,
              PUNITIVE, INCIDENTAL, CONSEQUENTIAL OR SPECIAL DAMAGES, LOST
              PROFITS AND/OR ANY OTHER DAMAGES, OTHER THAN ACTUAL OUT OF POCKET
              EXPENSES), AND/OR ANY RIGHTS TO HAVE DAMAGES MULTIPLIED OR
              OTHERWISE INCREASED; AND (4) YOUR REMEDIES ARE LIMITED TO A CLAIM
              FOR MONEY DAMAGES (IF ANY) AND YOU IRREVOCABLY WAIVES ANY RIGHT TO
              SEEK INJUNCTIVE OR EQUITABLE RELIEF. SOME JURISDICTIONS DO NOT
              ALLOW THE LIMITATIONS OR EXCLUSION OF LIABILITY, SO THE ABOVE MAY
              NOT APPLY TO YOU.
            </span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            GOVERNING LAW AND JURISDICTION
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            These Terms are governed by US law and are subject to all applicable
            federal, state and local laws and regulations. All issues and
            questions concerning the construction, validity, interpretation and
            enforceability of these Terms, or the rights and obligations of you
            or KFC in connection with your use of the KFC site or your Submitted
            Content, shall be governed by, and construed in accordance with, the
            laws of the Commonwealth of Kentucky, U.S.A., without giving effect
            to the conflict of laws rules thereof, and any matters or
            proceedings which are not subject to arbitration as set forth above
            and/or for entering any judgment on an arbitration award, shall take
            place in the State of Kentucky, in the County of Jefferson.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            This Agreement constitutes a binding agreement between you and KFC,
            and is accepted by you upon your use of the site. This Agreement
            constitutes the entire agreement between you and KFC regarding the
            use of the site and the features therein. By using this site, you
            represent that you are capable of entering into a binding agreement,
            and that you agree to be bound by this Agreement.
          </p>
        </section>
      </div>
    </div>
  );
}
